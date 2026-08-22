import { PageHeader, Section, SectionHead, TickList } from '../components/ui'
import { ModeTag } from '../components/bits'
import { useT } from '../i18n/useT'
import { usePageMeta } from '../i18n/usePageMeta'

export default function Accessibility() {
  const { t } = useT()
  const a = t.accessibility
  usePageMeta(a.meta)

  return (
    <>
      <PageHeader
        tag={<ModeTag mode="NETWORK" />}
        title={a.commitment.heading}
        lede={a.commitment.paragraphs[0]}
      />

      <Section narrow>
        {a.commitment.paragraphs.slice(1).map((p) => (
          <p key={p} style={{ color: 'var(--slate)', marginBlockEnd: 'var(--space-s)' }}>
            {p}
          </p>
        ))}
      </Section>

      <Section narrow tight labelledBy="features-heading">
        <SectionHead heading={a.features.heading} id="features-heading" />
        <TickList items={a.features.items} />
      </Section>

      <Section narrow tight labelledBy="tips-heading">
        <SectionHead heading={a.browserTips.heading} lede={a.browserTips.blurb} id="tips-heading" />
        <TickList items={a.browserTips.items} />
      </Section>

      <Section narrow inverted labelledBy="feedback-heading">
        <SectionHead heading={a.feedback.heading} id="feedback-heading" />
        {a.feedback.paragraphs.map((p) => (
          <p key={p} style={{ marginBlockEnd: 'var(--space-s)' }}>
            {p}
          </p>
        ))}
      </Section>
    </>
  )
}
