import { FreightPage } from './GlobalTrade'
import { useT } from '../i18n/useT'

export default function Charter() {
  const { t } = useT()
  // One photograph per mode the charter service covers — air, road, sea.
  return (
    <FreightPage
      data={t.globalTrade.charter}
      photos={['charter-air', 'charter-road', 'charter-ocean']}
    />
  )
}
