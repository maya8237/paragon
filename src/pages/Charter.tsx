import { FreightPage } from './GlobalTrade'
import { useT } from '../i18n/useT'

export default function Charter() {
  const { t } = useT()
  return <FreightPage data={t.globalTrade.charter} mode="AIR" />
}
