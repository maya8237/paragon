import { createContext, useEffect, useMemo, type ReactNode } from 'react'
import type { Lang, SiteContent } from '../content/types'
import en from '../content/en'
import he from '../content/he'
import ja from '../content/ja'

const dictionaries: Record<Lang, SiteContent> = { en, he, ja }

export const LANGS: Lang[] = ['en', 'he', 'ja']

/** The short label each language wears on the switch. */
export const LANG_LABEL: Record<Lang, string> = { en: 'EN', he: 'עב', ja: '日本語' }
export const DEFAULT_LANG: Lang = 'en'
const STORAGE_KEY = 'paragon.lang'

export function isLang(value: string | undefined): value is Lang {
  return value === 'en' || value === 'he' || value === 'ja'
}

/**
 * The language to land on when the visitor hits `/` with no language in the
 * URL: English, unless they have already chosen another with the switch. The
 * browser's own language is deliberately not consulted.
 */
export function preferredLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (isLang(stored ?? undefined)) return stored as Lang
  } catch {
    // Private windows and blocked site data both throw here; fall through.
  }
  return DEFAULT_LANG
}

export interface LangValue {
  lang: Lang
  dir: 'ltr' | 'rtl'
  t: SiteContent
  /** The other languages, for the switch. */
  others: Lang[]
}

export const LangContext = createContext<LangValue | null>(null)

export function LangProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  const value = useMemo<LangValue>(
    () => ({
      lang,
      dir: lang === 'he' ? 'rtl' : 'ltr',
      t: dictionaries[lang],
      others: LANGS.filter((l) => l !== lang),
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
