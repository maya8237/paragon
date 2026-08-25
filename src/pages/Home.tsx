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
import { Reveal } from '../components/Reveal'
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

export default function Home() {
  const { t } = useT()
  const langPath = useLangPath()
  const home = t.home
  usePageMeta(home.meta, { isHome: true })

  return (
    <>
      <section className={s.hero} aria-labelledby="hero-title">
        <Container>
          <div className={s.heroGrid}>
            <div className={s.heroCopy}>
              <h1 id="hero-title" className={s.heroTitle}>
                {home.hero.heading}
              </h1>
              {home.hero.lede.map((p) => (
                <p key={p} className={s.heroLede}>
                  {p}
                </p>
              ))}
              <ButtonRow>
                <ButtonLink to={home.hero.primaryCta.to}>{home.hero.primaryCta.label}</ButtonLink>
                <ButtonLink to={home.hero.secondaryCta.to} variant="ghost">
                  {home.hero.secondaryCta.label}
                </ButtonLink>
                <ExternalLink
                  href={home.hero.quoteCta.href}
                  className={`${ui.btn} ${ui.btnGhost}`}
                >
                  {home.hero.quoteCta.label}
                </ExternalLink>
              </ButtonRow>
            </div>

            <CorridorMap
              linked
              hrefForNode={(id) => ({ pathname: langPath('/contact'), hash: `#${id}` })}
            />
          </div>

          <FigureRow>
            {home.figures.map((figure) => (
              <FigureStat key={figure.label} figure={figure} />
            ))}
          </FigureRow>
        </Container>
      </section>

      <Section labelledBy="pillars-heading">
        <Reveal className={s.reveal} revealedClassName={s.revealed}>
          <SectionHead heading={t.meta.tagline} id="pillars-heading" />
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

      {/* The page's single value inversion: tracking and the Nippon partnership. */}
      <Section inverted labelledBy="tracking-heading">
        <div className={s.teaserGrid}>
          <div className={s.teaser}>
            <h2 id="tracking-heading">{home.trackingTeaser.heading}</h2>
            <p>{home.trackingTeaser.blurb}</p>
            <ButtonRow>
              <ButtonLink to={home.trackingTeaser.cta.to}>
                {home.trackingTeaser.cta.label}
              </ButtonLink>
            </ButtonRow>
          </div>

          <div className={s.teaser}>
            <h2>{home.nipponTeaser.heading}</h2>
            <p>{home.nipponTeaser.blurb}</p>
            <FigureRow>
              {t.nippon.figures.slice(0, 3).map((figure) => (
                <FigureStat key={figure.label} figure={figure} />
              ))}
            </FigureRow>
            <ButtonRow>
              <ButtonLink to={home.nipponTeaser.cta.to}>{home.nipponTeaser.cta.label}</ButtonLink>
              <ExternalLink href="http://www.nipponexpress.com">www.nipponexpress.com</ExternalLink>
            </ButtonRow>
          </div>
        </div>
      </Section>
    </>
  )
}
