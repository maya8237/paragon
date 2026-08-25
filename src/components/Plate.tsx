import s from './Plate.module.css'
import { assetPath } from '../lib/assetPath'

/**
 * The photographs that survived the old site, with their true pixel sizes.
 *
 * Filenames are assets rather than copy, so they are mapped here instead of in
 * the content tree. The dimensions are the real ones: they are handed to the
 * browser so the plate reserves its space before the image loads, and they are
 * the reason the stylesheet refuses to stretch a tile to card width.
 */
const PHOTOS = {
  'nippon-cargo': { file: 'photos/nippon-cargo.jpg', width: 500, height: 333 },
  scm: { file: 'photos/scm.jpg', width: 184, height: 115 },
  'global-trade': { file: 'photos/global-trade.jpg', width: 184, height: 115 },
  logistics: { file: 'photos/logistics.jpg', width: 184, height: 115 },
} as const

export type PhotoName = keyof typeof PHOTOS

/**
 * A photograph from the old site, mounted.
 *
 * `tone` is a judgement per photograph, not a global effect: the three 184px
 * service tiles are duotoned because that is what makes four mismatched stock
 * images read as one set, and the Nippon freighter is left in colour because it
 * is the one real, specific photograph in the set and its livery is content.
 */
export function Plate({
  name,
  alt,
  caption,
  size = 'tile',
  tone = 'duotone',
  flush = false,
}: {
  name: PhotoName
  alt: string
  /** Omitted where the plate sits under a heading that already names it. */
  caption?: string
  size?: 'tile' | 'anchor'
  tone?: 'duotone' | 'colour'
  /**
   * Drop the mount's own edge, for a container that already draws one — a card
   * supplies both the border and the corner, and two hairlines 1px apart read
   * as a mistake.
   */
  flush?: boolean
}) {
  const asset = PHOTOS[name]

  const mount = (
    <div
      className={[s.mount, s[size], tone === 'duotone' ? s.duotone : '', flush ? s.flush : '']
        .filter(Boolean)
        .join(' ')}
    >
      {/*
        Not lazy-loaded on purpose: every plate sits at or near the first
        screen, the whole set is 228 KB across four files, and the width and
        height below already reserve the space. Deferring them would only buy a
        pop-in.
      */}
      <img
        className={s.img}
        src={assetPath(asset.file)}
        alt={alt}
        width={asset.width}
        height={asset.height}
        decoding="async"
      />
    </div>
  )

  // A <figure> is only correct when there is a caption to associate with it.
  if (!caption) return mount

  return (
    <figure className={s.plate}>
      {mount}
      <figcaption className={s.caption}>{caption}</figcaption>
    </figure>
  )
}
