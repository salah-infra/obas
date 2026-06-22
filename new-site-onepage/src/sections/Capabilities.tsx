import { SpotlightCard } from '../components/ui/SpotlightCard'
import { CountUp } from '../components/ui/CountUp'
import { RevealStagger, RevealItem, Reveal } from '../components/ui/Reveal'
import { useStrings } from '../i18n/LocaleContext'

const ICONS = [
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6" /></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" /></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2z" /></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5" /></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.3 7 12 12 20.7 7" /><line x1="12" y1="22" x2="12" y2="12" /></svg>,
]

export function Capabilities() {
  const t = useStrings()
  const items = t.capabilities.items
  const stat = t.about.metrics[2] // 5 sectors

  return (
    <section id="capabilities" className="relative px-4 py-16">
      <div className="mx-auto max-w-[80rem]">
        <Reveal>
          <p className="eyebrow">{t.capabilities.eyebrow}</p>
          <h2 className="display mt-2 text-3xl font-bold sm:text-5xl" style={{ color: 'var(--ink)' }}>{t.capabilities.title}</h2>
        </Reveal>

        <RevealStagger className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {/* feature tile */}
          <RevealItem className="col-span-2">
            <SpotlightCard className="gborder spin flex h-full flex-col justify-between gap-6">
              <span className="icon-chip">{ICONS[0]}</span>
              <div>
                <h3 className="display text-2xl font-bold" style={{ color: 'var(--ink)' }}>{items[0].title}</h3>
                <p className="mt-2 max-w-md text-sm" style={{ color: 'var(--muted)' }}>{items[0].body}</p>
              </div>
            </SpotlightCard>
          </RevealItem>

          {items.slice(1).map((c, i) => (
            <RevealItem key={i}>
              <SpotlightCard className="flex h-full flex-col gap-3">
                <span className="icon-chip">{ICONS[i + 1]}</span>
                <div>
                  <h3 className="display text-base font-semibold" style={{ color: 'var(--ink)' }}>{c.title}</h3>
                  <p className="mt-1 text-sm" style={{ color: 'var(--muted)' }}>{c.body}</p>
                </div>
              </SpotlightCard>
            </RevealItem>
          ))}

          {/* stat tile fills the grid */}
          <RevealItem>
            <div
              className="flex h-full flex-col justify-center rounded-2xl border p-6 text-center"
              style={{ borderColor: 'var(--line)', background: 'linear-gradient(135deg, color-mix(in srgb, var(--cyan) 14%, transparent), color-mix(in srgb, var(--violet) 14%, transparent))' }}
            >
              <p className="grad-text display text-4xl font-bold"><CountUp to={stat.value} />+</p>
              <p className="mt-1 text-xs" style={{ color: 'var(--muted)' }}>{stat.label}</p>
            </div>
          </RevealItem>
        </RevealStagger>
      </div>
    </section>
  )
}
