import { ButtonLink, ButtonRow, PageHeader, Section } from '../components/ui'
import { useT } from '../i18n/useT'
import { usePageMeta } from '../i18n/usePageMeta'

export default function NotFound() {
  const { t } = useT()
  const nf = t.notFound
  usePageMeta(nf.meta)

  return (
    <>
      <PageHeader title={nf.meta.title} lede={nf.body} />
      <Section narrow>
        <ButtonRow>
          <ButtonLink to={nf.cta.to}>{nf.cta.label}</ButtonLink>
        </ButtonRow>
      </Section>
    </>
  )
}
