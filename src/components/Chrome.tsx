import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import s from './Chrome.module.css'
import { Container } from './ui'
import { useT, useLangPath } from '../i18n/useT'

const SOCIAL = {
  facebook:
    'https://www.facebook.com/pages/פראגון-לוגיסטיקה-בעמ-Paragon-Logistics-Ltd/386507584847098',
  linkedin: 'https://www.linkedin.com/company/paragon-logistics-ltd.',
  pinterest: 'https://www.pinterest.com/paragonlogistic/',
  nippon: 'http://www.nipponexpress.com',
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

export function Header() {
  const { t, other } = useT()
  const path = useLangPath()
  const location = useLocation()
  const [open, setOpen] = useState(false)

  // Any navigation closes the mobile menu, including back/forward.
  useEffect(() => setOpen(false), [location.pathname])

  /**
   * The language switch preserves the current route:
   * `/en/global-trade/air` ↔ `/he/global-trade/air`.
   */
  const otherLangHref = (() => {
    const rest = location.pathname.replace(/^\/(en|he)(?=\/|$)/, '')
    return `/${other}${rest}${location.hash}`
  })()

  return (
    <>
      <a className={s.skip} href="#main">
        {t.nav.skipToContent}
      </a>

      <header className={s.header}>
        <Container>
          <div className={s.headerInner}>
            <Link to={path('/')} className={s.brand} aria-label={t.meta.companyName}>
              <img className={s.logo} src="/logo.png" alt={t.meta.companyName} width={435} height={136} />
            </Link>

            <a
              className={s.badge}
              href={SOCIAL.nippon}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className={s.badgeImg}
                src="/nippon-badge.jpg"
                alt={t.footer.nipponBadgeAlt}
                width={212}
                height={32}
              />
            </a>

            <nav className={s.nav} aria-label={t.nav.menu}>
              <ul className={s.navList}>
                {t.nav.primary.map((item) => (
                  <li key={item.to}>
                    <NavLink to={path(item.to)} end={item.to === '/'} className={s.navLink}>
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className={s.langSwitch}>
              <Link
                to={otherLangHref}
                className={s.langLink}
                lang={other}
                hrefLang={other}
                title={t.meta.switchToOtherLang}
              >
                {t.meta.otherLangLabel}
              </Link>
            </div>

            <button
              type="button"
              className={s.menuButton}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? t.nav.close : t.nav.menu}
            </button>
          </div>
        </Container>

        {open ? (
          <div className={s.mobileNav} id="mobile-nav">
            <Container>
              <ul className={s.mobileList}>
                {t.nav.primary.map((item) => (
                  <li key={item.to}>
                    <NavLink to={path(item.to)} end={item.to === '/'} className={s.mobileLink}>
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
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
              src="/logo.png"
              alt={t.meta.companyName}
              width={435}
              height={136}
            />
            <p className={s.footerTagline}>{t.meta.tagline}</p>
            <a href={SOCIAL.nippon} target="_blank" rel="noopener noreferrer">
              <img
                src="/nippon-badge.jpg"
                alt={t.footer.nipponBadgeAlt}
                width={212}
                height={32}
                style={{ height: '2rem', width: 'auto' }}
              />
            </a>
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
