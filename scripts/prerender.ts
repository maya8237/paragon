/**
 * Build step: writes every page as real HTML, so search engines and AI tools
 * read the full content without running JavaScript.
 *
 * For each page in each language this renders the app (src/entry-server.tsx)
 * into the built index.html and writes it to the page's own address —
 * `dist/en/global-trade/air/index.html` — which GitHub Pages, or any static
 * host, serves directly. Each page gets its own title, description, canonical
 * URL, English/Hebrew alternates and social-preview tags. Then:
 *
 *   dist/index.html  — the English home page; the app forwards visitors on to
 *                      their preferred language
 *   dist/404.html    — GitHub Pages serves it for any unknown address
 *   dist/sitemap.xml, dist/robots.txt — omitted on branch previews, which
 *                      are marked noindex instead
 *
 *   bun run build   (runs after `bun build`; see package.json)
 */

import { mkdirSync, rmSync } from 'node:fs'
import { dirname } from 'node:path'
import en from '../src/content/en'
import he from '../src/content/he'
import ja from '../src/content/ja'
import type { Lang, SiteContent } from '../src/content/types'
import { PAGES, pagePath, pageTitle } from '../src/site/routes'
import { BASE, NOINDEX, url } from './site-config'

const DIST = 'dist'
const SSR_OUT = '.ssr'
const content: Record<Lang, SiteContent> = { en, he, ja }
const langs: Lang[] = ['en', 'he', 'ja']
const LOCALE: Record<Lang, string> = { en: 'en_US', he: 'he_IL', ja: 'ja_JP' }

/* 1. Bundle the app for Bun. Bun's CSS-module class names depend only on the
      source file, so they match the browser bundle's exactly. */
globalThis.__SITE_BASE__ = BASE
rmSync(SSR_OUT, { recursive: true, force: true })
const bundle = await Bun.build({
  entrypoints: ['src/entry-server.tsx'],
  target: 'bun',
  outdir: SSR_OUT,
  define: { 'process.env.NODE_ENV': '"production"' },
})
if (!bundle.success) {
  for (const log of bundle.logs) console.error(log)
  throw new Error('Server bundle failed')
}
const entry = bundle.outputs.find((o) => o.kind === 'entry-point')!
const { render } = (await import(entry.path)) as { render: (path: string) => string }

/* 2. The shell. Bun writes asset URLs relative (`./index-abc.js`), which would
      resolve against each page's own folder – pin them to the base. */
const template = (await Bun.file(`${DIST}/index.html`).text()).replaceAll('="./', `="${BASE}`)

const esc = (s: string) =>
  s.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

const ORG_ID = url('#organization')
const SITE_ID = url('#website')

const organization = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: en.meta.companyName,
  alternateName: [he.meta.companyName, ja.meta.companyName],
  url: url(),
  logo: url('logo.png'),
  description: en.home.meta.description,
  sameAs: [
    'https://www.facebook.com/pages/פראגון-לוגיסטיקה-בעמ-Paragon-Logistics-Ltd/386507584847098',
    'https://www.linkedin.com/company/paragon-logistics-ltd.',
    'https://www.pinterest.com/paragonlogistic/',
  ],
  location: en.contact.locations.map((loc) => ({
    '@type': 'Place',
    name: loc.name,
    address: { '@type': 'PostalAddress', streetAddress: loc.address.join(', '), addressCountry: 'IL' },
    ...(loc.email ? { email: loc.email } : {}),
    ...(loc.phones[0] ? { telephone: loc.phones[0].value } : {}),
  })),
  hasCredential: en.about.certifications.items.map((c) => c.label),
}

const website = {
  '@type': 'WebSite',
  '@id': SITE_ID,
  url: url(),
  name: en.meta.companyName,
  alternateName: [he.meta.companyName, ja.meta.companyName],
  inLanguage: langs,
  publisher: { '@id': ORG_ID },
}

/**
 * Structured data for one page: the company, the site, the page itself and
 * where it sits (Home › Global Trade › Air Freight), so search engines and AI
 * tools can tell who the page is from and how the pages relate.
 */
function structuredData(lang: Lang, path: string, title: string, description: string): string {
  const t = content[lang]
  const self = url(pagePath(lang, path))
  // '/global-trade/air' → ['/', '/global-trade', '/global-trade/air']
  const trail = ['/', ...path.split('/').filter(Boolean).map((_, i, a) => '/' + a.slice(0, i + 1).join('/'))]
    .filter((p, i) => i === 0 || p !== '/')
    .map((p) => PAGES.find((d) => d.path === p))
    .filter((d): d is (typeof PAGES)[number] => !!d)
  const breadcrumb =
    path === '/'
      ? undefined
      : {
          '@type': 'BreadcrumbList',
          '@id': `${self}#breadcrumb`,
          itemListElement: trail.map((d, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: d.path === '/' ? t.meta.companyName : d.meta(t).title,
            item: url(pagePath(lang, d.path)),
          })),
        }
  const graph = [
    organization,
    website,
    {
      '@type': path === '/contact' ? 'ContactPage' : path === '/about' ? 'AboutPage' : 'WebPage',
      '@id': self,
      url: self,
      name: title,
      description,
      inLanguage: lang,
      isPartOf: { '@id': SITE_ID },
      about: { '@id': ORG_ID },
      publisher: { '@id': ORG_ID },
      primaryImageOfPage: url('og.png'),
      ...(breadcrumb ? { breadcrumb: { '@id': breadcrumb['@id'] } } : {}),
    },
    ...(breadcrumb ? [breadcrumb] : []),
  ]
  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
  return `<script type="application/ld+json">${json.replaceAll('<', '\\u003c')}</script>`
}

