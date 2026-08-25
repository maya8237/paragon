/**
 * Resolve a file in `public/` to a URL that survives the GitHub Pages base path.
 *
 * The app is served from whatever directory `index.html` sits in — the repo
 * root locally, `/<repo>/` on the main deployment, `/<repo>/<branch>/` for a
 * branch preview. Routing lives entirely after the `#` (HashRouter), so
 * `window.location.pathname` never changes across routes — it already *is*
 * that directory, at whatever depth, and can be used directly as the base.
 *
 * Read once at module load: the base path cannot change without a full reload.
 */
const base = window.location.pathname.replace(/\/$/, '')

export function assetPath(fileName: string): string {
  return `${base}/${fileName}`
}
