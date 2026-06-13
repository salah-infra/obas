import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStrings } from '../i18n/LocaleContext'
import { ThemeToggle } from './ui/ThemeToggle'
import { PalettePopover } from './ui/PalettePopover'
import { Button } from './ui/Button'

export function Nav() {
  const t = useStrings()
  const [open, setOpen] = useState(false)
  const links = [
    { href: '#capabilities', label: t.nav.capabilities },
    { href: '#solutions', label: t.nav.solutions },
    { href: '#work', label: t.nav.work },
    { href: '#about', label: t.nav.about },
  ]
  const glass = { background: 'var(--nav-bg)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid var(--line)' }
  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav className="mx-auto flex max-w-[80rem] items-center justify-between rounded-2xl px-4 py-3 md:px-6" style={glass}>
        <a href="#top" className="flex items-center gap-2" aria-label="OBAS home">
          <svg viewBox="0 0 64 64" aria-hidden className="h-8 w-8">
            <defs>
              <linearGradient id="navGrad" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
                <stop offset="0" style={{ stopColor: 'var(--cyan)' }} />
                <stop offset=".55" style={{ stopColor: 'var(--bright-cyan)' }} />
                <stop offset="1" style={{ stopColor: 'var(--violet)' }} />
              </linearGradient>
            </defs>
            <circle cx="32" cy="32" r="18" fill="none" stroke="url(#navGrad)" strokeWidth="7" strokeLinecap="round" pathLength={100} strokeDasharray="78 100" transform="rotate(-6 32 32)" />
            <circle cx="50" cy="32" r="4.5" style={{ fill: 'var(--violet)' }} />
          </svg>
          <span className="display text-xl font-bold tracking-[0.18em]" style={{ color: 'var(--ink)' }}>OBAS</span>
        </a>
        <div className="hidden items-center gap-7 md:flex">
          {links.map(l => <a key={l.href} href={l.href} className="text-sm transition-colors hover:opacity-80" style={{ color: 'var(--muted)' }}>{l.label}</a>)}
          <Link to={t.nav.langHref} className="text-sm transition-colors hover:opacity-80" style={{ color: 'var(--muted)' }} lang={t.dir === 'rtl' ? 'en' : 'ar'}>{t.nav.langLabel}</Link>
          <ThemeToggle />
          <PalettePopover />
          <Button href="#contact">{t.nav.cta}</Button>
        </div>
        <button className="p-2 md:hidden" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(o => !o)} style={{ color: 'var(--ink)' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </nav>
      {open && (
        <div className="mx-auto mt-2 flex max-w-[80rem] flex-col gap-1 rounded-2xl p-4 md:hidden" style={glass}>
          {links.map(l => <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2" style={{ color: 'var(--muted)' }}>{l.label}</a>)}
          <Link to={t.nav.langHref} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2" style={{ color: 'var(--muted)' }}>{t.nav.langLabel}</Link>
          <div className="mt-2 flex gap-2"><ThemeToggle /><PalettePopover /></div>
        </div>
      )}
    </header>
  )
}
