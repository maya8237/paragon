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

  // The freight-mode photographs, cut out of the strips the old site served
  // them in. Each was one frame of a two- or three-up collage with the gaps and
  // rounded corners baked into the image; separating them is what lets a page
  // size a photograph to its own needs.
  'ocean-berth': { file: 'photos/ocean-berth.jpg', width: 425, height: 316 },
  'ocean-terminal': { file: 'photos/ocean-terminal.jpg', width: 481, height: 316 },
  'ocean-craning': { file: 'photos/ocean-craning.jpg', width: 431, height: 319 },
  'air-freighter': { file: 'photos/air-freighter.jpg', width: 319, height: 342 },
  'air-loading': { file: 'photos/air-loading.jpg', width: 638, height: 347 },
  'air-departure': { file: 'photos/air-departure.jpg', width: 564, height: 351 },
  'drop-landing-craft': { file: 'photos/drop-landing-craft.jpg', width: 306, height: 224 },
  'drop-beach': { file: 'photos/drop-beach.jpg', width: 346, height: 223 },
  'charter-air': { file: 'photos/charter-air.jpg', width: 986, height: 519 },
  'charter-road': { file: 'photos/charter-road.jpg', width: 349, height: 268 },
  'charter-ocean': { file: 'photos/charter-ocean.jpg', width: 359, height: 255 },

  // The logistics centre, photographed on site. These are the smallest
  // photographs on the site, so they are only ever placed in a row where each
  // one renders a few hundred pixels wide at most.
  'centre-forklift': { file: 'photos/centre-forklift.jpg', width: 246, height: 156 },
  'centre-racking': { file: 'photos/centre-racking.jpg', width: 207, height: 156 },

  'projects-barge': { file: 'photos/projects-barge.jpg', width: 584, height: 405 },
  'projects-quay': { file: 'photos/projects-quay.jpg', width: 596, height: 443 },
} as const

export type PhotoName = keyof typeof PHOTOS

/**
 * A company photograph, mounted.
 *
 * Photographs are always shown in their original colours — the livery, the
 * high-vis jackets and the sea are the content, and draining them to grey
 * throws that away.
 */
export function Plate({
  name,
  alt,
  caption,
  size = 'tile',
  flush = false,
}: {
  name: PhotoName
  alt: string
  /** Omitted where the plate sits under a heading that already names it. */
  caption?: string
  size?: 'tile' | 'anchor'
  /**
   * Drop the mount's own edge, for a container that already draws one — a card
   * supplies both the border and the corner, and two hairlines 1px apart read
   * as a mistake.
   */
  flush?: boolean
}) {
  const asset = PHOTOS[name]

  const mount = (
    <div className={[s.mount, s[size], flush ? s.flush : ''].filter(Boolean).join(' ')}>
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

/**
 * Several photographs shown side by side, as one band.
 *
 * The row equalises heights rather than widths: each photograph grows in
 * proportion to its own aspect ratio, so a portrait frame takes less of the
 * width than a landscape one and every top and bottom edge still lines up.
 * That matters here because these frames came out of collages at whatever
 * shape the original designer cropped them to, and no two match.
 */
export function PlateRow({ photos }: { photos: { name: PhotoName; alt: string }[] }) {
  /*
   * On a phone a row normally stacks, each photograph filling the column. That
   * only works when the photograph has the pixels to fill it: below roughly
   * 290px it would be enlarged past what it can carry, and — because the larger
   * photographs on the same page do fill the column — the result is a stack of
   * mismatched widths. Such a row stays a row instead, shrunk but level.
   */
  const compact = photos.some(({ name }) => PHOTOS[name].width < 290)

  return (
    <div className={[s.row, compact ? s.compact : ''].filter(Boolean).join(' ')}>
      {photos.map(({ name, alt }) => {
        const asset = PHOTOS[name]
        const ratio = asset.width / asset.height
        return (
          <img
            key={name}
            className={s.rowImg}
            style={{
              flexGrow: ratio,
              flexBasis: `${ratio * 120}px`,
              // Never enlarge past the pixels the photograph actually has. The
              // centre frames are only ~240px wide, and stretched to the full
              // measure they turn to mush; capped, the row simply ends early.
              maxInlineSize: `${asset.width}px`,
            }}
            src={assetPath(asset.file)}
            alt={alt}
            width={asset.width}
            height={asset.height}
            loading="lazy"
            decoding="async"
          />
        )
      })}
    </div>
  )
}
