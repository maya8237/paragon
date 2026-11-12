import { assetPath } from '../lib/assetPath'
import type { SiteContent } from '../content/types'
import { ExternalLink } from './bits'
import s from './CargoPartner.module.css'

/**
 * The second partner, deliberately quieter than NX: a slim band with
 * cargo-partner's own white mark (public/cargo-partner-logo.svg, from
 * cargo-partner.com), meant for the dark sections.
 */
export function CargoPartner({ data }: { data: SiteContent['home']['cargoPartner'] }) {
  return (
    <div className={s.band} role="group" aria-label={data.heading}>
      <img
        className={s.logo}
        src={assetPath('cargo-partner-logo.svg')}
        alt={data.logoAlt}
        width={120}
        height={92}
        loading="lazy"
        decoding="async"
      />
      <div className={s.copy}>
        <h3>{data.heading}</h3>
        <p>{data.blurb}</p>
        <ExternalLink href={data.cta.href}>{data.cta.label}</ExternalLink>
      </div>
    </div>
  )
}
