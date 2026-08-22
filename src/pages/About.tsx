import { Divider, Grid, PageHeader, Prose, Section, SectionHead } from '../components/ui'
import { CertList, ModeTag } from '../components/bits'
import { useT } from '../i18n/useT'
import { usePageMeta } from '../i18n/usePageMeta'

export default function About() {
  const { t } = useT()
  const about = t.about
  usePageMeta(about.meta)

  return (
    <>
      <PageHeader
        tag={<ModeTag mode="NETWORK" />}
        title={about.profile.heading}
        lede={about.profile.paragraphs[0]}
      />

      <Section narrow>
        {about.profile.paragraphs.slice(1).map((p) => (
          <p key={p} style={{ color: 'var(--slate)', marginBlockEnd: 'var(--space-s)' }}>
            {p}
          </p>
        ))}

        <Divider />

        <Grid wide>
          {about.sections.map((section) => (
            <Prose key={section.heading} data={section} as="h3" />
          ))}
        </Grid>
      </Section>

      <Section id="certifications" narrow labelledBy="certifications-heading">
        <SectionHead
          tag={<ModeTag mode="CUSTOMS" />}
          heading={about.certifications.heading}
          lede={about.certifications.blurb}
          id="certifications-heading"
        />
        <CertList items={about.certifications.items} />
      </Section>

      <Section id="environment" narrow inverted labelledBy="environment-heading">
        <SectionHead
          tag={<ModeTag mode="ROAD" />}
          heading={about.environment.heading}
          id="environment-heading"
        />
        {about.environment.paragraphs.map((p) => (
          <p key={p} style={{ marginBlockEnd: 'var(--space-s)' }}>
            {p}
          </p>
        ))}
      </Section>
    </>
  )
}
