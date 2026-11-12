import { TRACKING_ENABLED } from '../site/features'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import s from './Mega.module.css'
import { useLangPath } from '../i18n/useT'
import type { SiteContent } from '../content/types'

interface MenuLink {
  label: string
  /** Internal route, optionally with a #hash. */
  to?: string
  /** External URL (opens in a new tab). */
  href?: string
  blurb?: string
}

interface Section {
  heading: string
  links: MenuLink[]
}

export interface MenuGroup {
  id: string
  label: string
  /** A plain top-level link, no panel. */
  to?: string
  blurb?: string
  viewAll?: MenuLink
  sections?: Section[]
}

/**
 * The menu is built from content that already exists (page titles, blurbs,
 * industry names) so every language gets it for free; only the group and
 * section headings are new strings.
 */
export function buildMenu(t: SiteContent): MenuGroup[] {
  const label = (to: string) => t.nav.primary.find((i) => i.to === to)?.label ?? to
  const m = t.nav.mega
  return [
    {
      id: 'services',
      label: m.services,
      blurb: m.servicesBlurb,
      sections: [
        {
          heading: m.freight,
          links: [
            { label: m.overview, to: '/global-trade' },
            ...t.globalTrade.modes.map((x) => ({ label: x.title, to: x.to, blurb: x.blurb })),
          ],
        },
        {
          heading: m.warehousing,
          links: [
            { label: label('/logistics'), to: '/logistics' },
            { label: label('/scm'), to: '/scm' },
          ],
        },
      ],
    },
    {
      id: 'industries',
      label: label('/industries'),
      blurb: m.sectorsBlurb,
      viewAll: { label: m.viewAll, to: '/industries' },
      sections: [
        {
          heading: m.sectors,
          links: t.industries.items.map((x) => ({
            label: x.title,
            to: `/industries#${x.id}`,
            blurb: x.blurb,
          })),
        },
      ],
    },
    {
      id: 'partners',
      label: m.partners,
      blurb: m.partnersBlurb,
      sections: [
        {
          heading: m.network,
          links: [
            { label: label('/nippon'), to: '/nippon' },
            { label: 'cargo-partner', href: t.home.cargoPartner.cta.href, blurb: t.home.cargoPartner.logoAlt },
          ],
        },
      ],
    },
    {
      id: 'company',
      label: m.company,
      blurb: m.companyBlurb,
      sections: [
        {
          heading: m.company,
          links: [
            { label: label('/about'), to: '/about' },
            { label: label('/contact'), to: '/contact' },
          ],
        },
      ],
    },
    ...(TRACKING_ENABLED ? [{ id: 'tracking', label: label('/tracking'), to: '/tracking' }] : []),
  ]
}

const CHEVRON = (
  <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m4 6 4 4 4-4" />
  </svg>
)

function Item({ link, onGo }: { link: MenuLink; onGo: () => void }) {
  const path = useLangPath()
  const body = (
    <>
      <span className={s.itemLabel}>{link.label}</span>
      {link.blurb ? <span className={s.itemBlurb}>{link.blurb}</span> : null}
    </>
  )
  if (link.href) {
    return (
      <a className={s.item} href={link.href} target="_blank" rel="noopener noreferrer" onClick={onGo}>
        {body}
      </a>
    )
  }
  return (
    <Link className={s.item} to={path(link.to ?? '/')} onClick={onGo}>
      {body}
    </Link>
  )
}

