import type { ReactNode } from 'react'
import s from './bits.module.css'
import type { ExternalLink as ExternalLinkData, Figure, Location, Mode } from '../content/types'
import { useT } from '../i18n/useT'

/**
 * Mode tag. The label is a transport/function type, never a sequence number —
 * the sections of this site are typed, not ordered.
 *
 * `mode` is an internal key; the visible text always comes from the content
 * tree, so the tag is translated like everything else.
 */
export function ModeTag({ mode, label }: { mode: Mode; label?: string }) {
  const { t } = useT()
  return <span className={s.modeTag}>{label ?? t.common.modes[mode]}</span>
}

export function FigureStat({ figure }: { figure: Figure }) {
  return (
    <div className={s.figure}>
      <span className={s.figureValue}>
        {/* Isolated, not forced LTR — a value may carry a Hebrew unit, and the
            bidi algorithm places it correctly for the page's direction. */}
        <span className="bidi-isolate">{figure.value}</span>
      </span>
      <span className={s.figureLabel}>{figure.label}</span>
    </div>
  )
}

/**
 * Every link that leaves the site goes through here, so the "opens in a new
 * tab" affordance can never be forgotten on one of them.
 */
export function ExternalLink({
  href,
  children,
  className,
}: {
  href: string
  children: ReactNode
  className?: string
}) {
  const { t } = useT()
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={[s.external, className].filter(Boolean).join(' ')}
    >
      <span>{children}</span>
      <span className={s.externalIcon} aria-hidden="true">
        ↗
      </span>
      <span className="sr-only">({t.common.externalLink})</span>
    </a>
  )
}

/** The brass seal glyph. Used only next to credentials. */
function CertMark() {
  return (
    <svg className={s.certMark} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="12" cy="10" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M9 9.8l2.1 2.1L15 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.6 16.2L7.5 22l4.5-2.2L16.5 22l-1.1-5.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function CertList({ items }: { items: ExternalLinkData[] }) {
  return (
    <ul className={s.certList}>
      {items.map((item) => (
        <li key={item.href} className={s.certItem}>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={s.certLink}
          >
            <CertMark />
            <span className={s.certLabel}>{item.label}</span>
            <span className={s.certMeta} aria-hidden="true">
              PDF ↗
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}

/** Strip everything but digits and a leading + so `tel:` links dial correctly. */
function telHref(value: string): string {
  const digits = value.replace(/[^\d+]/g, '')
  return `tel:${digits.startsWith('+') ? digits : `+972${digits.replace(/^0/, '')}`}`
}

export function LocationCard({ location, flash = false }: { location: Location; flash?: boolean }) {
  const { t } = useT()
  return (
    <article className={flash ? `${s.location} ${s.locationFlash}` : s.location} id={location.id}>
      <div className={s.locationHead}>
        <h3 className={s.locationName}>{location.name}</h3>
      </div>

      <address className={s.locationAddress}>
        {location.address.map((line) => (
          <span key={line}>
            {line}
            <br />
          </span>
        ))}
      </address>

      <dl className={s.contactList}>
        {location.email ? (
          <>
            <dt className={s.contactLabel}>{t.common.email}</dt>
            <dd className={s.contactValue}>
              <a href={`mailto:${location.email}`} className="ltr-inline">
                {location.email}
              </a>
            </dd>
          </>
        ) : null}

        {location.phones.map((phone) => (
          <div key={`${phone.label}-${phone.value}`} style={{ display: 'contents' }}>
            <dt className={s.contactLabel}>{phone.label}</dt>
            <dd className={s.contactValue}>
              <a href={telHref(phone.value)} className="ltr-inline">
                {phone.value}
              </a>
            </dd>
          </div>
        ))}
      </dl>
    </article>
  )
}
