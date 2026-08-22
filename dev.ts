/**
 * Dev server.
 *
 * Bun bundles `index.html` and everything its <script>/<link> tags reference.
 *
 * Three things this has to get right that a bare `bun ./index.html` does not:
 *
 *   1. Files in `public/` are served at the site root. They must be registered
 *      as their own routes, because the `/*` catch-all below would otherwise
 *      answer `/logo.png` with the HTML document.
 *   2. That catch-all is what makes deep client routes (`/en/global-trade/air`)
 *      survive a hard reload — without it Bun would only answer `/`.
 *   3. Bun 1.4.0's HMR runtime does not give `*.module.css` imports their JS
 *      binding. HMR is enabled on fixed Bun versions; 1.4.x uses the hot
 *      restart fallback until Bun is upgraded.
 */
import index from './index.html'
import { readdirSync, statSync } from 'node:fs'
import { join, posix } from 'node:path'

const PUBLIC_DIR = 'public'
const cssModuleHmrSupported = !Bun.version.startsWith('1.4.')

/** Every file under `public/`, as a route path → filesystem path pair. */
function publicRoutes(dir = PUBLIC_DIR, prefix = ''): Record<string, Response> {
  const routes: Record<string, Response> = {}
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    const route = posix.join('/', prefix, entry)
    if (statSync(full).isDirectory()) {
      Object.assign(routes, publicRoutes(full, posix.join(prefix, entry)))
    } else {
      routes[route] = new Response(Bun.file(full))
    }
  }
  return routes
}

const server = Bun.serve({
  port: Number(Bun.env.PORT ?? 5173),
  routes: {
    ...publicRoutes(),
    '/*': index,
  },
  development: {
    hmr: cssModuleHmrSupported,
    console: true,
  },
})

console.log(`Paragon Logistics dev server → ${server.url}`)
