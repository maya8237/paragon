import {
  ChipList,
  Divider,
  FigureRow,
  PageHeader,
  Prose,
  Section,
  SectionHead,
  StepList,
} from '../components/ui'
import { FigureStat } from '../components/bits'
import { useT } from '../i18n/useT'
import { usePageMeta } from '../i18n/usePageMeta'

export default function Logistics() {
  const { t } = useT()
  const l = t.logistics
  usePageMeta(l.meta)

  return (
    <>
      <PageHeader title={l.intro.heading} lede={l.intro.paragraphs[0]} />

      <Section narrow labelledBy="center-heading">
        <SectionHead heading={l.center.heading} id="center-heading" />
        {l.center.paragraphs.map((p) => (
          <p key={p} style={{ color: 'var(--slate)', marginBlockEnd: 'var(--space-s)' }}>
            {p}
          </p>
        ))}

        <FigureRow>
          {t.home.figures.slice(0, 2).map((figure) => (
            <FigureStat key={figure.label} figure={figure} />
          ))}
        </FigureRow>
      </Section>

      <Section tight labelledBy="services-heading">
        <SectionHead
          heading={l.services.heading}
          lede={l.services.blurb}
          id="services-heading"
        />
        <ChipList items={l.services.items} />

        <Divider />

        <Prose data={l.closing} as="h3" />
      </Section>

      <Section id="exhibitions" narrow inverted labelledBy="exhibitions-heading">
        <SectionHead
          heading={l.exhibitions.heading}
          lede={l.exhibitions.paragraphs[0]}
          id="exhibitions-heading"
        />
        {l.exhibitions.paragraphs.slice(1).map((p) => (
          <p key={p} style={{ marginBlockEnd: 'var(--space-s)' }}>
            {p}
          </p>
        ))}

        <Divider />

        <h3 style={{ marginBlockEnd: 'var(--space-m)' }}>{l.exhibitionsProcess.heading}</h3>
        <StepList items={l.exhibitionsProcess.items} />

        <p style={{ marginBlockStart: 'var(--space-l)' }}>{l.exhibitionsClosing}</p>
      </Section>
    </>
  )
}
