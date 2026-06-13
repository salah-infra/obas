import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { useStrings } from '../i18n/LocaleContext'

export function Difference() {
  const t = useStrings()
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['12%', '-12%'])
  const arrow = t.dir === 'rtl' ? '←' : '→'
  return (
    <section id="difference" ref={ref} className="px-4 py-24" style={{ background: 'linear-gradient(120deg, color-mix(in srgb, var(--cyan) 6%, transparent), transparent)' }}>
      <div className="mx-auto max-w-[80rem]">
        <p className="eyebrow">{t.bot.eyebrow}</p>
        <motion.div style={{ y }} className="mt-4">
          {t.bot.steps.map((s, i) => (
            <h2 key={i} className="display text-4xl font-bold leading-none sm:text-6xl md:text-7xl" style={{ color: 'var(--ink)' }}>
              <span className={i === t.bot.steps.length - 1 ? 'grad-text' : ''}>{s.word}.</span>
              <span className="ms-4 align-middle text-base font-normal sm:text-lg" style={{ color: 'var(--muted)' }}>{s.note}</span>
            </h2>
          ))}
        </motion.div>
        <div className="mt-14">
          <p className="eyebrow mb-4">{t.dragonise.label}</p>
          <div className="flex flex-wrap items-center gap-3">
            {t.dragonise.stages.map((st, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="rounded-full border px-4 py-2 text-sm" style={{ borderColor: 'var(--line)', color: 'var(--ink)', background: 'var(--surface-2)' }}>{st}</span>
                {i < t.dragonise.stages.length - 1 && <span style={{ color: 'var(--cyan)' }}>{arrow}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
