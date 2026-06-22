import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Reveal } from '../components/ui/Reveal'
import { useStrings } from '../i18n/LocaleContext'

const IMG: Record<string, string> = {
  gov: '/img/government.jpg',
  fin: '/img/ai.jpg',
  tel: '/img/city.jpg',
  enr: '/img/mountains.jpg',
  ent: '/img/bridge.jpg',
}

export function Solutions() {
  const t = useStrings()
  const [active, setActive] = useState(0)
  const tab = t.solutions.tabs[active]
  return (
    <section id="solutions" className="relative px-4 py-16">
      <div className="mx-auto max-w-[80rem]">
        <Reveal><h2 className="display text-3xl font-bold sm:text-5xl" style={{ color: 'var(--ink)' }}>{t.solutions.title}</h2></Reveal>

        <div role="tablist" className="mt-8 flex flex-wrap gap-2">
          {t.solutions.tabs.map((tb, i) => (
            <button
              key={tb.id}
              role="tab"
              id={`tab-${tb.id}`}
              aria-controls="solutions-panel"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className="rounded-full px-4 py-2 text-sm font-medium transition-colors"
              style={
                i === active
                  ? { background: 'var(--violet)', color: '#fff' }
                  : { background: 'var(--surface-2)', color: 'var(--muted)', border: '1px solid var(--line)' }
              }
            >
              {tb.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab.id}
            id="solutions-panel"
            role="tabpanel"
            aria-labelledby={`tab-${tab.id}`}
            tabIndex={0}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="mt-8 grid items-stretch gap-6 lg:grid-cols-2"
          >
            <div className="flex flex-col justify-center rounded-3xl border p-8" style={{ borderColor: 'var(--line)', background: 'var(--card-bg)' }}>
              <span className="display text-5xl font-bold" style={{ color: 'color-mix(in srgb, var(--cyan) 55%, transparent)' }}>
                0{active + 1}
              </span>
              <h3 className="display mt-4 text-2xl font-semibold" style={{ color: 'var(--ink)' }}>{tab.heading}</h3>
              <p className="mt-3 text-base" style={{ color: 'var(--muted)' }}>{tab.body}</p>
              <a href="#contact" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--cyan)' }}>
                {t.nav.cta}
                <span aria-hidden>{t.dir === 'rtl' ? '←' : '→'}</span>
              </a>
            </div>
            <div className="relative min-h-[260px] overflow-hidden rounded-3xl border" style={{ borderColor: 'var(--line)' }}>
              <img src={IMG[tab.id]} alt={tab.heading} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 40%, color-mix(in srgb, var(--surface) 85%, transparent))' }} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
