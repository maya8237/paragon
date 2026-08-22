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
 *   3. `hmr` is off deliberately. On Bun 1.4.0 the HMR runtime does not give
 *      `*.module.css` imports their JS binding, so every component that reads
 *      class names off a CSS module crashes with "import_X_module is not
 *      defined" — even though `bun build` compiles the same modules correctly.
 *      With HMR off the dev server renders properly; `bun --hot` still restarts
 *      the server on a change, so the cost is a manual browser reload rather
 *      than Fast Refresh. Re-test after a Bun upgrade and turn this back on.
 */
import index from './index.html'
import { readdirSync, statSync } from 'node:fs'
import { join, posix } from 'node:path'

const PUBLIC_DIR = 'public'

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
    hmr: false,
    console: true,
  },
})

console.log(`Paragon Logistics dev server → ${server.url}`)
