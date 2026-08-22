import { useEffect } from 'react'
import { useT } from './useT'
import type { PageMeta } from '../content/types'

/**
 * Sets the document title and meta description for a route.
 *
 * Each page calls this with its own `meta` block from the content tree, so the
 * title is translated for free and a missing one would be a compile error.
 */
export function usePageMeta(meta: PageMeta, { isHome = false }: { isHome?: boolean } = {}) {
  const { t } = useT()
  const company = t.meta.companyName

  useEffect(() => {
    document.title = isHome ? `${meta.title} · ${t.meta.tagline}` : `${meta.title} · ${company}`

    let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!tag) {
      tag = document.createElement('meta')
      tag.name = 'description'
      document.head.appendChild(tag)
    }
    tag.content = meta.description
  }, [meta.title, meta.description, company, isHome, t.meta.tagline])
}
