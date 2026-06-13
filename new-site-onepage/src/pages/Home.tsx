import { Nav } from '../components/Nav'
import { Footer } from '../components/Footer'
import { Hero } from '../sections/Hero'
import { Capabilities } from '../sections/Capabilities'
import { Difference } from '../sections/Difference'
import { Solutions } from '../sections/Solutions'
import { Work } from '../sections/Work'
import { About } from '../sections/About'
import { Contact } from '../sections/Contact'

export function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Capabilities />
        <Difference />
        <Solutions />
        <Work />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
