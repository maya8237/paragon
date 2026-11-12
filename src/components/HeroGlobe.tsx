import { useEffect, useRef } from 'react'
import createGlobe from 'cobe'
import s from './HeroGlobe.module.css'

/**
 * The hero illustration: the Earth turning slowly, drawn by COBE
 * (https://github.com/shuding/cobe, MIT, ~5 KB) in the site's blues, with
 * Israel marked in green.
 *
 * Purely decorative — everything it suggests is said in words beside it — so
 * it is hidden from assistive technology. Under `prefers-reduced-motion` it
 * holds still with Israel facing the viewer, and it only animates while on
 * screen. The page is pre-rendered without it; the canvas fades in once COBE
 * has drawn.
 */
const ISRAEL: [number, number] = [31.5, 34.8]
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
    let phi = facing(ISRAEL[1]) - 0.5

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width: px(),
      height: px(),
      phi: still.matches ? facing(ISRAEL[1]) : phi,
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
      markers: [{ location: ISRAEL, size: 0.08 }],
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
      if (still.matches) globe.update({ phi: facing(ISRAEL[1]) })
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
