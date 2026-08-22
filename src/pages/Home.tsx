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
import { CertList, ExternalLink, FigureStat, ModeTag } from '../components/bits'
import { CorridorMap } from '../components/CorridorMap'
import { Reveal } from '../components/Reveal'
import { useT } from '../i18n/useT'
import { usePageMeta } from '../i18n/usePageMeta'

export default function Home() {
  const { t } = useT()
  const home = t.home
  usePageMeta(home.meta, { isHome: true })

  return (
    <>
      <section className={s.hero} aria-labelledby="hero-title">
        <Container>
          <div className={s.heroGrid}>
            <div className={s.heroCopy}>
              <ModeTag mode="NETWORK" label={home.hero.eyebrow} />
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

            <CorridorMap />
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
              tag={<ModeTag mode={pillar.mode} />}
            />
          ))}
        </Grid>
      </Section>

      <Section tight labelledBy="certs-heading">
        <div className={s.certBand}>
          <Reveal className={s.reveal} revealedClassName={s.revealed}>
            <SectionHead
              tag={<ModeTag mode="CUSTOMS" />}
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
            <ModeTag mode="NETWORK" />
            <h2 id="tracking-heading">{home.trackingTeaser.heading}</h2>
            <p>{home.trackingTeaser.blurb}</p>
            <ButtonRow>
              <ButtonLink to={home.trackingTeaser.cta.to}>
                {home.trackingTeaser.cta.label}
              </ButtonLink>
            </ButtonRow>
          </div>

          <div className={s.teaser}>
            <ModeTag mode="OCEAN" />
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
