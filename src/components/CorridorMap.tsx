import { Link } from 'react-router-dom'
import type { To } from 'react-router-dom'
import s from './CorridorMap.module.css'
import { useT } from '../i18n/useT'
import type { Location } from '../content/types'

/**
 * Positions for the five real sites, derived from their actual coordinates:
 *
 *   Haifa Port          32.824 N, 34.999 E
 *   Or Yehuda (HQ)      32.031 N, 34.852 E
 *   Ben Gurion (TLV)    32.000 N, 34.871 E
 *   Ramla               31.929 N, 34.871 E
 *   Ashdod Port         31.827 N, 34.635 E
 *
 * Every compass relationship between the five is preserved: Haifa is the
 * northernmost *and* the easternmost (the bay curves east), Ashdod is the
 * southernmost and westernmost, and Or Yehuda → Ben Gurion → Ramla step south
 * and east in that order.
 *
 * The east–west axis is stretched about 1.7× relative to north–south. At true
 * scale the cluster is roughly 34 km wide by 110 km tall, which would stack Or
 * Yehuda, Ben Gurion and Ramla within a few pixels of each other — the
 * stretch is what keeps those three individually legible.
 *
 * These coordinates are geography, so they are identical in both languages:
 * the diagram is deliberately NOT mirrored for RTL.
 */
const NODES: Record<Location['id'], { x: number; y: number; below: boolean }> = {
  haifa: { x: 360, y: 70, below: false },
  hq: { x: 250, y: 320, below: false },
  tlv: { x: 305, y: 390, below: true },
  ramla: { x: 315, y: 480, below: true },
  ashdod: { x: 105, y: 560, below: true },
}

/**
 * Label offsets. Every label is centre-anchored, because `text-anchor: start`
 * and `end` resolve against the inline base direction and would swap sides
 * between English and Hebrew — `middle` is the only direction-agnostic option.
 */
const LABEL = { aboveName: -36, aboveRole: -20, belowName: 26, belowRole: 42 }

/**
 * Cropped to the *label* bounds rather than the node bounds, so the panel has
 * no dead margin around the diagram. Sized against the English labels, which
 * are the wider of the two languages. Keep in step with the stylesheet's
 * `aspect-ratio`.
 */
const VIEW_BOX = '45 12 400 606'

type Corridor = {
  from: Location['id']
  to: Location['id']
  kind: 'road' | 'air' | 'ocean'
  /** Draw-in order. */
  delay: number
}

const CORRIDORS: Corridor[] = [
  { from: 'haifa', to: 'hq', kind: 'ocean', delay: 0 },
  { from: 'ashdod', to: 'hq', kind: 'ocean', delay: 120 },
  { from: 'hq', to: 'tlv', kind: 'road', delay: 240 },
  { from: 'hq', to: 'ramla', kind: 'road', delay: 360 },
  { from: 'tlv', to: 'ramla', kind: 'air', delay: 480 },
  { from: 'ashdod', to: 'ramla', kind: 'ocean', delay: 600 },
]

function line(from: Location['id'], to: Location['id']): string {
  const a = NODES[from]
  const b = NODES[to]
  return `M ${a.x} ${a.y} L ${b.x} ${b.y}`
}

/**
 * The hero diagram.
 *
 * Above 48em this renders as an SVG whose corridors draw in sequence, with one
 * shipment pip running Ashdod → Ramla once before coming to rest. Below 48em
 * the same five nodes render as a plain stacked list, which is also what a
 * screen reader gets via the description on the figure.
 *
 * `linked` turns every node into an anchor pointing at that site's card
 * further down the page. The default `hrefForNode` jumps to the node's id on
 * the *current* route — a router `To` with only `hash` set, so it resolves
 * against whatever pathname is already active — while the home page supplies
 * a full `{ pathname, hash }` pointing at the localized contact page instead.
 * These must go through router `Link`s rather than a hand-built `#id` string:
 * this app runs a `HashRouter`, where the entire URL fragment *is* the route,
 * so a bare `<a href="#hq">` doesn't add an anchor to the current route, it
 * replaces the whole route with `/hq` and 404s. Real anchor elements (which
 * `Link` renders under the hood) keep the nodes keyboard-operable, while the
 * optional callback supports contact-card highlighting after navigation.
 */
