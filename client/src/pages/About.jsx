import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Reveal from '@/components/Reveal'
import InfluencedBy from '@/components/sections/InfluencedBy'
import WhatYoullNotice from '@/components/sections/WhatYoullNotice'
import Halftone from '@/components/Halftone'

const storySections = [
  {
    number: '01',
    title: 'Our Story',
    body: 'Hiwaga Makers began as a creative-first venture rooted in video production and storytelling. Over time, through continuous learning, collaboration and strategic thinking, it evolved into a full-service advertising and marketing agency. Today, Hiwaga works across strategy, content, campaigns and performance — building brands with clarity and purpose.',
  },
  {
    number: '02',
    title: 'Our Mission and Vision',
    body: 'Our mission is to create meaningful communication that delivers real business impact, not just visibility. We envision building brands that are thoughtful, consistent and trusted across platforms and markets. Everything we do is guided by purpose, strategy and honest execution.',
  },
  {
    number: '03',
    title: 'We Can Help You With',
    body: 'We help brands with strategy, storytelling, content, campaigns, video production and performance marketing. From brand establishment to lead generation and long-term growth, our work is tailored to what each brand truly needs. Every solution is built with clarity, consistency and measurable outcomes in mind.',
  },
]

export default function About() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Navbar />
      <main>
        {/* Page hero / landing identifier */}
        <section
          aria-labelledby="page-title"
          className="relative isolate overflow-hidden bg-neutral-950 text-white"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-32 -z-10 mx-auto h-96 max-w-3xl opacity-40 blur-3xl"
            style={{
              background:
                'radial-gradient(closest-side, rgba(255,255,255,0.18), rgba(255,255,255,0) 70%)',
            }}
          />

          <Halftone />
          <div className="mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8 lg:pb-24 lg:pt-36">
            <div className="mx-auto max-w-4xl text-center">
              <h1
                id="page-title"
                className="font-display text-6xl font-medium leading-[0.95] tracking-tight sm:text-7xl md:text-8xl lg:text-[4.5rem]"
                style={{
                  fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1',
                }}
              >
                <span className="text-[#FFD700]">About</span>{' '}
                <span className="text-white">Us</span>
                <span className="text-[#FFD700]/50">.</span>
              </h1>

              <div
                aria-hidden="true"
                className="mx-auto mt-10 h-px w-20 bg-white/20 sm:mt-12"
              />
            </div>
          </div>
        </section>
        

        {/* Story sections — editorial 2-col layout */}
        <section
          aria-labelledby="story-heading"
          className="bg-neutral-950 text-white"
        >
          <h2 id="story-heading" className="sr-only">
            Our story, mission, and capabilities
          </h2>
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <ul role="list" className="divide-y divide-white/10">
              {storySections.map((s, i) => (
                <li key={s.number}>
                  <Reveal delay={i * 60}>
                    <article className="grid grid-cols-1 gap-6 py-14 sm:py-20 lg:grid-cols-12 lg:gap-10 lg:py-24">
                      <div className="lg:col-span-4">
                        <div className="flex items-baseline gap-3">
                          <span className="text-sm font-medium tracking-widest text-[#FFD700]/90">
                            {s.number}
                          </span>
                          <span
                            aria-hidden="true"
                            className="h-px w-12 self-center bg-[#FFD700]/40"
                          />
                        </div>
                        <h3
                          className="mt-5 font-display text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-[2.75rem]"
                          style={{
                            fontVariationSettings:
                              '"opsz" 144, "SOFT" 50, "WONK" 1',
                          }}
                        >
                          {s.title}
                        </h3>
                      </div>

                      <div className="lg:col-span-8">
                        <p className="text-base leading-relaxed text-neutral-300 sm:text-lg lg:text-xl lg:leading-[1.5]">
                          {s.body}
                        </p>
                      </div>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Reveal>
          <InfluencedBy />
        </Reveal>
        <Reveal>
          <WhatYoullNotice />
        </Reveal>
      </main>
      <Footer />
    </div>
  )
}
