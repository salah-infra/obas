import { useEffect } from 'react'
import { LocaleProvider } from './src/i18n/LocaleContext'
import { Home } from './src/pages/Home'

export default function App({ locale }: { locale: 'en' | 'ar' }) {
  useEffect(() => {
    const d = document.documentElement
    d.lang = locale === 'ar' ? 'ar' : 'en'
    d.dir = locale === 'ar' ? 'rtl' : 'ltr'
  }, [locale])
  return (
    <LocaleProvider locale={locale}>
      <Home />
    </LocaleProvider>
  )
}
