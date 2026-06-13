import { SpotlightCard } from '../components/ui/SpotlightCard'
import { Reveal, RevealStagger, RevealItem } from '../components/ui/Reveal'
import { CountUp } from '../components/ui/CountUp'
import { useStrings } from '../i18n/LocaleContext'

export function About() {
  const t = useStrings()
  return (
    <section id="about" className="px-4 py-20">
      <div className="mx-auto max-w-[80rem]">
        <Reveal><h2 className="display text-3xl font-bold sm:text-4xl" style={{ color: 'var(--ink)' }}>{t.about.title}</h2></Reveal>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {t.about.metrics.map((m, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="rounded-2xl border p-6" style={{ borderColor: 'var(--line)', background: 'var(--card-bg)' }}>
                <p className="grad-text display text-4xl font-bold"><CountUp to={m.value} /></p>
                <p className="mt-2 text-sm" style={{ color: 'var(--muted)' }}>{m.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <RevealStagger className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.about.cards.map((c, i) => (
            <RevealItem key={i}>
              <SpotlightCard className="h-full">
                <h3 className="display text-lg font-semibold" style={{ color: 'var(--ink)' }}>{c.title}</h3>
                <p className="mt-2 text-sm" style={{ color: 'var(--muted)' }}>{c.body}</p>
              </SpotlightCard>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  )
}