function page({
  lang,
  path,
  routePath,
  index = !NOINDEX,
}: {
  lang: Lang
  /** Route without the language prefix, as listed in PAGES. */
  path: string
  /** Router location to render. */
  routePath: string
  index?: boolean
}): string {
  const t = content[lang]
  const def = PAGES.find((p) => p.path === path)
  const meta = def ? def.meta(t) : t.notFound.meta
  const isHome = path === '/'
  const title = pageTitle(t, meta, isHome)
  const self = url(pagePath(lang, path))

  const head = [
    `<meta name="site-base" content="${BASE}" />`,
    index ? '' : '<meta name="robots" content="noindex" />',
    def ? `<link rel="canonical" href="${self}" />` : '',
    ...(def
      ? [
          ...langs.map((l) => `<link rel="alternate" hreflang="${l}" href="${url(pagePath(l, path))}" />`),
          `<link rel="alternate" hreflang="x-default" href="${url(pagePath('en', path))}" />`,
        ]
      : []),
    `<link rel="alternate" type="text/markdown" href="${url('llms-full.txt')}" title="Full site text" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(t.meta.companyName)}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${self}" />`,
    `<meta property="og:image" content="${url('og.png')}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:locale" content="${LOCALE[lang]}" />`,
    ...langs.filter((l) => l !== lang).map((l) => `<meta property="og:locale:alternate" content="${LOCALE[l]}" />`),
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${url('og.png')}" />`,
    def ? structuredData(lang, path, title, meta.description) : '',
  ]
    .filter(Boolean)
    .join('\n    ')

  return template
    .replace('<html lang="en">', `<html lang="${lang}" dir="${lang === 'he' ? 'rtl' : 'ltr'}">`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(
      /<meta\s+name="description"[\s\S]*?\/>/,
      `<meta name="description" content="${esc(meta.description)}" />\n    ${head}`,
    )
    .replace('<div id="root"></div>', `<div id="root">${render(routePath)}</div>`)
}

async function write(file: string, html: string) {
  mkdirSync(dirname(file), { recursive: true })
  await Bun.write(file, html)
}

/* 3. Every page, both languages. */
for (const lang of langs) {
  for (const { path } of PAGES) {
    const routePath = `/${lang}${path === '/' ? '' : path}`
    await write(`${DIST}/${pagePath(lang, path)}index.html`, page({ lang, path, routePath }))
  }
}

await write(`${DIST}/index.html`, page({ lang: 'en', path: '/', routePath: '/en' }))
await write(`${DIST}/404.html`, page({ lang: 'en', path: '/404', routePath: '/en/404', index: false }))

/* 4. Sitemap and robots.txt — for the real site only. */
if (!NOINDEX) {
  /*
   * lastmod is when the site's content last changed, from git — not the build
   * date, which changes on every deploy and teaches crawlers to ignore it.
   */
  const git = Bun.spawnSync(['git', 'log', '-1', '--format=%cs', '--', 'src', 'public'])
  const changed = git.success ? git.stdout.toString().trim() : ''
  const entries = PAGES.flatMap(({ path }) =>
    langs.map(
      (lang) => `  <url>
    <loc>${url(pagePath(lang, path))}</loc>
${changed ? `    <lastmod>${changed}</lastmod>\n` : ''}${langs.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${url(pagePath(l, path))}" />`).join('\n')}
    <xhtml:link rel="alternate" hreflang="x-default" href="${url(pagePath('en', path))}" />
  </url>`,
    ),
  )
  await Bun.write(
    `${DIST}/sitemap.xml`,
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`,
  )

  /*
   * Search engines only read robots.txt at the root of a host. On
   * <owner>.github.io/<repo>/ this one is not at the root, so it takes effect
   * once the site has its own domain; until then, submit the sitemap in
   * Google Search Console directly.
   */
  await Bun.write(
    `${DIST}/robots.txt`,
    `# Everyone is welcome, AI crawlers included.
User-agent: *
Allow: /

Sitemap: ${url('sitemap.xml')}
`,
  )
}

rmSync(SSR_OUT, { recursive: true, force: true })
console.log(
  `Pre-rendered ${PAGES.length * langs.length} pages under ${BASE}` +
    (NOINDEX ? ' (preview: noindex, no sitemap)' : `, sitemap at ${url('sitemap.xml')}`),
)
