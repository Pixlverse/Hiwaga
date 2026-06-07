import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Reveal from '@/components/Reveal'
import HomeIntro from '@/components/HomeIntro'
import Hero from '@/components/sections/Hero'
import ClientImpactStories from '@/components/sections/ClientImpactStories'
import ValueProps from '@/components/sections/ValueProps'
import Strategy from '@/components/sections/Strategy'
import Testimonials from '@/components/sections/Testimonials'
import Industries from '@/components/sections/Industries'
import Services from '@/components/sections/Services'
import PortfolioCTA from '@/components/sections/PortfolioCTA'

export default function Home() {
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window === 'undefined') return false
    return !sessionStorage.getItem('home_intro_shown')
  })

  const handleIntroDone = () => {
    sessionStorage.setItem('home_intro_shown', 'true')
    setShowIntro(false)
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {showIntro && <HomeIntro onComplete={handleIntroDone} />}
      <Navbar />
      <main>
        <Hero />
        <Reveal>
          <ClientImpactStories />
        </Reveal>
        <Reveal>
          <ValueProps />
        </Reveal>
        <Reveal>
          <Strategy />
        </Reveal>
        <Testimonials />
        <Reveal>
          <Industries />
        </Reveal>
        <Reveal>
          <Services />
        </Reveal>
        <Reveal>
          <PortfolioCTA />
        </Reveal>
      </main>
      <Footer />
    </div>
  )
}
