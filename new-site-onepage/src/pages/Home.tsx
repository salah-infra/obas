import { Nav } from '../components/Nav'
import { Footer } from '../components/Footer'
import { BackgroundFX } from '../components/ui/BackgroundFX'
import { MarqueeBand } from '../components/MarqueeBand'
import { Hero } from '../sections/Hero'
import { Capabilities } from '../sections/Capabilities'
import { Difference } from '../sections/Difference'
import { Solutions } from '../sections/Solutions'
import { Work } from '../sections/Work'
import { About } from '../sections/About'
import { Contact } from '../sections/Contact'
import { useStrings } from '../i18n/LocaleContext'

export function Home() {
  const t = useStrings()
  const bandItems = [...t.hero.trust, ...t.capabilities.items.slice(0, 3).map((c) => c.title)]
  return (
    <>
      <BackgroundFX />
      <Nav />
      <main>
        <Hero />
        <MarqueeBand items={bandItems} />
        <Capabilities />
        <Difference />
        <Solutions />
        <Work />
        <About />
        <MarqueeBand items={t.bot.steps.map((s) => s.word)} />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
