import { CardLink, Grid, PageHeader, Prose, Section, SectionHead, SubNav } from '../components/ui'
import { useT } from '../i18n/useT'
import { usePageMeta } from '../i18n/usePageMeta'

/** Sub-nav shared by the landing page and all four freight-mode pages. */
export function GlobalTradeNav() {
  const { t } = useT()
  return (
    <SubNav
      label={t.globalTrade.intro.heading}
      items={[
        { label: t.globalTrade.intro.heading, to: '/global-trade' },
        ...t.globalTrade.modes.map((m) => ({ label: m.title, to: m.to })),
      ]}
    />
  )
}

export default function GlobalTrade() {
  const { t } = useT()
  const gt = t.globalTrade
  usePageMeta(gt.meta)

  return (
    <>
      <PageHeader title={gt.intro.heading} lede={gt.intro.paragraphs[0]}>
        <GlobalTradeNav />
      </PageHeader>

      <Section narrow>
        {gt.intro.paragraphs.slice(1).map((p) => (
          <p key={p} style={{ color: 'var(--slate)', marginBlockEnd: 'var(--space-s)' }}>
            {p}
          </p>
        ))}
      </Section>

      <Section tight labelledBy="modes-heading">
        <SectionHead heading={gt.philosophy.heading} id="modes-heading" />
        <Grid>
          {gt.modes.map((mode) => (
            <CardLink key={mode.to} to={mode.to} title={mode.title} body={mode.blurb} />
          ))}
        </Grid>
      </Section>

      <Section narrow tight>
        {gt.philosophy.paragraphs.map((p) => (
          <p key={p} style={{ color: 'var(--slate)', marginBlockEnd: 'var(--space-s)' }}>
            {p}
          </p>
        ))}
      </Section>

      <Section id="insurance" narrow inverted labelledBy="insurance-heading">
        <SectionHead heading={gt.insurance.heading} id="insurance-heading" />
        {gt.insurance.paragraphs.map((p) => (
          <p key={p} style={{ marginBlockEnd: 'var(--space-s)' }}>
            {p}
          </p>
        ))}
      </Section>
    </>
  )
}

/**
 * The four freight-mode pages are the same shape, so they share one component
 * and differ only in the content branch they are handed.
 */
export function FreightPage({
  data,
  extra,
}: {
  data: { meta: import('../content/types').PageMeta; body: import('../content/types').Prose }
  extra?: import('../content/types').Prose
}) {
  usePageMeta(data.meta)

  return (
    <>
      <PageHeader title={data.body.heading}>
        <GlobalTradeNav />
      </PageHeader>

      <Section narrow>
        {data.body.paragraphs.map((p) => (
          <p key={p} style={{ color: 'var(--slate)', marginBlockEnd: 'var(--space-s)' }}>
            {p}
          </p>
        ))}
      </Section>

      {extra ? (
        <Section narrow inverted labelledBy="extra-heading">
          <Prose data={extra} />
        </Section>
      ) : null}
    </>
  )
}
