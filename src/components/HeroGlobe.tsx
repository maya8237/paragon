import { useEffect, useRef } from 'react'
import createGlobe from 'cobe'
import s from './HeroGlobe.module.css'

/**
 * The hero illustration: the Earth swaying slowly east and west across Israel, drawn by COBE
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
const THETA = 0.3
const SAGE = '139 191 115'

type Vec = [number, number, number]

/** COBE's own lat/lng → unit vector (see its `U`), so overlay and globe agree. */
function toVec([lat, lng]: [number, number]): Vec {
  const la = (lat * Math.PI) / 180
  const lo = (lng * Math.PI) / 180 - Math.PI
  return [-Math.cos(la) * Math.cos(lo), Math.sin(la), Math.cos(la) * Math.sin(lo)]
}

/** COBE's view rotation (its vertex shader): globe space → screen space, z toward the viewer. */
function rotate([x, y, z]: Vec, phi: number): Vec {
  const c = Math.cos(THETA)
  const d = Math.sin(THETA)
  const e = Math.cos(phi)
  const f = Math.sin(phi)
  return [e * x + f * z, f * d * x + c * y - e * d * z, -f * c * x + d * y + e * c * z]
}

const slerp = (a: Vec, b: Vec, t: number): Vec => {
  const dot = Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]))
  const w = Math.acos(dot)
  if (w < 1e-4) return a
  const k1 = Math.sin((1 - t) * w) / Math.sin(w)
  const k2 = Math.sin(t * w) / Math.sin(w)
  return [k1 * a[0] + k2 * b[0], k1 * a[1] + k2 * b[1], k1 * a[2] + k2 * b[2]]
}

const ORIGIN = toVec(TEL_AVIV)
const STEPS = 72
/** Each lane as points on a great circle, lifted off the surface in the middle. */
const LANES: Vec[][] = HUBS.map((hub) => {
  const to = toVec(hub)
  const reach = Math.acos(ORIGIN[0] * to[0] + ORIGIN[1] * to[1] + ORIGIN[2] * to[2])
  const lift = 0.025 + 0.045 * (reach / Math.PI)
  return Array.from({ length: STEPS + 1 }, (_, i) => {
    const t = i / STEPS
    const p = slerp(ORIGIN, to, t)
    const r = 0.8 * (1.004 + lift * Math.sin(Math.PI * t))
    return [p[0] * r, p[1] * r, p[2] * r] as Vec
  })
})
const CITIES: Vec[] = HUBS.map((h) => {
  const v = toVec(h)
  return [v[0] * 0.8 * 1.004, v[1] * 0.8 * 1.004, v[2] * 0.8 * 1.004] as Vec
})
const HOME: Vec = [ORIGIN[0] * 0.8 * 1.004, ORIGIN[1] * 0.8 * 1.004, ORIGIN[2] * 0.8 * 1.004]

/** Hidden once it is past the limb, so nothing hangs in space beside the globe. */
const hidden = (p: Vec) => p[2] < 0

/**
 * Lanes and city dots are drawn here, on a 2D canvas over COBE's globe, with
 * the same projection. COBE's own arcs shimmer and break up as the globe
 * turns; this way the lines are smooth and cleanly disappear behind the limb.
 */
function drawOverlay(ctx: CanvasRenderingContext2D, size: number, phi: number) {
  const half = size / 2
  const px = (p: Vec): [number, number] => [half + p[0] * half, half - p[1] * half]
  ctx.clearRect(0, 0, size, size)
  const unit = size / 544 // line weights are tuned for a 34rem globe
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'

  for (const lane of LANES) {
    const pts = lane.map((p) => rotate(p, phi))
    ctx.lineWidth = 1.4 * unit
    let open = false
    ctx.beginPath()
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i]!
      if (hidden(p)) {
        open = false
        continue
      }
      const [x, y] = px(p)
      if (open) ctx.lineTo(x, y)
      else ctx.moveTo(x, y)
      open = true
    }
    ctx.strokeStyle = `rgb(${SAGE} / 0.8)`
    ctx.stroke()
  }

  const dot = (p: Vec, r: number, halo: number) => {
    const q = rotate(p, phi)
    if (hidden(q)) return
    const [x, y] = px(q)
    ctx.beginPath()
    ctx.arc(x, y, r * 2.4 * unit, 0, Math.PI * 2)
    ctx.fillStyle = `rgb(${SAGE} / ${halo})`
    ctx.fill()
    ctx.beginPath()
    ctx.arc(x, y, r * unit, 0, Math.PI * 2)
    ctx.fillStyle = `rgb(${SAGE})`
    ctx.fill()
  }
  for (const c of CITIES) dot(c, 2.6, 0.28)
  dot(HOME, 4.2, 0.35)
}

/** COBE's rotation that puts a longitude at the centre of the globe. */
const facing = (lng: number) => (3 * Math.PI) / 2 - (lng * Math.PI) / 180
/**
 * The globe sways east and west across Israel rather than turning all the way
 * round: a full turn leaves Israel, the lanes and the point of it all on the
 * far side for half of every minute. This keeps them in view, and still reads
 * as the Earth turning.
 */
const SWAY = 1.25 // radians each side of Tel Aviv (about 72°)
const SWAY_PERIOD = 44 // seconds for a full there-and-back
const swayPhi = (seconds: number) =>
  facing(TEL_AVIV[1]) + SWAY * Math.sin((seconds / SWAY_PERIOD) * Math.PI * 2)

export function HeroGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const overlayRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const overlay = overlayRef.current
    const octx = overlay?.getContext('2d')
    if (!canvas || !overlay || !octx) return

    const still = window.matchMedia('(prefers-reduced-motion: reduce)')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const px = () => Math.round(canvas.clientWidth * dpr)
    // Start a little west of centre, already turning east.
    let clock = (Math.asin(-0.4 / SWAY) / (Math.PI * 2)) * SWAY_PERIOD
    let phi = swayPhi(clock)
    const paint = () => {
      const size = px()
      if (overlay.width !== size) overlay.width = overlay.height = size
      drawOverlay(octx, size, phi)
    }

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width: px(),
      height: px(),
      phi: still.matches ? facing(TEL_AVIV[1]) : phi,
      theta: THETA,
      // A softened dark mode, so the ocean reads as the site's navy, not black.
      dark: 0.6,
      diffuse: 2,
      mapSamples: 20000,
      mapBrightness: 10,
      mapBaseBrightness: 0.12,
      baseColor: [0.2, 0.42, 0.66],
      markerColor: [0.545, 0.75, 0.45],
      glowColor: [0.16, 0.38, 0.62],
    })
    // COBE needs a frame or two to upload its map; fade in after that.
    const shown = window.setTimeout(() => {
      canvas.classList.add(s.ready!)
      overlay.classList.add(s.ready!)
    }, 120)

    let frame = 0
    let last = 0
    let visible = true
    const tick = (now: number) => {
      const dt = last ? Math.min(now - last, 100) : 0
      last = now
      // West to east, as the real Earth turns.
      clock += dt / 1000
      phi = swayPhi(clock)
      globe.update({ phi })
      paint()
      frame = requestAnimationFrame(tick)
    }
    const start = () => {
      cancelAnimationFrame(frame)
      last = 0
      if (still.matches) {
        phi = facing(TEL_AVIV[1])
        globe.update({ phi })
        paint()
      }
      else if (visible) frame = requestAnimationFrame(tick)
    }

    const ro = new ResizeObserver(() => {
      globe.update({ width: px(), height: px() })
      paint()
    })
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
      <canvas ref={overlayRef} className={`${s.canvas} ${s.overlay}`} />
    </div>
  )
}
