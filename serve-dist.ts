/**
 * Serves the production build for verification.
 *
 * Mirrors what a static host needs to do for a client-routed SPA: serve the
 * built file when one exists at that path, and fall back to `index.html` for
 * every deep route so `/en/global-trade/air` does not 404 on a hard reload.
 */
import { existsSync } from 'node:fs'
import { join } from 'node:path'

const DIST = 'dist'
const port = Number(Bun.env.PORT ?? 4321)

const server = Bun.serve({
  port,
  async fetch(request) {
    const { pathname } = new URL(request.url)
    const file = join(DIST, decodeURIComponent(pathname))

    if (pathname !== '/' && existsSync(file) && (await Bun.file(file).exists())) {
      return new Response(Bun.file(file))
    }
    return new Response(Bun.file(join(DIST, 'index.html')), {
      headers: { 'content-type': 'text/html; charset=utf-8' },
    })
  },
})

console.log(`Paragon Logistics production preview → ${server.url}`)
