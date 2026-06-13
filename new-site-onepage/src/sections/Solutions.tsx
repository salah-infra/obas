import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Reveal } from '../components/ui/Reveal'
import { useStrings } from '../i18n/LocaleContext'

export function Solutions() {
  const t = useStrings()
  const [active, setActive] = useState(0)
  const tab = t.solutions.tabs[active]
  return (
    <section id="solutions" className="px-4 py-20">
      <div className="mx-auto max-w-[80rem]">
        <Reveal><h2 className="display text-3xl font-bold sm:text-4xl" style={{ color: 'var(--ink)' }}>{t.solutions.title}</h2></Reveal>
        <div role="tablist" className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-b" style={{ borderColor: 'var(--line)' }}>
          {t.solutions.tabs.map((tb, i) => (
            <button key={tb.id} role="tab" aria-selected={i === active} onClick={() => setActive(i)}
              className="pb-3 text-sm font-medium" style={{ color: i === active ? 'var(--ink)' : 'var(--muted)', borderBottom: i === active ? '2px solid var(--cyan)' : '2px solid transparent' }}>
              {tb.label}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={tab.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="pt-8">
            <h3 className="display text-2xl font-semibold" style={{ color: 'var(--ink)' }}>{tab.heading}</h3>
            <p className="mt-3 max-w-2xl" style={{ color: 'var(--muted)' }}>{tab.body}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
