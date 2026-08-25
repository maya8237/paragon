import { FreightPage } from './GlobalTrade'
import { useT } from '../i18n/useT'

export default function Air() {
  const { t } = useT()
  // Time Critical Shipments rides in the dark band under the main copy.
  return (
    <FreightPage
      data={t.globalTrade.air}
      photos={['air-freighter', 'air-loading', 'air-departure']}
      extra={t.globalTrade.air.timeCritical}
    />
  )
}
