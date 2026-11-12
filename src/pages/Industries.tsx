import { CardLink, Card, Grid, PageHeader, Section, SectionHead } from '../components/ui'
import { Banner } from '../components/Banner'
import { useT } from '../i18n/useT'
import { usePageMeta } from '../i18n/usePageMeta'

const SECTOR_PHOTO: Record<string, string> = {
  semiconductor: 'industry-semiconductor',
  technology: 'industry-technology',
  mobility: 'industry-mobility',
  'fashion-lifestyle': 'industry-fashion',
  healthcare: 'industry-healthcare',
}

export default function Industries() {
  const { t } = useT()
  const ind = t.industries
  usePageMeta(ind.meta)

  return (
    <>
      <PageHeader title={ind.intro.heading} lede={ind.intro.paragraphs[0]} />

      <Section tight>
        <Banner name="industries-hero" alt={ind.heroAlt} />
      </Section>

      <Section narrow tight>
        {ind.intro.paragraphs.slice(1).map((p) => (
          <p key={p} style={{ color: 'var(--slate)', marginBlockEnd: 'var(--space-s)' }}>
            {p}
          </p>
        ))}
      </Section>

      {/* The overview doubles as the way in: each card jumps to its sector below. */}
      <Section tight labelledBy="industries-overview-heading">
        <SectionHead heading={ind.intro.heading} id="industries-overview-heading" />
        <Grid>
          {ind.items.map((item) => (
            <CardLink
              key={item.id}
              to={`/industries#${item.id}`}
              title={item.title}
              body={item.blurb}
              icon={false}
            />
          ))}
        </Grid>
      </Section>

      {ind.items.map((item, i) => (
        <Section key={item.id} id={item.id} tight labelledBy={`${item.id}-heading`}>
          <SectionHead
            eyebrow={String(i + 1).padStart(2, '0')}
            heading={item.title}
            lede={item.lead}
            id={`${item.id}-heading`}
          />
          {SECTOR_PHOTO[item.id] && (
            <div style={{ marginBlockEnd: 'var(--space-l)' }}>
              <Banner name={SECTOR_PHOTO[item.id]} alt={item.photoAlt} />
            </div>
          )}
          <Grid>
            {item.points.map((point) => (
              <Card key={point.title}>
                <h3>{point.title}</h3>
                <p style={{ color: 'var(--slate)', maxInlineSize: 'none' }}>{point.body}</p>
              </Card>
            ))}
          </Grid>
        </Section>
      ))}

      <Section inverted narrow labelledBy="industries-nx-heading">
        <SectionHead heading={ind.nx.heading} id="industries-nx-heading" />
        {ind.nx.paragraphs.map((p) => (
          <p key={p} style={{ marginBlockEnd: 'var(--space-s)' }}>
            {p}
          </p>
        ))}
      </Section>
    </>
  )
}
