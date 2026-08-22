import { Grid, PageHeader, Section, SectionHead, ui } from '../components/ui'
import { ExternalLink, LocationCard, ModeTag } from '../components/bits'
import { CorridorMap } from '../components/CorridorMap'
import { useT } from '../i18n/useT'
import { usePageMeta } from '../i18n/usePageMeta'

export default function Contact() {
  const { t } = useT()
  const c = t.contact
  usePageMeta(c.meta)

  return (
    <>
      <PageHeader tag={<ModeTag mode="NETWORK" />} title={c.meta.title} lede={c.intro} />

      {/* The same five nodes the hero draws — this page is where their data lives. */}
      <Section tight>
        <CorridorMap />
      </Section>

      <Section tight labelledBy="locations-heading">
        <SectionHead heading={c.intro} id="locations-heading" />
        <Grid wide>
          {c.locations.map((location) => (
            <LocationCard key={location.id} location={location} />
          ))}
        </Grid>
      </Section>

      <Section narrow inverted labelledBy="form-heading">
        <SectionHead heading={c.form.heading} lede={c.form.blurb} id="form-heading" />
        <div className={ui.btnRow}>
          <ExternalLink href={c.form.cta.href} className={`${ui.btn} ${ui.btnPrimary}`}>
            {c.form.cta.label}
          </ExternalLink>
        </div>
      </Section>
    </>
  )
}
