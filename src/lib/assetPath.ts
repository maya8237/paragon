/**
 * Resolve a file in `public/` to a URL that survives the GitHub Pages base path.
 *
 * `build:pages` rewrites asset URLs to `/<repo>/…` when the site is published to
 * a project page, so a bare `/logo.png` would 404 there. The first path segment
 * is the repo name in that case and the empty string locally — except when it is
 * a language segment (`/en/…`, `/he/…`), which belongs to the router, not the
 * base path.
 *
 * Read once at module load: the base path cannot change without a full reload.
 */
const firstPathSegment = window.location.pathname.split('/').filter(Boolean)[0] ?? ''

const base = ['en', 'he'].includes(firstPathSegment)
  ? ''
  : firstPathSegment
    ? `/${firstPathSegment}`
    : ''

export function assetPath(fileName: string): string {
  return `${base}/${fileName}`
}
