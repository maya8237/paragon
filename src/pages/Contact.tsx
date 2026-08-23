import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Grid, PageHeader, Section, SectionHead, ui } from '../components/ui'
import { ExternalLink, LocationCard } from '../components/bits'
import { CorridorMap } from '../components/CorridorMap'
import { useT } from '../i18n/useT'
import { usePageMeta } from '../i18n/usePageMeta'
import type { Location } from '../content/types'

export default function Contact() {
  const [flashedLocation, setFlashedLocation] = useState<Location['id'] | null>(null)
  const { hash } = useLocation()
  const { t } = useT()
  const c = t.contact
  usePageMeta(c.meta)

  useEffect(() => {
    const id = hash.slice(1)
    const isLocationId = c.locations.some((location) => location.id === id)
    setFlashedLocation(isLocationId ? (id as Location['id']) : null)
  }, [c.locations, hash])

  useEffect(() => {
    if (!flashedLocation) return
    const timeout = window.setTimeout(() => setFlashedLocation(null), 1000)
    return () => window.clearTimeout(timeout)
  }, [flashedLocation])

  function flashLocation(id: Location['id']) {
    setFlashedLocation(null)
    window.requestAnimationFrame(() => setFlashedLocation(id))
  }

  return (
    <>
      <PageHeader title={c.meta.title} lede={c.intro} />

      {/* The same five nodes the hero draws — this page is where their data lives. */}
      <Section tight>
        <CorridorMap linked onNodeClick={flashLocation} />
      </Section>

      <Section tight labelledBy="locations-heading">
        <SectionHead heading={c.intro} id="locations-heading" />
        <Grid wide>
          {c.locations.map((location) => (
            <LocationCard
              key={location.id}
              location={location}
              flash={flashedLocation === location.id}
            />
          ))}
        </Grid>
      </Section>

      <Section narrow inverted labelledBy="form-heading">
        <SectionHead heading={c.form.heading} lede={c.form.blurb} id="form-heading" />
        <div className={ui.btnRow}>
          <ExternalLink href={c.form.cta.href} className={`${ui.btn} ${ui.btnPrimary}`}>
            {c.form.cta.label}
          </ExternalLink>
        </div>
      </Section>
    </>
  )
}
