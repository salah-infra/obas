import { useState } from 'react'
import { Reveal } from '../components/ui/Reveal'
import { Button } from '../components/ui/Button'
import { useStrings } from '../i18n/LocaleContext'

export function Contact() {
  const t = useStrings()
  const [sent, setSent] = useState(false)
  const inputStyle = { borderColor: 'var(--line)', background: 'var(--surface-2)', color: 'var(--ink)', minWidth: 0 } as const
  return (
    <section id="contact" className="px-4 py-20">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border p-8 md:p-12" style={{ borderColor: 'var(--line)', background: 'radial-gradient(120% 140% at 0% 0%, color-mix(in srgb, var(--cyan) 14%, transparent), transparent 55%), radial-gradient(120% 140% at 100% 100%, color-mix(in srgb, var(--violet) 16%, transparent), transparent 55%), var(--surface-2)' }}>
            <h2 className="display text-3xl font-bold sm:text-4xl" style={{ color: 'var(--ink)' }}>{t.contact.titleA}<span className="grad-text">{t.contact.titleGrad}</span></h2>
            {sent ? (
              <p className="mt-6 text-lg" style={{ color: 'var(--muted)' }}>{t.dir === 'rtl' ? '✓ شكراً لك — سنتواصل معك قريباً.' : '✓ Thank you — we\'ll be in touch.'}</p>
            ) : (
              <form className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2" onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
                <input required name="name" autoComplete="name" aria-label={t.contact.namePh} placeholder={t.contact.namePh} className="rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-[color:var(--cyan)]" style={inputStyle} />
                <input name="organization" autoComplete="organization" aria-label={t.contact.orgPh} placeholder={t.contact.orgPh} className="rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-[color:var(--cyan)]" style={inputStyle} />
                <input required type="email" name="email" autoComplete="email" dir="ltr" aria-label={t.contact.emailPh} placeholder={t.contact.emailPh} className="rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-[color:var(--cyan)] sm:col-span-2" style={inputStyle} />
                <select name="sector" aria-label={t.nav.solutions} className="rounded-lg border px-3 py-2.5 text-sm outline-none sm:col-span-2" style={inputStyle}>
                  {t.solutions.tabs.map(tb => <option key={tb.id} value={tb.label}>{tb.label}</option>)}
                </select>
                <textarea required name="message" rows={5} aria-label={t.contact.msgPh} placeholder={t.contact.msgPh} className="rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-[color:var(--cyan)] sm:col-span-2" style={inputStyle} />
                <div className="sm:col-span-2"><Button as="button" type="submit">{t.contact.submit}</Button></div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
