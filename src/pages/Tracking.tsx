import { PageHeader, Section, SectionHead, TickList, ui } from '../components/ui'
import { ExternalLink } from '../components/bits'
import { useT } from '../i18n/useT'
import { usePageMeta } from '../i18n/usePageMeta'

export default function Tracking() {
  const { t } = useT()
  const tr = t.tracking
  usePageMeta(tr.meta)

  return (
    <>
      <PageHeader title={tr.body.heading} lede={tr.body.paragraphs[0]} />

      <Section narrow>
        {tr.body.paragraphs.slice(1).map((p) => (
          <p key={p} style={{ color: 'var(--slate)', marginBlockEnd: 'var(--space-s)' }}>
            {p}
          </p>
        ))}
      </Section>

      <Section narrow inverted labelledBy="params-heading">
        <SectionHead heading={tr.parameters.heading} id="params-heading" />
        <TickList items={tr.parameters.items} />

        <div className={ui.btnRow}>
          <ExternalLink href={tr.cta.href} className={`${ui.btn} ${ui.btnPrimary}`}>
            {tr.cta.label}
          </ExternalLink>
        </div>

        {/*
          The tracking system is a third-party, plain-HTTP host. It is linked,
          never embedded, and the note says so plainly rather than hiding it.
        */}
        <p style={{ marginBlockStart: 'var(--space-m)', fontSize: 'var(--step--1)' }}>
          {tr.ctaNote}
        </p>
      </Section>
    </>
  )
}
