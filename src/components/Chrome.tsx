import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import s from './Chrome.module.css'
import { Container } from './ui'
import { useT, useLangPath } from '../i18n/useT'
import { LANGS, LANG_LABEL, LANG_NAME, LANG_HINT, browserLang, rememberLang, storedLang } from '../i18n/LangContext'
import type { Lang } from '../content/types'
import { assetPath } from '../lib/assetPath'
import { ExternalLink } from './bits'
import { ui } from './ui'
import { useTheme } from '../lib/theme'
import { MegaNav, MegaAccordion, buildMenu } from './Mega'

const SOCIAL = {
  facebook:
    'https://www.facebook.com/pages/פראגון-לוגיסטיקה-בעמ-Paragon-Logistics-Ltd/386507584847098',
  linkedin: 'https://www.linkedin.com/company/paragon-logistics-ltd.',
  pinterest: 'https://www.pinterest.com/paragonlogistic/',
}

/** Social marks redrawn as inline SVG — the old site used 42px JPEGs. */
const ICONS = {
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6A22 22 0 0 0 14.3 3.5c-2.4 0-4 1.45-4 4.1v2.3H7.6V13h2.7v8z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.94 8.5H4.1V21h2.84zM5.5 3.2A1.65 1.65 0 1 0 5.5 6.5a1.65 1.65 0 0 0 0-3.3M21 21h-2.83v-6.1c0-1.45-.03-3.32-2.02-3.32-2.03 0-2.34 1.58-2.34 3.21V21H10.1V8.5h2.72v1.71h.04a2.98 2.98 0 0 1 2.68-1.47c2.87 0 3.4 1.89 3.4 4.34z" />
    </svg>
  ),
  pinterest: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 3a9 9 0 0 0-3.3 17.36c-.08-.72-.15-1.83.03-2.62.16-.71 1.06-4.5 1.06-4.5s-.27-.54-.27-1.34c0-1.26.73-2.2 1.63-2.2.77 0 1.14.58 1.14 1.27 0 .78-.49 1.94-.75 3.02-.21.9.46 1.64 1.35 1.64 1.62 0 2.86-1.71 2.86-4.17 0-2.18-1.57-3.7-3.8-3.7-2.6 0-4.12 1.94-4.12 3.94 0 .78.3 1.62.67 2.07a.27.27 0 0 1 .06.26c-.07.28-.22.9-.25 1.02-.04.17-.13.2-.3.12-1.14-.53-1.85-2.19-1.85-3.52 0-2.87 2.08-5.5 6.01-5.5 3.15 0 5.6 2.25 5.6 5.25 0 3.13-1.97 5.65-4.71 5.65-.92 0-1.79-.48-2.08-1.05l-.57 2.16c-.2.79-.76 1.78-1.14 2.38A9 9 0 1 0 12 3" />
    </svg>
  ),
}

const SUN = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
)

const MOON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
  </svg>
)

const GLOBE = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3" />
  </svg>
)

const CHECK = (
  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m3.5 8.5 3 3 6-7" />
  </svg>
)

const GEAR = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
)

/**
 * A gear that opens a small preferences panel. For now it holds the light/dark
 * choice, so the header stays uncluttered and more settings have room to land.
 */
