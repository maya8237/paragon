import { useEffect, useRef } from 'react'
import createGlobe from 'cobe'
import s from './HeroGlobe.module.css'

/**
 * The hero illustration: the Earth turning slowly, drawn by COBE
 * (https://github.com/shuding/cobe, MIT, ~5 KB) in the site's blues, with
 * Tel Aviv marked in green and trade lanes arcing out to major hubs.
 *
 * Purely decorative — everything it suggests is said in words beside it — so
 * it is hidden from assistive technology. Under `prefers-reduced-motion` it
 * holds still with Israel facing the viewer, and it only animates while on
 * screen. The page is pre-rendered without it; the canvas fades in once COBE
 * has drawn.
 */
const TEL_AVIV: [number, number] = [32.08, 34.78]

/** Major trade hubs across the Americas, Europe, Africa and Asia. */
const HUBS: [number, number][] = [
  [40.71, -74.01], // New York
  [34.05, -118.24], // Los Angeles
  [51.51, -0.13], // London
  [51.92, 4.48], // Rotterdam
  [6.52, 3.38], // Lagos
  [-1.29, 36.82], // Nairobi
  [-26.2, 28.05], // Johannesburg
  [19.08, 72.88], // Mumbai
  [1.35, 103.82], // Singapore
  [31.23, 121.47], // Shanghai
  [35.68, 139.69], // Tokyo
]
/** COBE's rotation that puts a longitude at the centre of the globe. */
const facing = (lng: number) => (3 * Math.PI) / 2 - (lng * Math.PI) / 180
const TURN_PER_SECOND = (Math.PI * 2) / 60 // one turn a minute

export function HeroGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const still = window.matchMedia('(prefers-reduced-motion: reduce)')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const px = () => Math.round(canvas.clientWidth * dpr)
    // Start with Israel a little west of centre, so it turns into view.
    let phi = facing(TEL_AVIV[1]) - 0.5

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width: px(),
      height: px(),
      phi: still.matches ? facing(TEL_AVIV[1]) : phi,
      theta: 0.3,
      // A softened dark mode, so the ocean reads as the site's navy, not black.
      dark: 0.6,
      diffuse: 2,
      mapSamples: 20000,
      mapBrightness: 10,
      mapBaseBrightness: 0.12,
      baseColor: [0.2, 0.42, 0.66],
      markerColor: [0.545, 0.75, 0.45],
      glowColor: [0.16, 0.38, 0.62],
      markers: [
        { location: TEL_AVIV, size: 0.08 },
      ],
      arcs: HUBS.map((to) => ({ from: TEL_AVIV, to })),
      arcColor: [0.545, 0.75, 0.45],
      arcWidth: 0.6,
      // Low arcs stay close to the surface, so lanes to far-side cities
      // do not hang in space past the globe's edge.
      arcHeight: 0.12,
    })
    // COBE needs a frame or two to upload its map; fade in after that.
    const shown = window.setTimeout(() => canvas.classList.add(s.ready!), 120)

    let frame = 0
    let last = 0
    let visible = true
    const tick = (now: number) => {
      const dt = last ? Math.min(now - last, 100) : 0
      last = now
      // West to east, as the real Earth turns.
      phi += (dt / 1000) * TURN_PER_SECOND
      globe.update({ phi })
      frame = requestAnimationFrame(tick)
    }
    const start = () => {
      cancelAnimationFrame(frame)
      last = 0
      if (still.matches) globe.update({ phi: facing(TEL_AVIV[1]) })
      else if (visible) frame = requestAnimationFrame(tick)
    }

    const ro = new ResizeObserver(() => globe.update({ width: px(), height: px() }))
    ro.observe(canvas)
    const io = new IntersectionObserver(([entry]) => {
      visible = !!entry?.isIntersecting
      start()
    })
    io.observe(canvas)
    still.addEventListener('change', start)

    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(shown)
      ro.disconnect()
      io.disconnect()
      still.removeEventListener('change', start)
      globe.destroy()
    }
  }, [])

  return (
    <div className={s.wrap} aria-hidden="true">
      <canvas ref={canvasRef} className={s.canvas} />
    </div>
  )
}
