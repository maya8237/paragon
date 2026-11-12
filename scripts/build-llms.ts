/**
 * Build step: makes the site readable without running JavaScript.
 *
 * The site is a client-rendered app on hash routes, so a crawler or an AI
 * assistant fetching a page gets an empty <div id="root">. This writes the
 * same content in forms they can read, straight from the language files so it
 * can never drift from what the site shows:
 *
 *   dist/llms.txt       — short index in the llmstxt.org format
 *   dist/llms-full.txt  — every page, both languages, as Markdown
 *
 * The pages themselves are pre-rendered by scripts/prerender.ts.
 */

import en from '../src/content/en'
import he from '../src/content/he'
import type { Prose, SiteContent } from '../src/content/types'
import { pagePath } from '../src/site/routes'
import { url } from './site-config'

const DIST = 'dist'

const page = (lang: 'en' | 'he', to: string) => url(pagePath(lang, to))

const prose = (p: Prose, level = '##') => `${level} ${p.heading}\n\n${p.paragraphs.join('\n\n')}\n`
const list = (items: string[]) => items.map((i) => `- ${i}`).join('\n') + '\n'
const steps = (items: string[]) => items.map((i, n) => `${n + 1}. ${i}`).join('\n') + '\n'

function fullText(t: SiteContent, lang: 'en' | 'he'): string {
  const gt = t.globalTrade
  const l = t.logistics
  const out: string[] = []
  const h1 = (title: string, to: string) => out.push(`\n# ${title}\n\nURL: ${page(lang, to)}\n`)

  h1(t.home.meta.title, '/')
  out.push(`${t.meta.tagline}\n`, ...t.home.hero.lede.map((p) => p + '\n'))
  out.push(list(t.home.figures.map((f) => `${f.value} – ${f.label}`)))
  for (const p of t.home.pillars) out.push(`## ${p.title}\n\n${p.blurb}\n`)
  out.push(`${t.home.hero.quoteCta.label}: ${t.home.hero.quoteCta.href}\n`)

  h1(t.about.meta.title, '/about')
  out.push(t.about.profile.paragraphs.join('\n\n') + '\n')
  for (const s of t.about.sections) out.push(prose(s))
  out.push(`## ${t.about.certifications.heading}\n\n${t.about.certifications.blurb}\n`)
  out.push(list(t.about.certifications.items.map((c) => `[${c.label}](${c.href})`)))
  out.push(prose(t.about.environment))

  h1(t.scm.meta.title, '/scm')
  out.push(t.scm.intro.paragraphs.join('\n\n') + '\n')
  out.push(`## ${t.scm.synchronizing.heading}\n`)
  for (const i of t.scm.synchronizing.items) out.push(`### ${i.title}\n\n${i.body}\n`)
  out.push(prose(t.scm.onSite), `### ${t.scm.whyOnSite.heading}\n\n${list(t.scm.whyOnSite.items)}`)
  out.push(prose(t.scm.consulting), `### ${t.scm.framework.heading}\n\n${steps(t.scm.framework.items)}`)

  h1(gt.meta.title, '/global-trade')
  out.push(gt.intro.paragraphs.join('\n\n') + '\n', prose(gt.philosophy), prose(gt.insurance))
  const modes: [keyof typeof gt, string][] = [
    ['ocean', '/global-trade/ocean'],
    ['air', '/global-trade/air'],
    ['dropShipments', '/global-trade/drop-shipments'],
    ['charter', '/global-trade/charter'],
  ]
  for (const [key, to] of modes) {
    const m = gt[key] as { meta: { title: string }; body: Prose; timeCritical?: Prose }
    h1(m.meta.title, to)
    out.push(m.body.paragraphs.join('\n\n') + '\n')
    if (m.timeCritical) out.push(prose(m.timeCritical))
  }

  h1(l.meta.title, '/logistics')
  out.push(l.intro.paragraphs.join('\n\n') + '\n', prose(l.center))
  out.push(`## ${l.services.heading}\n\n${l.services.blurb}\n\n${list(l.services.items)}`)
  out.push(prose(l.closing), prose(l.exhibitions))
  out.push(`### ${l.exhibitionsProcess.heading}\n\n${steps(l.exhibitionsProcess.items)}\n${l.exhibitionsClosing}\n`)

  h1(t.tracking.meta.title, '/tracking')
  out.push(t.tracking.body.paragraphs.join('\n\n') + '\n')
  out.push(`## ${t.tracking.parameters.heading}\n\n${list(t.tracking.parameters.items)}`)
  out.push(`${t.tracking.cta.label}: ${t.tracking.cta.href}\n\n${t.tracking.ctaNote}\n`)

  h1(t.nippon.meta.title, '/nippon')
  out.push(t.nippon.body.paragraphs.join('\n\n') + '\n')
  out.push(list(t.nippon.figures.map((f) => `${f.value} – ${f.label}`)))
  out.push(prose(t.nippon.history), prose(t.nippon.warehousing))
  out.push(`## ${t.nippon.services.heading}\n`)
  for (const i of t.nippon.services.items) out.push(`### ${i.title}\n\n${i.body}\n`)

  h1(t.contact.meta.title, '/contact')
  out.push(t.contact.intro + '\n')
  for (const loc of t.contact.locations) {
    const lines = [...loc.address]
    if (loc.email) lines.push(`${t.common.email}: ${loc.email}`)
    for (const ph of loc.phones) lines.push(`${ph.label}: ${ph.value}`)
    out.push(`## ${loc.name}\n\n${lines.join('  \n')}\n`)
  }
  out.push(`${t.contact.form.cta.label}: ${t.contact.form.cta.href}\n`)

  return out.join('\n')
}

const summary = en.home.meta.description

const llms = `# ${en.meta.companyName}

> ${summary}

Israeli logistics, freight-forwarding and supply-chain company, and the Israeli
agent of Nippon Express. Five sites: headquarters in Or Yehuda, a 3,000 m²
logistics centre in Ramla, an air branch at Ben Gurion Airport, and ocean
branches at Ashdod and Haifa ports. The site is bilingual (English and Hebrew).

## Full content

- [Full site text, English and Hebrew](${url('llms-full.txt')}): every page as Markdown

## Pages (English)

${en.nav.primary.map((n) => `- [${n.label}](${page('en', n.to)})`).join('\n')}

## Pages (Hebrew)

${he.nav.primary.map((n) => `- [${n.label}](${page('he', n.to)})`).join('\n')}

## Contact

- [${en.home.hero.quoteCta.label}](${en.home.hero.quoteCta.href})
- [${he.home.hero.quoteCta.label}](${he.home.hero.quoteCta.href})
`

const full = `# ${en.meta.companyName} – full site text

> ${summary}

This file mirrors the website's content. Section 1 is English, section 2 is Hebrew.

---
${fullText(en, 'en')}
---

<div dir="rtl" lang="he">
${fullText(he, 'he')}
</div>
`

await Bun.write(`${DIST}/llms.txt`, llms)
await Bun.write(`${DIST}/llms-full.txt`, full)

console.log('Wrote llms.txt and llms-full.txt')
