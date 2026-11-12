/**
 * The path the site is served under: `/` locally and on a custom domain,
 * `/paragon/` on GitHub Pages, `/paragon/<branch>/` for a branch preview.
 *
 * The build writes it into every page as `<meta name="site-base">`; the dev
 * server's page has none, so it falls back to `/`. Always ends in a slash.
 */
export const BASE: string = (() => {
  if (typeof document === 'undefined') return globalThis.__SITE_BASE__ ?? '/'
  const meta = document.querySelector<HTMLMetaElement>('meta[name="site-base"]')
  return meta?.content || '/'
})()

/** The same, without its trailing slash — the form React Router's `basename` takes. */
export const BASENAME = BASE.replace(/\/$/, '')

declare global {
  // Set by the prerender script before it renders any page.
  // eslint-disable-next-line no-var
  var __SITE_BASE__: string | undefined
}