function Panel({ group, onGo }: { group: MenuGroup; onGo: () => void }) {
  const path = useLangPath()
  return (
    <div className={s.panel}>
      <div className={s.panelIntro}>
        <p className={s.panelTitle}>{group.label}</p>
        {group.blurb ? <p className={s.panelBlurb}>{group.blurb}</p> : null}
        {group.viewAll?.to ? (
          <Link className={s.viewAll} to={path(group.viewAll.to)} onClick={onGo}>
            {group.viewAll.label} <span aria-hidden="true" className={s.arrow}>→</span>
          </Link>
        ) : null}
      </div>
      <div className={s.sections}>
        {group.sections?.map((sec) => (
          <section key={sec.heading} className={s.section}>
            <h3 className={s.sectionHeading}>{sec.heading}</h3>
            <ul className={s.items}>
              {sec.links.map((l) => (
                <li key={l.label}>
                  <Item link={l} onGo={onGo} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}

/** Desktop bar: each group opens a panel on hover, focus or click. */
export function MegaNav({ groups }: { groups: MenuGroup[] }) {
  const path = useLangPath()
  const location = useLocation()
  const [openId, setOpenId] = useState<string | null>(null)
  const root = useRef<HTMLUListElement>(null)
  const timer = useRef<number>(0)

  useEffect(() => setOpenId(null), [location.pathname, location.hash])
  useEffect(() => {
    if (!openId) return
    const away = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpenId(null)
    }
    const esc = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setOpenId(null)
      ;(root.current?.querySelector('[aria-expanded="true"]') as HTMLElement | null)?.focus()
    }
    document.addEventListener('pointerdown', away)
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('pointerdown', away)
      document.removeEventListener('keydown', esc)
    }
  }, [openId])

  const hover = (id: string | null, e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setOpenId(id), id ? 60 : 160)
  }

  return (
    <ul className={s.bar} ref={root}>
      {groups.map((g) =>
        g.to ? (
          <li key={g.id}>
            <Link className={s.top} to={path(g.to)}>
              {g.label}
            </Link>
          </li>
        ) : (
          <li
            key={g.id}
            className={s.group}
            onPointerEnter={(e) => hover(g.id, e)}
            onPointerLeave={(e) => hover(null, e)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpenId((v) => (v === g.id ? null : v))
            }}
          >
            <button
              type="button"
              className={s.top}
              aria-expanded={openId === g.id}
              aria-controls={`mega-${g.id}`}
              onClick={() => setOpenId((v) => (v === g.id ? null : g.id))}
            >
              {g.label}
              <span className={s.chevron}>{CHEVRON}</span>
            </button>
            {openId === g.id ? (
              <div id={`mega-${g.id}`} className={s.panelWrap}>
                <Panel group={g} onGo={() => setOpenId(null)} />
              </div>
            ) : null}
          </li>
        ),
      )}
    </ul>
  )
}

/** Mobile: the same groups as an accordion. */
export function MegaAccordion({ groups, onGo }: { groups: MenuGroup[]; onGo: () => void }) {
  const path = useLangPath()
  const [openId, setOpenId] = useState<string | null>(null)
  return (
    <ul className={s.acc}>
      {groups.map((g) =>
        g.to ? (
          <li key={g.id}>
            <Link className={s.accTop} to={path(g.to)} onClick={onGo}>
              {g.label}
            </Link>
          </li>
        ) : (
          <li key={g.id}>
            <button
              type="button"
              className={s.accTop}
              aria-expanded={openId === g.id}
              aria-controls={`acc-${g.id}`}
              onClick={() => setOpenId((v) => (v === g.id ? null : g.id))}
            >
              {g.label}
              <span className={s.chevron}>{CHEVRON}</span>
            </button>
            {openId === g.id ? (
              <div id={`acc-${g.id}`} className={s.accBody}>
                {g.viewAll?.to ? (
                  <Link className={s.viewAll} to={path(g.viewAll.to)} onClick={onGo}>
                    {g.viewAll.label} <span aria-hidden="true" className={s.arrow}>→</span>
                  </Link>
                ) : null}
                {g.sections?.map((sec) => (
                  <section key={sec.heading}>
                    <h3 className={s.sectionHeading}>{sec.heading}</h3>
                    <ul className={s.items}>
                      {sec.links.map((l) => (
                        <li key={l.label}>
                          <Item link={{ ...l, blurb: undefined }} onGo={onGo} />
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            ) : null}
          </li>
        ),
      )}
    </ul>
  )
}
