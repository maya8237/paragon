import s from './HeroGlobe.module.css'
import { Glyph } from './icons'
import { useT } from '../i18n/useT'

/**
 * The hero illustration: a dotted globe with trade lanes arcing out of Israel,
 * a ship and a plane running two of them.
 *
 * Purely decorative — everything it suggests is said in words beside it — so
 * the whole thing is hidden from assistive technology. Like the corridor map,
 * the base state is the finished state and motion only exists inside a
 * `prefers-reduced-motion: no-preference` query.
 *
 * Geography, so never mirrored for RTL.
 */
const HUB = { x: 292, y: 214 }

const LANES = [
  { id: 'eu', d: `M ${HUB.x} ${HUB.y} Q 236 118 158 138`, end: { x: 158, y: 138 } },
  { id: 'asia', d: `M ${HUB.x} ${HUB.y} Q 372 112 404 196`, end: { x: 404, y: 196 } },
  { id: 'am', d: `M ${HUB.x} ${HUB.y} Q 170 196 82 268`, end: { x: 82, y: 268 } },
  { id: 'af', d: `M ${HUB.x} ${HUB.y} Q 300 300 236 352`, end: { x: 236, y: 352 } },
]

export function HeroGlobe() {
  const { t } = useT()
  const [ocean, air] = t.globalTrade.modes

  return (
    <div className={s.wrap} aria-hidden="true">
      <svg className={s.svg} viewBox="0 0 480 480">
        <defs>
          <radialGradient id="globe-fill" cx="38%" cy="32%" r="75%">
            <stop offset="0%" stopColor="#1d5c96" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#06243f" stopOpacity="0.1" />
          </radialGradient>
        </defs>

        <circle className={s.globe} cx="240" cy="240" r="190" fill="url(#globe-fill)" />
        {[66, 132].map((ry) => (
          <ellipse key={`lat${ry}`} className={s.grid} cx="240" cy="240" rx="190" ry={ry} />
        ))}
        {[64, 132].map((rx) => (
          <ellipse key={`lon${rx}`} className={s.grid} cx="240" cy="240" rx={rx} ry="190" />
        ))}
        <line className={s.grid} x1="50" y1="240" x2="430" y2="240" />
        <line className={s.grid} x1="240" y1="50" x2="240" y2="430" />

        {LANES.map((lane, i) => (
          <g key={lane.id}>
            <path className={s.laneGlow} d={lane.d} />
            <path className={s.lane} d={lane.d} style={{ animationDelay: `${i * -0.6}s` }} />
            <circle className={s.port} cx={lane.end.x} cy={lane.end.y} r="4.5" />
          </g>
        ))}

        <g className={s.mover} style={{ offsetPath: `path('${LANES[0]!.d}')` }}>
          <circle r="11" className={s.moverDisc} />
          <svg x="-7" y="-7" width="14" height="14" viewBox="0 0 24 24" className={s.moverIcon}>
            <Glyph name="ship" />
          </svg>
        </g>
        <g
          className={`${s.mover} ${s.moverLate}`}
          style={{ offsetPath: `path('${LANES[1]!.d}')` }}
        >
          <circle r="11" className={s.moverDisc} />
          <svg x="-7" y="-7" width="14" height="14" viewBox="0 0 24 24" className={s.moverIcon}>
            <Glyph name="plane" />
          </svg>
        </g>

        <circle className={s.pulse} cx={HUB.x} cy={HUB.y} r="8" />
        <circle className={s.hub} cx={HUB.x} cy={HUB.y} r="7" />
      </svg>

      <div className={`${s.chip} ${s.chipA}`}>
        <span className={s.chipIcon}>
          <Glyph name="ship" />
        </span>
        {ocean?.title}
      </div>
      <div className={`${s.chip} ${s.chipB}`}>
        <span className={s.chipIcon}>
          <Glyph name="plane" />
        </span>
        {air?.title}
      </div>
    </div>
  )
}
