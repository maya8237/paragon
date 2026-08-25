import { FreightPage } from './GlobalTrade'
import { useT } from '../i18n/useT'

export default function DropShipments() {
  const { t } = useT()
  return (
    <FreightPage
      data={t.globalTrade.dropShipments}
      photos={['drop-landing-craft', 'drop-beach']}
    />
  )
}
