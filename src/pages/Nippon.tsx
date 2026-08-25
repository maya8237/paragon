import {
  Card,
  Divider,
  FigureRow,
  Grid,
  PageHeader,
  Prose,
  Section,
  SectionHead,
  ui,
} from '../components/ui'
import { ExternalLink, FigureStat } from '../components/bits'
import { Plate } from '../components/Plate'
import { useT } from '../i18n/useT'
import { usePageMeta } from '../i18n/usePageMeta'

export default function Nippon() {
  const { t } = useT()
  const n = t.nippon
  usePageMeta(n.meta)

  return (
    <>
      <PageHeader title={n.body.heading} lede={n.body.paragraphs[0]} />

      {/*
        The one photograph with the resolution to carry a page — the livery is
        the subject, not texture.
      */}
      <Section narrow>
        <Plate name="nippon-cargo" alt={n.photo.alt} caption={n.photo.caption} size="anchor" />

        {n.body.paragraphs.slice(1).map((p) => (
          <p
            key={p}
            style={{
              color: 'var(--slate)',
              marginBlockEnd: 'var(--space-s)',
              marginBlockStart: 'var(--space-l)',
            }}
          >
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

      <Section labelledBy="nippon-services-heading">
        <SectionHead heading={n.services.heading} id="nippon-services-heading" />
        <Grid>
          {n.services.items.map((item) => (
            <Card key={item.title}>
              <h3>{item.title}</h3>
              <p style={{ color: 'var(--slate)', maxInlineSize: 'none' }}>{item.body}</p>
            </Card>
          ))}
        </Grid>
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
