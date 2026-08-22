import {
  Card,
  Divider,
  Grid,
  PageHeader,
  Section,
  SectionHead,
  StepList,
  TickList,
} from '../components/ui'
import { ModeTag } from '../components/bits'
import { useT } from '../i18n/useT'
import { usePageMeta } from '../i18n/usePageMeta'

export default function Scm() {
  const { t } = useT()
  const scm = t.scm
  usePageMeta(scm.meta)

  return (
    <>
      <PageHeader
        tag={<ModeTag mode="CUSTOMS" />}
        title={scm.intro.heading}
        lede={scm.intro.paragraphs[0]}
      />

      <Section labelledBy="sync-heading">
        <SectionHead heading={scm.synchronizing.heading} id="sync-heading" />
        <Grid>
          {scm.synchronizing.items.map((item) => (
            <Card key={item.title}>
              <h3>{item.title}</h3>
              <p style={{ color: 'var(--slate)', maxInlineSize: 'none' }}>{item.body}</p>
            </Card>
          ))}
        </Grid>
      </Section>

      <Section id="on-site" narrow tight labelledBy="onsite-heading">
        <SectionHead
          tag={<ModeTag mode="WAREHOUSE" />}
          heading={scm.onSite.heading}
          id="onsite-heading"
        />
        {scm.onSite.paragraphs.map((p) => (
          <p key={p} style={{ color: 'var(--slate)', marginBlockEnd: 'var(--space-s)' }}>
            {p}
          </p>
        ))}

        <Divider />

        <h3 style={{ marginBlockEnd: 'var(--space-m)' }}>{scm.whyOnSite.heading}</h3>
        <TickList items={scm.whyOnSite.items} />
      </Section>

      <Section id="consulting" narrow labelledBy="consulting-heading">
        <SectionHead
          tag={<ModeTag mode="NETWORK" />}
          heading={scm.consulting.heading}
          id="consulting-heading"
        />
        {scm.consulting.paragraphs.map((p) => (
          <p key={p} style={{ color: 'var(--slate)', marginBlockEnd: 'var(--space-s)' }}>
            {p}
          </p>
        ))}

        <Divider />

        <h3 style={{ marginBlockEnd: 'var(--space-m)' }}>{scm.framework.heading}</h3>
        <StepList items={scm.framework.items} />
      </Section>
    </>
  )
}
