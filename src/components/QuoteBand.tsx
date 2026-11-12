import s from './QuoteBand.module.css'
import { ButtonLink, Section, ui } from './ui'
import { ExternalLink } from './bits'
import { useT } from '../i18n/useT'

/**
 * The closing call to action, at the foot of every page: whatever a visitor
 * has just read, the next step is one click away.
 */
export function QuoteBand() {
  const { t } = useT()
  const { cta, hero } = t.home

  return (
    <Section labelledBy="cta-heading">
      <div className={`${s.ctaPanel} ${ui.inverted} inverted`}>
        <div>
          <h2 id="cta-heading">{cta.heading}</h2>
          <p>{cta.blurb}</p>
        </div>
        <div className={s.ctaActions}>
          <ExternalLink href={hero.quoteCta.href} className={`${ui.btn} ${ui.btnAccent}`}>
            {t.nav.quote}
          </ExternalLink>
          <ButtonLink to={hero.secondaryCta.to} variant="ghost">
            {hero.secondaryCta.label}
          </ButtonLink>
        </div>
      </div>
    </Section>
  )
}
