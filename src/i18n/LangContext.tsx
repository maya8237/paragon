import { createContext, useEffect, useMemo, type ReactNode } from 'react'
import type { Lang, SiteContent } from '../content/types'
import en from '../content/en'
import he from '../content/he'

const dictionaries: Record<Lang, SiteContent> = { en, he }

export const LANGS: Lang[] = ['en', 'he']
export const DEFAULT_LANG: Lang = 'en'
const STORAGE_KEY = 'paragon.lang'

export function isLang(value: string | undefined): value is Lang {
  return value === 'en' || value === 'he'
}

/** The language to land on when the visitor hits `/` with no preference in the URL. */
export function preferredLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (isLang(stored ?? undefined)) return stored as Lang
  } catch {
    // Private windows and blocked site data both throw here; fall through.
  }
  const candidates = navigator.languages?.length
    ? navigator.languages
    : [navigator.language]
  for (const tag of candidates) {
    const primary = tag.toLowerCase().split('-')[0]
    if (primary === 'he' || primary === 'iw') return 'he'
    if (primary === 'en') return 'en'
  }
  return DEFAULT_LANG
}

export interface LangValue {
  lang: Lang
  dir: 'ltr' | 'rtl'
  t: SiteContent
  /** The other language, for the switch. */
  other: Lang
}

export const LangContext = createContext<LangValue | null>(null)

export function LangProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  const value = useMemo<LangValue>(
    () => ({
      lang,
      dir: lang === 'he' ? 'rtl' : 'ltr',
      t: dictionaries[lang],
      other: lang === 'en' ? 'he' : 'en',
    }),
    [lang],
  )

  useEffect(() => {
    const root = document.documentElement
    root.lang = value.lang
    root.dir = value.dir
    try {
      localStorage.setItem(STORAGE_KEY, value.lang)
    } catch {
      // Persistence is a convenience, never a requirement.
    }
  }, [value.lang, value.dir])

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}