export function CorridorMap({
  linked = false,
  onNodeClick,
  hrefForNode = (id) => ({ hash: `#${id}` }),
}: {
  linked?: boolean
  onNodeClick?: (id: Location['id']) => void
  hrefForNode?: (id: Location['id']) => To
}) {
  const { t } = useT()
  const nodes = t.home.networkNodes

  // When the nodes are links the SVG is an interactive group, not a single
  // image, so it must not be collapsed to role="img".
  const svgRole = linked ? 'group' : 'img'

  return (
    <div className={s.wrap}>
      <figure className={s.figure}>
        <svg
          className={s.svg}
          viewBox={VIEW_BOX}
          role={svgRole}
          aria-labelledby="corridor-title corridor-desc"
        >
          <title id="corridor-title">{t.common.networkMapLabel}</title>
          <desc id="corridor-desc">{t.common.networkMapDescription}</desc>

          <g className={s.diagram}>
            {CORRIDORS.map((c) => (
              <path
                key={`${c.from}-${c.to}`}
                d={line(c.from, c.to)}
                pathLength={1}
                className={[
                  s.corridor,
                  s.corridorDraw,
                  c.kind === 'air' ? s.corridorAir : '',
                  c.kind === 'road' ? s.corridorRoad : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                style={{ animationDelay: `${c.delay}ms` }}
              />
            ))}

            {/* The travelling shipment — the one saturated mark on the page. */}
            <circle className={s.pipHalo} r={9} cx={0} cy={0} />
            <circle className={s.pip} r={4} cx={0} cy={0} />

            {nodes.map((node, i) => {
              const pos = NODES[node.id]
              // Name always reads above its role, whichever side of the node
              // the label block sits on.
              const nameY = pos.y + (pos.below ? LABEL.belowName : LABEL.aboveName)
              const roleY = pos.y + (pos.below ? LABEL.belowRole : LABEL.aboveRole)

              const marks = (
                <>
                  {/*
                    Invisible hit area. The node ring is only 18px across, well
                    under a comfortable target, so the pointer and focus target
                    is this circle instead.
                  */}
                  {linked ? <circle className={s.nodeHit} cx={pos.x} cy={pos.y} r={26} /> : null}
                  <circle className={s.nodeRing} cx={pos.x} cy={pos.y} r={9} />
                  <circle className={s.nodeCore} cx={pos.x} cy={pos.y} r={3} />
                  <text className={s.nodeLabel} x={pos.x} y={nameY} textAnchor="middle">
                    {node.name}
                  </text>
                  <text className={s.nodeRole} x={pos.x} y={roleY} textAnchor="middle">
                    {node.role}
                  </text>
                </>
              )

              return (
                <g
                  key={node.id}
                  className={[s.node, node.id === 'hq' ? s.nodeHq : ''].filter(Boolean).join(' ')}
                  style={{ animationDelay: `${300 + i * 90}ms` }}
                >
                  {linked ? (
                    <Link
                      to={hrefForNode(node.id)}
                      className={s.nodeLink}
                      onClick={() => onNodeClick?.(node.id)}
                      aria-label={`${node.name} — ${node.role}. ${t.common.jumpToLocation}`}
                    >
                      {marks}
                    </Link>
                  ) : (
                    marks
                  )}
                </g>
              )
            })}
          </g>
        </svg>
      </figure>

      {/* Mobile fallback — same five nodes, no diagram. */}
      <ul className={s.nodeList}>
        {nodes.map((node) => {
          const rowContent = (
            <>
              <span className={s.nodeListDot} aria-hidden="true" />
              <span className={s.nodeListName}>{node.name}</span>
              <span className={s.nodeListRole}>{node.role}</span>
            </>
          )
          return (
            <li key={node.id} className={s.nodeListItem}>
              {linked ? (
                <Link
                  className={s.nodeListRow}
                  to={hrefForNode(node.id)}
                  onClick={() => onNodeClick?.(node.id)}
                >
                  {rowContent}
                </Link>
              ) : (
                <div className={s.nodeListRow}>{rowContent}</div>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
