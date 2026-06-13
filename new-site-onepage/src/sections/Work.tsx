import { SpotlightCard } from '../components/ui/SpotlightCard'
import { Reveal } from '../components/ui/Reveal'
import { useStrings } from '../i18n/LocaleContext'

export function Work() {
  const t = useStrings()
  return (
    <section id="work" className="px-4 py-20">
      <div className="mx-auto max-w-[80rem]">
        <Reveal><h2 className="display text-3xl font-bold sm:text-4xl" style={{ color: 'var(--ink)' }}>{t.work.title}</h2></Reveal>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {t.work.items.map((w, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <SpotlightCard className="h-full !p-0">
                <div className="overflow-hidden">
                  <img src={w.img} alt={w.title} loading="lazy" className="aspect-[16/10] w-full object-cover" />
                </div>
                <div className="p-6">
                  <p className="eyebrow">{w.eyebrow}</p>
                  <h3 className="display mt-2 text-xl font-bold" style={{ color: 'var(--ink)' }}>{w.title}</h3>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
