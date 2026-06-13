import { createContext, useContext, type ReactNode } from 'react'
import { en, ar, type Strings } from './strings'

const LocaleCtx = createContext<Strings>(en)

export function LocaleProvider({ locale, children }: { locale: 'en' | 'ar'; children: ReactNode }) {
  return <LocaleCtx.Provider value={locale === 'ar' ? ar : en}>{children}</LocaleCtx.Provider>
}
export const useStrings = () => useContext(LocaleCtx)
