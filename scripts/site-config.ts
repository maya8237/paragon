/**
 * Where this build will be served, read from the environment.
 *
 *   bun run build        → base `/`, for `bun run preview` and a custom domain
 *   bun run build:pages  → base `/<repo>/`, or `/<PAGES_BASE>/` when set
 *                          (the deploy workflow sets `paragon/<branch>` for
 *                          branch previews)
 *
 * SITE_URL is the public origin. It defaults to this repository's GitHub Pages
 * host; once the site moves to its own domain, set
 * SITE_URL=https://www.paragon-logistics.co.il and build with plain `build`.
 */
const env = process.env

const pagesBase = env.PAGES === '1'
  ? (env.PAGES_BASE ?? (env.GITHUB_REPOSITORY ?? '').split('/').pop() ?? '')
  : ''

/** Always starts and ends with `/`. */
export const BASE = pagesBase ? `/${pagesBase.replace(/^\/|\/$/g, '')}/` : '/'

const owner = env.GITHUB_REPOSITORY_OWNER ?? (env.GITHUB_REPOSITORY ?? '').split('/')[0] ?? ''
export const ORIGIN = (env.SITE_URL ?? (owner ? `https://${owner}.github.io` : 'https://maya8237.github.io')).replace(/\/$/, '')

/** Absolute URL of a path under the base, e.g. `url('en/about/')`. */
export const url = (path = '') => `${ORIGIN}${BASE}${path}`

/**
 * Branch previews must stay out of search results — they duplicate the real
 * site. The workflow builds them with a nested PAGES_BASE (`paragon/<branch>`),
 * which is the signal; NOINDEX=1 forces it for anything else.
 */
export const NOINDEX = env.NOINDEX === '1' || pagesBase.includes('/')
