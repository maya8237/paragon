import { FreightPage } from './GlobalTrade'
import { useT } from '../i18n/useT'

export default function Ocean() {
  const { t } = useT()
  return (
    <FreightPage
      data={t.globalTrade.ocean}
      photos={['ocean-berth', 'ocean-terminal', 'ocean-craning']}
    />
  )
}
