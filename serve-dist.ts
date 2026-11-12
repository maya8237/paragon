/**
 * Serves the production build for verification, the way GitHub Pages does:
 * a file is served as-is, a folder redirects to its trailing-slash address
 * and serves its index.html, and anything else gets 404.html with a 404.
 *
 * Build with plain `bun run build` (base `/`) before previewing.
 */
import { existsSync, statSync } from 'node:fs'
import { join } from 'node:path'

const DIST = 'dist'
const port = Number(Bun.env.PORT ?? 4321)

const server = Bun.serve({
  port,
  fetch(request) {
    const { pathname } = new URL(request.url)
    const path = join(DIST, decodeURIComponent(pathname))

    if (existsSync(path) && statSync(path).isDirectory()) {
      if (!pathname.endsWith('/')) return Response.redirect(`${pathname}/`, 301)
      const index = join(path, 'index.html')
      if (existsSync(index)) return new Response(Bun.file(index))
    } else if (existsSync(path)) {
      return new Response(Bun.file(path))
    }

    return new Response(Bun.file(join(DIST, '404.html')), {
      status: 404,
      headers: { 'content-type': 'text/html; charset=utf-8' },
    })
  },
})

console.log(`Paragon Logistics production preview → ${server.url}`)
