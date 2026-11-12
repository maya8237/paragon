import s from './Home.module.css'
import {
  ButtonLink,
  ButtonRow,
  CardLink,
  Container,
  FigureRow,
  Grid,
  Section,
  SectionHead,
  ui,
} from '../components/ui'
import { CertList, ExternalLink, FigureStat } from '../components/bits'
import { Plate, type PhotoName } from '../components/Plate'
import { CorridorMap } from '../components/CorridorMap'
import { HeroGlobe } from '../components/HeroGlobe'
import { Glyph } from '../components/icons'
import { Reveal } from '../components/Reveal'
import { assetPath } from '../lib/assetPath'
import { useLangPath, useT } from '../i18n/useT'
import { usePageMeta } from '../i18n/usePageMeta'

/**
 * The old home page linked each pillar as an image tile. These are those tiles,
 * matched back to the routes they pointed at.
 */
const PILLAR_PHOTO: Record<string, PhotoName> = {
  '/scm': 'scm',
  '/global-trade': 'global-trade',
  '/logistics': 'logistics',
}

/**
 * Home, in the order a prospective customer asks their questions:
 * what do you do (hero) → can I trust you (figures, credentials) → which
 * service fits me (pillars, modes) → where are you (network) → how do I start
 * (tracking, quote).
 */
export default function Home() {
  const { t } = useT()
  const langPath = useLangPath()
  const home = t.home
  usePageMeta(home.meta, { isHome: true })

  return (
    <>
      <section className={`${s.hero} ${ui.inverted} inverted`} aria-labelledby="hero-title">
        <Container>
          <div className={s.heroGrid}>
            <div className={s.heroCopy}>
              <p className={s.heroSlogan}>{home.hero.slogan}</p>
              {/* One heading: the name is what visitors see first, the tagline
                  keeps the services in the page's main heading for search. */}
              <h1 id="hero-title" className={s.heroTitle}>
                <span className={s.heroName}>{home.hero.heading}</span>
                <span className={s.heroTagline}>{t.meta.tagline}</span>
              </h1>
              <p className={s.heroLede}>{home.hero.lede[0]}</p>
              <div className={s.heroActions}>
                <ExternalLink
                  href={home.hero.quoteCta.href}
                  className={`${ui.btn} ${ui.btnAccent}`}
                >
                  {home.hero.quoteCta.label}
                </ExternalLink>
                <ButtonLink to={home.hero.primaryCta.to} variant="ghost">
                  {home.hero.primaryCta.label}
                </ButtonLink>
              </div>
              <ul className={s.trust}>
                {home.trust.map((item) => (
                  <li key={item}>
                    <Glyph name="check" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <HeroGlobe />
          </div>
        </Container>
      </section>

      <Container>
        <div className={s.figureCard}>
          <FigureRow>
            {home.figures.map((figure) => (
              <FigureStat key={figure.label} figure={figure} />
            ))}
          </FigureRow>
        </div>
      </Container>

      <Section labelledBy="pillars-heading">
        <Reveal className={s.reveal} revealedClassName={s.revealed}>
          <SectionHead
            eyebrow={home.sections.servicesEyebrow}
            heading={home.sections.servicesHeading}
            lede={t.meta.tagline}
            id="pillars-heading"
          />
        </Reveal>
        <Grid>
          {home.pillars.map((pillar) => (
            <CardLink
              key={pillar.to}
              to={pillar.to}
              title={pillar.title}
              body={pillar.blurb}
              media={
                PILLAR_PHOTO[pillar.to] ? (
                  <Plate name={PILLAR_PHOTO[pillar.to]} alt={pillar.imageAlt} flush />
                ) : null
              }
            />
          ))}
        </Grid>
      </Section>

      <section className={s.modes} aria-labelledby="modes-heading">
        <Container>
          <Reveal className={s.reveal} revealedClassName={s.revealed}>
            <SectionHead
              eyebrow={home.sections.modesEyebrow}
              heading={home.sections.modesHeading}
              id="modes-heading"
            />
          </Reveal>
          <div className={s.modeGrid}>
            {t.globalTrade.modes.map((mode) => (
              <CardLink key={mode.to} to={mode.to} title={mode.title} body={mode.blurb} />
            ))}
          </div>
        </Container>
      </section>

      <Section labelledBy="network-heading">
        <div className={s.network}>
          <div className={s.networkCopy}>
            <SectionHead
              eyebrow={home.sections.networkEyebrow}
              heading={home.sections.networkHeading}
              id="network-heading"
            />
            {home.hero.lede.slice(1).map((p) => (
              <p key={p} className={s.networkText}>
                {p}
              </p>
            ))}
            <ButtonRow>
              <ButtonLink to={home.hero.secondaryCta.to}>{home.hero.secondaryCta.label}</ButtonLink>
            </ButtonRow>
          </div>
          <div className={s.mapPanel}>
            <CorridorMap
              linked
              hrefForNode={(id) => ({ pathname: langPath('/contact'), hash: `#${id}` })}
            />
          </div>
        </div>
      </Section>

      <Section tight labelledBy="certs-heading">
        <div className={s.certBand}>
          <Reveal className={s.reveal} revealedClassName={s.revealed}>
            <SectionHead
              heading={home.certificationsTeaser.heading}
              lede={home.certificationsTeaser.blurb}
              id="certs-heading"
            />
            <ButtonRow>
              <ButtonLink to={home.certificationsTeaser.cta.to} variant="ghost">
                {home.certificationsTeaser.cta.label}
              </ButtonLink>
            </ButtonRow>
          </Reveal>
          <CertList items={t.about.certifications.items} />
        </div>
      </Section>

      <Section inverted labelledBy="tracking-heading">
        <div className={s.teaserGrid}>
          {/* Green, as the old site's "Shipment's Tracking" banner was. */}
          <div className={s.trackCard}>
            <span className={s.teaserIcon}>
              <Glyph name="radar" />
            </span>
            <h2 id="tracking-heading">{home.trackingTeaser.heading}</h2>
            <p>{home.trackingTeaser.blurb}</p>
            <ButtonRow>
              <ButtonLink to={home.trackingTeaser.cta.to}>{home.trackingTeaser.cta.label}</ButtonLink>
            </ButtonRow>
          </div>

          <div className={s.nipponCard}>
            {/* NX's own mark, white for the dark band. */}
            <img
              className={s.nxLogo}
              src={assetPath('nx-logo-white.png')}
              alt={t.nippon.logoAlt}
              width={1041}
              height={174}
              loading="lazy"
              decoding="async"
            />
            <h2>{home.nipponTeaser.heading}</h2>
            <p>{home.nipponTeaser.blurb}</p>
            <FigureRow>
              {t.nippon.figures.slice(0, 3).map((figure) => (
                <FigureStat key={figure.label} figure={figure} />
              ))}
            </FigureRow>
            <ButtonRow>
              <ButtonLink to={home.nipponTeaser.cta.to} variant="ghost">
                {home.nipponTeaser.cta.label}
              </ButtonLink>
              <ExternalLink href="http://www.nipponexpress.com">www.nipponexpress.com</ExternalLink>
            </ButtonRow>
          </div>
        </div>
      </Section>

    </>
  )
}
