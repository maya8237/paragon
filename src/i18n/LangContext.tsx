import { createContext, useEffect, useMemo, type ReactNode } from 'react'
import type { Lang, SiteContent } from '../content/types'
import en from '../content/en'
import he from '../content/he'
import ja from '../content/ja'

const dictionaries: Record<Lang, SiteContent> = { en, he, ja }

export const LANGS: Lang[] = ['en', 'he', 'ja']

/** The short label each language wears on the switch. */
export const LANG_LABEL: Record<Lang, string> = { en: 'EN', he: 'עב', ja: '日本語' }
/** Each language's own name, for the language menu. */
export const LANG_NAME: Record<Lang, string> = { en: 'English', he: 'עברית', ja: '日本語' }

/** The suggestion line is written in the language it offers. */
export const LANG_HINT: Record<Lang, { text: string; cta: string }> = {
  en: { text: 'Also available in English', cta: 'Switch' },
  he: { text: 'זמין גם בעברית', cta: 'לעברית' },
  ja: { text: '日本語でもご覧いただけます', cta: '切り替え' },
}

export const DEFAULT_LANG: Lang = 'en'
const STORAGE_KEY = 'paragon.lang'

export function isLang(value: string | undefined): value is Lang {
  return value === 'en' || value === 'he' || value === 'ja'
}

/**
 * The language to land on when the visitor hits `/` with no language in the
 * URL: one they chose before with the switch, else the first of the browser's
 * preferred languages that the site has, else English.
 */
export function preferredLang(): Lang {
  return storedLang() ?? browserLang()
}

/** A language the visitor picked on purpose, if any. */
export function storedLang(): Lang | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (isLang(stored ?? undefined)) return stored as Lang
  } catch {
    // Private windows and blocked site data both throw here; fall through.
  }
  return null
}

/** Remember a deliberate choice (menu or suggestion), and stop suggesting. */
export function rememberLang(lang: Lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang)
  } catch {
    // Persistence is a convenience, never a requirement.
  }
}

/** The first of the browser's languages the site has, else English. */
export function browserLang(): Lang {
  // Also called while pages are rendered at build time, where there is no
  // browser language to read.
  if (typeof navigator === 'undefined') return DEFAULT_LANG
  const candidates = navigator.languages?.length ? navigator.languages : [navigator.language]
  for (const tag of candidates) {
    const primary = tag?.toLowerCase().split('-')[0]
    if (primary === 'iw') return 'he' // the old code for Hebrew
    if (isLang(primary)) return primary
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
  }, [value.lang, value.dir])

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}
