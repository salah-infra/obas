import { SpotlightCard } from '../components/ui/SpotlightCard'
import { RevealStagger, RevealItem, Reveal } from '../components/ui/Reveal'
import { useStrings } from '../i18n/LocaleContext'

export function Capabilities() {
  const t = useStrings()
  return (
    <section id="capabilities" className="px-4 py-20">
      <div className="mx-auto max-w-[80rem]">
        <Reveal>
          <p className="eyebrow">{t.capabilities.eyebrow}</p>
          <h2 className="display mt-2 text-3xl font-bold sm:text-4xl" style={{ color: 'var(--ink)' }}>{t.capabilities.title}</h2>
        </Reveal>
        <RevealStagger className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.capabilities.items.map((c, i) => (
            <RevealItem key={i} className={i === 0 ? 'sm:col-span-2 lg:row-span-2' : ''}>
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
