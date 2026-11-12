/**
 * Build-time renderer. `scripts/prerender.ts` bundles this for Bun and calls
 * `render` once per route to write each page's HTML.
 */
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App'
import { BASENAME } from './lib/base'

export function render(path: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={BASENAME + path} basename={BASENAME}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )
}
