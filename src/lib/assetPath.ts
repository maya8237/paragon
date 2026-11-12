import { BASE } from './base'

/**
 * Resolve a file in `public/` to a URL that survives the deployment's base
 * path. Pages live at real paths (`/en/global-trade/air/`), so a relative URL
 * would resolve against the page's own directory — hence the explicit base.
 */
export function assetPath(fileName: string): string {
  return `${BASE}${fileName}`
}
