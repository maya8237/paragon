import { TRACKING_ENABLED } from './features'
import type { Lang, PageMeta, SiteContent } from '../content/types'

/**
 * Every page the site serves, without its language prefix. The build renders
 * each one in each language and lists them all in the sitemap — add a route
 * to App.tsx and it must be added here too.
 */
const ALL_PAGES: { path: string; meta: (t: SiteContent) => PageMeta }[] = [
  { path: '/', meta: (t) => t.home.meta },
  { path: '/about', meta: (t) => t.about.meta },
  { path: '/scm', meta: (t) => t.scm.meta },
  { path: '/global-trade', meta: (t) => t.globalTrade.meta },
  { path: '/global-trade/ocean', meta: (t) => t.globalTrade.ocean.meta },
  { path: '/global-trade/air', meta: (t) => t.globalTrade.air.meta },
  { path: '/global-trade/drop-shipments', meta: (t) => t.globalTrade.dropShipments.meta },
  { path: '/global-trade/charter', meta: (t) => t.globalTrade.charter.meta },
  { path: '/logistics', meta: (t) => t.logistics.meta },
  { path: '/industries', meta: (t) => t.industries.meta },
  { path: '/tracking', meta: (t) => t.tracking.meta },
  { path: '/nippon', meta: (t) => t.nippon.meta },
  { path: '/contact', meta: (t) => t.contact.meta },
  { path: '/accessibility', meta: (t) => t.accessibility.meta },
]

export const PAGES = ALL_PAGES.filter((p) => TRACKING_ENABLED || p.path !== '/tracking')

/**
 * A page's address under the site base, with the trailing slash GitHub Pages
 * redirects to — so the address we publish is the one that answers directly.
 */
export function pagePath(lang: Lang, path: string): string {
  return `${lang}${path === '/' ? '' : path}/`
}

/** The <title> the app sets for a page — kept identical to usePageMeta. */
export function pageTitle(t: SiteContent, meta: PageMeta, isHome: boolean): string {
  return isHome ? `${meta.title} · ${t.meta.tagline}` : `${meta.title} · ${t.meta.companyName}`
}