function Preferences() {
  const { t } = useT()
  const [theme, toggle] = useTheme()
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const location = useLocation()

  useEffect(() => setOpen(false), [location.pathname])
  useEffect(() => {
    if (!open) return
    const away = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false)
    }
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', away)
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('pointerdown', away)
      document.removeEventListener('keydown', esc)
    }
  }, [open])

  const choose = (next: 'light' | 'dark') => {
    if (next !== theme) toggle()
  }

  return (
    <div className={s.prefs} ref={root}>
      <button
        type="button"
        className={s.themeToggle}
        aria-expanded={open}
        aria-controls="preferences-panel"
        aria-label={t.nav.preferences}
        title={t.nav.preferences}
        onClick={() => setOpen((v) => !v)}
      >
        {GEAR}
      </button>
      {open ? (
        <div className={s.prefsPanel} id="preferences-panel" role="group" aria-label={t.nav.preferences}>
          <p className={s.prefsTitle}>{t.nav.appearance}</p>
          <div className={s.segment}>
            {(['light', 'dark'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                className={s.segmentOption}
                aria-pressed={theme === mode}
                onClick={() => choose(mode)}
              >
                {mode === 'light' ? SUN : MOON}
                {mode === 'light' ? t.nav.lightMode : t.nav.darkMode}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}

/** A globe button that opens the three languages, each in its own script. */
function LanguageMenu({ hrefFor }: { hrefFor: (to: Lang) => string }) {
  const { t, lang } = useT()
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const location = useLocation()

  useEffect(() => setOpen(false), [location.pathname])
  useEffect(() => {
    if (!open) return
    const away = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false)
    }
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', away)
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('pointerdown', away)
      document.removeEventListener('keydown', esc)
    }
  }, [open])

  return (
    <div className={s.langMenu} ref={root}>
      <button
        type="button"
        className={s.langButton}
        aria-expanded={open}
        aria-controls="language-menu"
        aria-label={`${t.nav.language}: ${LANG_NAME[lang]}`}
        onClick={() => setOpen((v) => !v)}
      >
        {GLOBE}
        <span className={s.langCode}>{LANG_LABEL[lang]}</span>
      </button>
      {open ? (
        <ul className={s.langPanel} id="language-menu">
          {LANGS.map((to) => (
            <li key={to}>
              {to === lang ? (
                <span className={s.langOption} aria-current="true" lang={to}>
                  {LANG_NAME[to]}
                  {CHECK}
                </span>
              ) : (
                <Link
                  to={hrefFor(to)}
                  className={s.langOption}
                  lang={to}
                  hrefLang={to}
                  onClick={() => rememberLang(to)}
                >
                  {LANG_NAME[to]}
                </Link>
              )}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

/**
 * If the browser prefers another language the site has, and the visitor has
 * not chosen one or dismissed this, offer it — never switch on their behalf.
 */
function LanguageHint({ hrefFor }: { hrefFor: (to: Lang) => string }) {
  const { t, lang } = useT()
  const [offer, setOffer] = useState<Lang | null>(null)

  useEffect(() => {
    let dismissed = false
    try {
      dismissed = sessionStorage.getItem('paragon.langHint') === '1'
    } catch {
      // Treat as not dismissed.
    }
    const want = browserLang()
    setOffer(!dismissed && !storedLang() && want !== lang ? want : null)
  }, [lang])

  if (!offer) return null
  const dismiss = () => {
    try {
      sessionStorage.setItem('paragon.langHint', '1')
    } catch {
      // Fine: it simply returns on the next page.
    }
    setOffer(null)
  }
  const copy = LANG_HINT[offer]
  return (
    <div className={s.hint} lang={offer} dir={offer === 'he' ? 'rtl' : 'ltr'} role="region" aria-label={t.nav.language}>
      <Container>
        <div className={s.hintInner}>
          <span>{copy.text}</span>
          <Link to={hrefFor(offer)} className={s.hintCta} onClick={() => rememberLang(offer)}>
            {copy.cta}
          </Link>
          <button type="button" className={s.hintClose} aria-label={t.nav.close} onClick={dismiss}>
            ×
          </button>
        </div>
      </Container>
    </div>
  )
}

export function Header() {
  const { t } = useT()
  const path = useLangPath()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const menu = buildMenu(t)

  // Any navigation closes the mobile menu, including back/forward.
  useEffect(() => setOpen(false), [location.pathname])

  /**
   * The language switch preserves the current route:
   * `/en/global-trade/air` ↔ `/he/global-trade/air`.
   */
  const langHref = (to: Lang) => {
    const rest = location.pathname.replace(/^\/(en|he|ja)(?=\/|$)/, '')
    return `/${to}${rest}${location.hash}`
  }

  return (
    <>
      <a className={s.skip} href="#main">
        {t.nav.skipToContent}
      </a>

      <LanguageHint hrefFor={langHref} />

      <header className={s.header}>
        <Container>
          <div className={s.headerInner}>
            <Link to={path('/')} className={s.brand} aria-label={t.meta.companyName}>
              <img className={s.logo} src={assetPath('logo.png')} alt={t.meta.companyName} width={435} height={136} />
            </Link>

            <nav className={s.nav} aria-label={t.nav.menu}>
              <MegaNav groups={menu} />
            </nav>

            <LanguageMenu hrefFor={langHref} />

            <ExternalLink
              href={t.home.hero.quoteCta.href}
              className={`${ui.btn} ${ui.btnAccent} ${s.quote}`}
            >
              {t.nav.quote}
            </ExternalLink>

            <Preferences />

            <button
              type="button"
              className={s.menuButton}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              <span className={s.burger} data-open={open} aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
              <span className={s.menuLabel}>{open ? t.nav.close : t.nav.menu}</span>
            </button>
          </div>
        </Container>

        {open ? (
          <div className={s.mobileNav} id="mobile-nav">
            <Container>
              <MegaAccordion groups={menu} onGo={() => setOpen(false)} />
              <ExternalLink
                href={t.home.hero.quoteCta.href}
                className={`${ui.btn} ${ui.btnAccent} ${s.mobileQuote}`}
              >
                {t.home.hero.quoteCta.label}
              </ExternalLink>
            </Container>
          </div>
        ) : null}
      </header>
    </>
  )
}

export function Footer() {
  const { t } = useT()
  const path = useLangPath()

  return (
    <footer className={s.footer}>
      <Container>
        <div className={s.footerTop}>
          <div className={s.footerBrand}>
            <img
              className={s.footerLogo}
              src={assetPath('logo.png')}
              alt={t.meta.companyName}
              width={435}
              height={136}
            />
            <p className={s.footerTagline}>{t.meta.tagline}</p>
            <ul className={s.footerTrust}>
              {t.home.trust.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <nav aria-labelledby="footer-nav-heading">
            <h2 className={s.footerHeading} id="footer-nav-heading">
              {t.meta.companyName}
            </h2>
            <ul className={s.footerList}>
              {t.nav.footer.map((item) => (
                <li key={item.to}>
                  <Link to={path(item.to)} className={s.footerLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={s.footerHeading}>{t.footer.partnersHeading}</h2>
            {/* NX leads and is larger; cargo-partner follows. White marks for the navy. */}
            <div className={s.partners}>
              <Link to={path('/nippon')} className={s.partnerLink}>
                <img
                  className={s.partnerNx}
                  src={assetPath('nx-logo-white.png')}
                  alt={t.nippon.logoAlt}
                  width={1041}
                  height={174}
                  loading="lazy"
                />
              </Link>
              <a
                href={t.home.cargoPartner.cta.href}
                className={s.partnerLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className={s.partnerCp}
                  src={assetPath('cargo-partner-logo.svg')}
                  alt={t.home.cargoPartner.logoAlt}
                  width={120}
                  height={92}
                  loading="lazy"
                />
              </a>
            </div>
          </div>

          <div>
            <h2 className={s.footerHeading}>{t.footer.socialHeading}</h2>
            <div className={s.social}>
              <a
                className={s.socialLink}
                href={SOCIAL.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.footer.social.facebook}
              >
                {ICONS.facebook}
              </a>
              <a
                className={s.socialLink}
                href={SOCIAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.footer.social.linkedin}
              >
                {ICONS.linkedin}
              </a>
              <a
                className={s.socialLink}
                href={SOCIAL.pinterest}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.footer.social.pinterest}
              >
                {ICONS.pinterest}
              </a>
            </div>
          </div>
        </div>

        <div className={s.footerBottom}>
          <span>{t.footer.copyright}</span>
          <Link to={path('/accessibility')}>{t.footer.accessibility}</Link>
        </div>
      </Container>
    </footer>
  )
}
