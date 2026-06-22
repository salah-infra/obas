import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { useStrings } from '../i18n/LocaleContext'

export function Difference() {
  const t = useStrings()
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['12%', '-12%'])
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
        <div className="mt-16">
          <p className="eyebrow mb-8">{t.dragonise.label}</p>
          <div className="relative">
            {/* base track + animated progress (desktop) */}
            <div aria-hidden className="absolute left-[10%] right-[10%] top-[9px] hidden h-px sm:block" style={{ background: 'var(--line)' }} />
            <motion.div
              aria-hidden
              className="absolute left-[10%] top-[9px] hidden h-px sm:block"
              style={{ background: 'linear-gradient(90deg, var(--cyan), var(--violet))' }}
              initial={{ width: reduce ? '80%' : 0 }}
              whileInView={{ width: '80%' }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
            <div className="relative grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-5">
              {t.dragonise.stages.map((st, i) => (
                <motion.div
                  key={i}
                  className="flex flex-col items-center text-center"
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: reduce ? 0 : i * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span
                    className="grid h-[18px] w-[18px] place-items-center rounded-full"
                    style={{ background: 'var(--surface)', border: '2px solid var(--cyan)', boxShadow: '0 0 14px color-mix(in srgb, var(--cyan) 55%, transparent)' }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--cyan)' }} />
                  </span>
                  <span className="mt-4 text-xs font-semibold tracking-[0.18em]" style={{ color: 'color-mix(in srgb, var(--cyan) 65%, transparent)' }}>0{i + 1}</span>
                  <span className="mt-1 text-sm font-medium" style={{ color: 'var(--ink)' }}>{st}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
