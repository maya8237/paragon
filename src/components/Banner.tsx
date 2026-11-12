import s from './Banner.module.css'
import { assetPath } from '../lib/assetPath'

/**
 * A wide photograph for the new AI-generated images, which are 1200×800 and,
 * unlike the old tiny stock photos, can fill the container. Cropped to a
 * cinematic frame on desktop and shown in full (3:2) on phones.
 */
export function Banner({
  name,
  alt,
  caption,
}: {
  /** File under public/photos/, without the extension. */
  name: string
  alt: string
  caption?: string
}) {
  const img = (
    <img
      className={s.img}
      src={assetPath(`photos/${name}.webp`)}
      alt={alt}
      width={1200}
      height={800}
      loading="lazy"
      decoding="async"
    />
  )
  if (!caption) return <div className={s.frame}>{img}</div>
  return (
    <figure className={s.frame}>
      {img}
      <figcaption className={s.caption}>{caption}</figcaption>
    </figure>
  )
}
