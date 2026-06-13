import { useStrings } from '../i18n/LocaleContext'

export function Footer() {
  const t = useStrings()
  const year = new Date().getFullYear()
  const links = [
    { href: '#capabilities', label: t.nav.capabilities },
    { href: '#solutions', label: t.nav.solutions },
    { href: '#work', label: t.nav.work },
    { href: '#about', label: t.nav.about },
  ]
  return (
    <footer className="px-4 py-12" style={{ borderTop: '1px solid var(--line)' }}>
      <div className="mx-auto flex max-w-[80rem] flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-3">
          <img src="/logo-wordmark.svg" alt="OBAS" className="h-7" />
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {links.map(l => <a key={l.href} href={l.href} className="text-sm transition-colors hover:opacity-80" style={{ color: 'var(--muted)' }}>{l.label}</a>)}
        </nav>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>© {year} OBAS</p>
      </div>
    </footer>
  )
}
