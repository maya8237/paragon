/**
 * Feature switches.
 *
 * Tracking is off while the tracking system (UnifreightWeb) is not working:
 * the page, its menu and footer entries, the home-page card, the sitemap and
 * llms.txt all disappear together. Set this to true to bring all of it back —
 * nothing else needs to change.
 */
export const TRACKING_ENABLED = false

/** True for a nav entry that points at the tracking page. */
export const isTrackingPath = (to: string) => to === '/tracking'

/** Drops tracking entries from a nav list while tracking is switched off. */
export function visibleNav<T extends { to: string }>(items: T[]): T[] {
  return TRACKING_ENABLED ? items : items.filter((i) => !isTrackingPath(i.to))
}

/**
 * Dark mode is built (see :root[data-theme='dark'] in styles/tokens.css and the
 * switch in the footer) but switched off: the site is light only for now.
 *
 * To turn it on, set this to true AND set `var DARK_MODE = true` in index.html
 * (its inline script runs before first paint and cannot import this file).
 */
export const DARK_MODE_ENABLED = false
