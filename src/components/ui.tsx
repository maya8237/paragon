import type { ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import s from './ui.module.css'
import type { Prose as ProseData } from '../content/types'
import { useT, useLangPath } from '../i18n/useT'
import { Glyph, ROUTE_ICON, type IconName } from './icons'

function cx(...parts: (string | false | undefined)[]): string {
  return parts.filter(Boolean).join(' ')
}

export function Container({
  children,
  narrow,
  className,
}: {
  children: ReactNode
  narrow?: boolean
  className?: string
}) {
  return <div className={cx(s.container, narrow && s.narrow, className)}>{children}</div>
}

export function Section({
  children,
  inverted,
  tight,
  id,
  narrow,
  labelledBy,
}: {
  children: ReactNode
  inverted?: boolean
  tight?: boolean
  id?: string
  narrow?: boolean
  labelledBy?: string
}) {
  // The bare `inverted` class is global on purpose: components in other CSS
  // modules (mode tags, figures) key their dark-band colours off it.
  const className = cx(
    tight ? s.sectionTight : s.section,
    inverted && s.inverted,
    inverted && 'inverted',
  )

  return (
    <section id={id} aria-labelledby={labelledBy} className={className}>
      <Container narrow={narrow}>{children}</Container>
    </section>
  )
}

export function SectionHead({
  tag,
  eyebrow,
  heading,
  lede,
  id,
  center,
}: {
  tag?: ReactNode
  /** Small label above the heading. */
  eyebrow?: string
  heading: string
  lede?: string
  id?: string
  center?: boolean
}) {
  return (
    <div className={cx(s.sectionHead, center && s.sectionHeadCenter)}>
      {tag}
      {eyebrow ? <span className={s.eyebrow}>{eyebrow}</span> : null}
      <h2 id={id}>{heading}</h2>
      {lede ? <p className={s.sectionLede}>{lede}</p> : null}
    </div>
  )
}

export function Divider() {
  return <hr className={s.divider} />
}

export function Prose({ data, as = 'h2' }: { data: ProseData; as?: 'h2' | 'h3' }) {
  const Heading = as
  return (
    <div className={s.prose}>
      <Heading>{data.heading}</Heading>
      {data.paragraphs.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
  )
}

export function Grid({ children, wide }: { children: ReactNode; wide?: boolean }) {
  return <div className={wide ? s.grid2 : s.grid}>{children}</div>
}

/**
 * Prose with a narrow aside beside it, stacking below 48em.
 *
 * The aside column is sized to the plates it carries — wide enough for
 * a photograph at its true resolution and no wider, so the prose keeps the
 * larger share of the measure.
 */
export function Split({ children, aside }: { children: ReactNode; aside: ReactNode }) {
  return (
    <div className={s.split}>
      <div>{children}</div>
      {/* The grid's own column sizes the aside; it needs no styles of its own. */}
      <div>{aside}</div>
    </div>
  )
}

export function Card({ children }: { children: ReactNode }) {
  return <div className={s.card}>{children}</div>
}

/** A card that is itself a link to an internal route. */
export function CardLink({
  to,
  title,
  body,
  tag,
  media,
  icon,
}: {
  to: string
  title: string
  body: string
  tag?: ReactNode
  /** Optional plate above the title. Decorative to the link's accessible name. */
  media?: ReactNode
  /** Line icon set above the title; defaults to the route's own icon. */
  icon?: IconName | false
}) {
  const glyph = icon === false ? undefined : (icon ?? ROUTE_ICON[to])
  const { t } = useT()
  const path = useLangPath()
  return (
    <Link to={path(to)} className={cx(s.card, s.cardLink)}>
      {media ? <div className={s.cardMedia}>{media}</div> : null}
      {glyph ? (
        <span className={s.cardIcon}>
          <Glyph name={glyph} />
        </span>
      ) : null}
      {tag}
      <h3 className={s.cardTitle}>{title}</h3>
      <p className={s.cardBody}>{body}</p>
      <span className={s.cardArrow} aria-hidden="true">
        {t.common.readMore}
      </span>
    </Link>
  )
}

export function TickList({ items }: { items: string[] }) {
  return (
    <ul className={s.ticks}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

export function ChipList({ items }: { items: string[] }) {
  return (
    <ul className={s.chips}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

export function StepList({ items }: { items: string[] }) {
  return (
    <ol className={s.steps}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ol>
  )
}

export function ButtonRow({ children }: { children: ReactNode }) {
  return <div className={s.btnRow}>{children}</div>
}

export function ButtonLink({
  to,
  children,
  variant = 'primary',
}: {
  to: string
  children: ReactNode
  variant?: 'primary' | 'ghost' | 'accent'
}) {
  const path = useLangPath()
  const tone = { primary: s.btnPrimary, ghost: s.btnGhost, accent: s.btnAccent }[variant]
  return (
    <Link to={path(to)} className={cx(s.btn, tone)}>
      {children}
    </Link>
  )
}

/** A button that cannot be used right now. Stays in the layout, not focusable, announced as disabled. */
export function DisabledButton({
  children,
  variant = 'primary',
}: {
  children: ReactNode
  variant?: 'primary' | 'ghost' | 'accent'
}) {
  const tone = { primary: s.btnPrimary, ghost: s.btnGhost, accent: s.btnAccent }[variant]
  return (
    <button type="button" disabled className={cx(s.btn, tone, s.btnDisabled)}>
      {children}
    </button>
  )
}

export function FigureRow({ children }: { children: ReactNode }) {
  return <div className={s.figures}>{children}</div>
}

/** `/he/global-trade/air/` → `/global-trade/air`: the route without language or trailing slash. */
function routeOf(pathname: string): string {
  return pathname.replace(/^\/(en|he|ja)(?=\/|$)/, '').replace(/\/$/, '') || '/'
}

/**
 * Decorative art for the page header: the page's own icon in a hub, with a
 * shipment dot circling it on a dashed orbit. Hidden below 60em.
 */
function HeaderArt({ icon }: { icon: IconName }) {
  return (
    <div className={s.pageHeaderArt} aria-hidden="true">
      <svg viewBox="0 0 280 280">
        <circle className={s.orbit} cx="140" cy="140" r="132" />
        <circle className={s.orbit} cx="140" cy="140" r="96" />
        <g className={s.orbitSpin}>
          <circle className={s.orbitDot} cx="140" cy="8" r="5" />
          <circle className={s.orbitDot} cx="236" cy="140" r="3.5" opacity="0.6" />
        </g>
        <circle className={s.orbitHub} cx="140" cy="140" r="56" />
        <svg x="108" y="108" width="64" height="64" viewBox="0 0 24 24">
          <Glyph name={icon} />
        </svg>
      </svg>
    </div>
  )
}

/** Home › [Global Trade ›] — derived from the current route. */
function Breadcrumb({ title }: { title: string }) {
  const { t } = useT()
  const path = useLangPath()
  const { pathname } = useLocation()
  const rest = routeOf(pathname)
  const parent = rest.startsWith('/global-trade/')
    ? t.nav.primary.find((item) => item.to === '/global-trade')
    : undefined
  const home = t.nav.primary[0]
  const sep = (
    <span className={s.breadcrumbSep} aria-hidden="true">
      ›
    </span>
  )

  return (
    <nav aria-label={t.nav.breadcrumb}>
      <ol className={s.breadcrumb}>
        <li>
          <Link to={path('/')}>{home?.label}</Link>
        </li>
        {parent ? (
          <>
            <li aria-hidden="true">{sep}</li>
            <li>
              <Link to={path(parent.to)}>{parent.label}</Link>
            </li>
          </>
        ) : null}
        <li aria-hidden="true">{sep}</li>
        <li aria-current="page">{title}</li>
      </ol>
    </nav>
  )
}

export function PageHeader({
  tag,
  title,
  lede,
  children,
}: {
  tag?: ReactNode
  title: string
  lede?: string
  children?: ReactNode
}) {
  const { pathname } = useLocation()
  const icon = ROUTE_ICON[routeOf(pathname)] ?? 'globe'

  return (
    <header className={s.pageHeader}>
      <Container>
        <div className={s.pageHeaderInner}>
          <HeaderArt icon={icon} />
          <Breadcrumb title={title} />
          {tag}
          <h1>{title}</h1>
          {lede ? <p className={s.sectionLede}>{lede}</p> : null}
          {children}
        </div>
      </Container>
    </header>
  )
}

/**
 * Pill sub-navigation, used by the Global Trade tree. NavLink (not Link) so the
 * current page gets `aria-current="page"`, which the stylesheet marks with the
 * one saturated colour on the page.
 */
export function SubNav({ items, label }: { items: { label: string; to: string }[]; label: string }) {
  const path = useLangPath()
  return (
    <nav className={s.subnav} aria-label={label}>
      {items.map((item) => (
        <NavLink key={item.to} to={path(item.to)} end className={s.subnavLink}>
          {ROUTE_ICON[item.to] ? <Glyph name={ROUTE_ICON[item.to]!} /> : null}
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}

export { s as ui }
