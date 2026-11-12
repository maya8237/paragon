import { useCallback, useState } from 'react'

export type Theme = 'light' | 'dark'

const KEY = 'paragon-theme'

/**
 * The theme lives on `<html data-theme>`. index.html sets it before first
 * paint (saved choice, else the system preference) so there is no flash of
 * the wrong theme; this hook reads it back and flips it.
 */
export function currentTheme(): Theme {
  // Pages are also rendered at build time, where there is no document.
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

export function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(currentTheme)

  const toggle = useCallback(() => {
    const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem(KEY, next)
    } catch {
      // Storage blocked (private mode): the switch still works for this visit.
    }
    setTheme(next)
  }, [])

  return [theme, toggle]
}
