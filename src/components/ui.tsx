import type { ReactNode } from 'react'
import { Link, NavLink } from 'react-router-dom'
import s from './ui.module.css'
import type { Prose as ProseData } from '../content/types'
import { useT, useLangPath } from '../i18n/useT'

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
  heading,
  lede,
  id,
}: {
  tag?: ReactNode
  heading: string
  lede?: string
  id?: string
}) {
  return (
    <div className={s.sectionHead}>
      {tag}
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
      <div className={s.splitAside}>{aside}</div>
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
}: {
  to: string
  title: string
  body: string
  tag?: ReactNode
  /** Optional plate above the title. Decorative to the link's accessible name. */
  media?: ReactNode
}) {
  const { t } = useT()
  const path = useLangPath()
  return (
    <Link to={path(to)} className={cx(s.card, s.cardLink)}>
      {media ? <div className={s.cardMedia}>{media}</div> : null}
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
  variant?: 'primary' | 'ghost'
}) {
  const path = useLangPath()
  return (
    <Link
      to={path(to)}
      className={cx(s.btn, variant === 'primary' ? s.btnPrimary : s.btnGhost)}
    >
      {children}
    </Link>
  )
}

export function FigureRow({ children }: { children: ReactNode }) {
  return <div className={s.figures}>{children}</div>
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
  return (
    <header className={s.pageHeader}>
      <Container>
        <div className={s.pageHeaderInner}>
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
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}

export { s as ui }
