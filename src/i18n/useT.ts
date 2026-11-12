import { useContext } from 'react'
import { LangContext, type LangValue } from './LangContext'

/**
 * Typed content accessor. `useT().t` is the full `SiteContent` tree for the
 * active language, so every string a component renders is checked against the
 * same interface in both languages.
 */
export function useT(): LangValue {
  const value = useContext(LangContext)
  if (!value) throw new Error('useT must be used inside <LangProvider>')
  return value
}

/**
 * Prefix a route with the active language: `path('/about')` → `/he/about/`.
 *
 * The trailing slash is the address a static host actually serves (each page
 * is a folder with an index.html), so links never cost a redirect.
 */
export function useLangPath(): (path: string) => string {
  const { lang } = useT()
  return (path: string) => {
    const [route = '', hash] = path.split('#')
    const full = `/${lang}${route === '/' ? '' : route}/`
    return hash ? `${full}#${hash}` : full
  }
}
