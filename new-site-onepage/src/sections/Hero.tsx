import { motion, useReducedMotion } from 'motion/react'
import { Aurora } from '../components/ui/Aurora'
import { OrbitVisual } from '../components/ui/OrbitVisual'
import { MagneticButton } from '../components/ui/MagneticButton'
import { CountUp } from '../components/ui/CountUp'
import { RevealStagger, RevealItem } from '../components/ui/Reveal'
import { useStrings } from '../i18n/LocaleContext'

export function Hero() {
  const t = useStrings()
  const reduce = useReducedMotion()

  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden px-4 pt-32 pb-16">
      <Aurora />
      <div aria-hidden className="bg-grid fx-grid absolute inset-0 opacity-40" />

      <div className="relative mx-auto grid w-full max-w-[80rem] items-center gap-12 lg:grid-cols-2">
        {/* Copy */}
        <div className="text-center lg:text-start">
          <RevealStagger>
            <RevealItem><span className="chip eyebrow mb-6 inline-flex">{t.hero.eyebrow}</span></RevealItem>
            <RevealItem>
              <h1 className="display text-5xl font-bold leading-[1.02] sm:text-6xl md:text-7xl" style={{ color: 'var(--ink)' }}>
                {t.hero.titleA}<br /><span className="grad-text">{t.hero.titleGrad}</span>
              </h1>
            </RevealItem>
            <RevealItem><p className="mx-auto mt-6 max-w-xl text-lg lg:mx-0" style={{ color: 'var(--muted)' }}>{t.hero.sub}</p></RevealItem>
            <RevealItem>
              <div className="mt-9 flex flex-wrap justify-center gap-3 lg:justify-start">
                <MagneticButton href="#contact">{t.hero.ctaPrimary}</MagneticButton>
                <MagneticButton href="#difference" variant="ghost">{t.hero.ctaGhost}</MagneticButton>
              </div>
            </RevealItem>
            <RevealItem>
              <div className="mt-10 grid max-w-md grid-cols-3 gap-4 lg:mx-0">
                {t.about.metrics.map((m, i) => (
                  <div key={i} className="text-center lg:text-start">
                    <p className="grad-text display text-3xl font-bold"><CountUp to={m.value} /></p>
                    <p className="mt-1 text-xs leading-tight" style={{ color: 'var(--muted)' }}>{m.label}</p>
                  </div>
                ))}
              </div>
            </RevealItem>
          </RevealStagger>
        </div>

        {/* Visual */}
        <div className="relative hidden lg:block">
          <OrbitVisual points={t.dragonise.stages.map((s) => s.replace(/\s*\(BOT\)/i, '').trim())} />
        </div>
      </div>

      {/* scroll cue */}
      {!reduce && (
        <motion.div
          aria-hidden
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="1.6" strokeLinecap="round"><path d="M12 5v14M6 13l6 6 6-6" /></svg>
        </motion.div>
      )}
    </section>
  )
}
