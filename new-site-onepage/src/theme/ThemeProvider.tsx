import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { LS } from './constants'

type Theme = 'dark' | 'light'
type Ctx = {
  theme: Theme; palette: string; font: string
  toggleTheme: () => void
  setPalette: (p: string) => void
  setFont: (f: string) => void
}

const ThemeCtx = createContext<Ctx | null>(null)

const read = (k: string, fallback = '') => {
  try { return localStorage.getItem(k) ?? fallback } catch { return fallback }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => (read(LS.theme) === 'light' ? 'light' : 'dark'))
  const [palette, setPaletteState] = useState<string>(() => read(LS.palette))
  const [font, setFontState] = useState<string>(() => read(LS.font))

  useEffect(() => {
    const d = document.documentElement
    d.classList.toggle('light', theme === 'light')
    try { localStorage.setItem(LS.theme, theme) } catch {}
  }, [theme])

  useEffect(() => {
    const d = document.documentElement
    if (palette) d.setAttribute('data-palette', palette); else d.removeAttribute('data-palette')
    try { localStorage.setItem(LS.palette, palette) } catch {}
  }, [palette])

  useEffect(() => {
    const d = document.documentElement
    if (font) d.setAttribute('data-font', font); else d.removeAttribute('data-font')
    try { localStorage.setItem(LS.font, font) } catch {}
  }, [font])

  const value: Ctx = {
    theme, palette, font,
    toggleTheme: () => setTheme(t => (t === 'light' ? 'dark' : 'light')),
    setPalette: setPaletteState,
    setFont: setFontState,
  }
  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>
}

export function useTheme() {
  const c = useContext(ThemeCtx)
  if (!c) throw new Error('useTheme must be used within ThemeProvider')
  return c
}
