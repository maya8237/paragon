import { FreightPage } from './GlobalTrade'
import { useT } from '../i18n/useT'

export default function Charter() {
  const { t } = useT()
  // The same three photographs the old site carried — charter covers every
  // mode, so the set is air, road and sea.
  return (
    <FreightPage
      data={t.globalTrade.charter}
      photos={['charter-air', 'charter-road', 'charter-ocean']}
    />
  )
}
