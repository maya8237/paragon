import { Divider, FigureRow, PageHeader, Prose, Section, SectionHead, ui } from '../components/ui'
import { ExternalLink, FigureStat, ModeTag } from '../components/bits'
import { useT } from '../i18n/useT'
import { usePageMeta } from '../i18n/usePageMeta'

export default function Nippon() {
  const { t } = useT()
  const n = t.nippon
  usePageMeta(n.meta)

  return (
    <>
      <PageHeader tag={<ModeTag mode="OCEAN" />} title={n.body.heading} lede={n.body.paragraphs[0]} />

      <Section narrow>
        {n.body.paragraphs.slice(1).map((p) => (
          <p key={p} style={{ color: 'var(--slate)', marginBlockEnd: 'var(--space-s)' }}>
            {p}
          </p>
        ))}
      </Section>

      <Section inverted labelledBy="nippon-figures-heading">
        <SectionHead heading={n.history.heading} id="nippon-figures-heading" />
        <FigureRow>
          {n.figures.map((figure) => (
            <FigureStat key={figure.label} figure={figure} />
          ))}
        </FigureRow>

        <Divider />

        {n.history.paragraphs.map((p) => (
          <p key={p} style={{ marginBlockEnd: 'var(--space-s)' }}>
            {p}
          </p>
        ))}
      </Section>

      <Section narrow>
        <Prose data={n.warehousing} />

        <div className={ui.btnRow}>
          {n.links.map((link) => (
            <ExternalLink key={link.href} href={link.href} className={`${ui.btn} ${ui.btnGhost}`}>
              {link.label}
            </ExternalLink>
          ))}
        </div>
      </Section>
    </>
  )
}
