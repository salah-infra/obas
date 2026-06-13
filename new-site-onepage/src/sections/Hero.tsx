import { Aurora } from '../components/ui/Aurora'
import { Marquee } from '../components/ui/Marquee'
import { RevealStagger, RevealItem } from '../components/ui/Reveal'
import { Button } from '../components/ui/Button'
import { useStrings } from '../i18n/LocaleContext'

export function Hero() {
  const t = useStrings()
  return (
    <section id="top" className="relative px-4 pt-36 pb-24 md:pt-44 md:pb-28">
      <Aurora />
      <div className="relative mx-auto max-w-[80rem] text-center">
        <RevealStagger>
          <RevealItem><p className="eyebrow mb-5">{t.hero.eyebrow}</p></RevealItem>
          <RevealItem>
            <h1 className="display text-4xl font-bold leading-[1.05] sm:text-6xl md:text-7xl" style={{ color: 'var(--ink)' }}>
              {t.hero.titleA}<br /><span className="grad-text">{t.hero.titleGrad}</span>
            </h1>
          </RevealItem>
          <RevealItem><p className="mx-auto mt-6 max-w-2xl text-lg" style={{ color: 'var(--muted)' }}>{t.hero.sub}</p></RevealItem>
          <RevealItem>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Button href="#contact">{t.hero.ctaPrimary}</Button>
              <Button href="#difference" variant="ghost">{t.hero.ctaGhost}</Button>
            </div>
          </RevealItem>
        </RevealStagger>
      </div>
      <div className="relative mx-auto mt-16 max-w-[80rem]">
        <Marquee items={t.hero.trust} />
      </div>
    </section>
  )
}
