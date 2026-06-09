import { useState } from 'react'
import { Plus, ArrowRight } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Reveal from '@/components/Reveal'
import Halftone from '@/components/Halftone'

const faqs = [
  {
    q: 'What makes Hiwaga Makers different from other digital marketing agencies?',
    a: 'Hiwaga Makers focuses on impact, not monthly post counts. Instead of delivering a fixed number of creatives, we study your brand’s goals — whether it’s awareness, authority, education, leads or footfalls — and build strategies that directly support those outcomes. Our honest, transparent, partner-style approach ensures we think for your brand the way you would.',
  },
  {
    q: 'Do you provide end-to-end digital marketing?',
    a: 'Yes. We handle everything from strategy, ideas, content direction and designs to videos, captions, posting, profiling, platform optimization and consistency management. In social media Instagram is our primary focus, but we also manage Facebook, LinkedIn, YouTube and other platforms based on your brand’s needs.',
  },
  {
    q: 'What industries do you work with?',
    a: 'We work across diverse industries including boutiques and clothing brands, restaurants and food ventures, personal branding for professionals, interiors and home décor, architecture, construction, opticals, clinics, hospitals, salons and education. Our approach adapts to each industry’s audience and communication style.',
  },
  {
    q: 'How does your video production service work?',
    a: 'We have a full in-house video production team and our own equipment centre, which allows us complete control over quality and creativity. We handle everything from scripting and concept development to shooting, direction and editing. Whether you need brand films, ads, product videos, interior walkthroughs or social media reels, we craft videos that capture emotion and drive brand recall.',
  },
  {
    q: 'Do you offer influencer marketing?',
    a: 'Yes. We work with micro and mid-level influencers across niches. Our team identifies the right creators, develops the campaign idea, guides the content structure, coordinates execution and ensures brand alignment in every deliverable. We make influencer campaigns natural, relatable and effective.',
  },
  {
    q: 'Do you manage personal branding for professionals?',
    a: 'Yes. We build digital identities for doctors, entrepreneurs, trainers, consultants and creators across platforms like LinkedIn, Instagram, YouTube and Facebook. We develop their content direction, script videos, create branding visuals, plan monthly topics and ensure long-term consistency.',
  },
  {
    q: 'Do you take up OOH (Out-of-Home) advertising?',
    a: 'We support outdoor campaigns for select clients. This includes creative direction, design, message development, location planning and coordination. Every OOH campaign is aligned with your digital communication to ensure consistency across all touchpoints.',
  },
  {
    q: 'Can I collaborate if I only need video production?',
    a: 'Yes, absolutely. Many brands approach us specifically for video content — ad films, brand films, product videos, interior walkthroughs, testimonial videos or social media reels. You can choose video production as an independent service.',
  },
  {
    q: 'How long does it take to see results from digital marketing?',
    a: 'Digital marketing results depend on your goals. Brand awareness and engagement can improve within weeks, while SEO and long-term authority take months. Paid ads show quicker results, whereas organic growth requires consistency and strong content systems.',
  },
  {
    q: 'What is performance marketing?',
    a: 'Performance marketing focuses on measurable results such as leads, sales, sign-ups or walk-ins. It uses platforms like Meta Ads and Google Ads to target specific audiences and track every rupee spent. It is data-driven and objective-focused.',
  },
  {
    q: 'Why does content strategy matter more than just posting frequently?',
    a: 'Without strategy, content becomes noise. A clear strategy defines what to say, how to say it, who you’re speaking to, and what outcome you expect. It ensures every post serves a purpose and contributes to long-term brand building.',
  },
  {
    q: 'How do you choose the right platform for my business?',
    a: 'Platform selection depends on your industry, audience behavior and goals. For example, Instagram works best for visual businesses; LinkedIn works better for professionals and B2B; YouTube supports education and long-form content. We help you choose what fits.',
  },
]

function FAQItem({ index, q, a, isOpen, onToggle }) {
  return (
    <article
      className={`group border-b border-white/10 transition-colors duration-500 ${
        isOpen ? 'bg-white/[0.025]' : ''
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-start gap-5 px-1 py-6 text-left transition-colors duration-300 sm:gap-7 sm:px-2 sm:py-7"
      >
        <span
          aria-hidden="true"
          className="shrink-0 font-display text-xl font-medium leading-none text-[#FFD700]/85 sm:text-2xl"
          style={{
            fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1',
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        <h3
          className={`flex-1 font-display text-lg font-medium leading-snug tracking-tight transition-colors duration-300 sm:text-xl md:text-2xl ${
            isOpen ? 'text-white' : 'text-white/85 group-hover:text-white'
          }`}
          style={{
            fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1',
          }}
        >
          {q}
        </h3>

        <span
          aria-hidden="true"
          className={`mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] transition-all duration-500 ${
            isOpen
              ? 'rotate-45 border-[#FFD700]/60 bg-[#FFD700]/10 text-[#FFD700]'
              : 'text-white/70 group-hover:border-white/35 group-hover:text-white'
          } sm:h-10 sm:w-10`}
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
        </span>
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-500 ease-out"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="pb-7 pl-10 pr-2 sm:pb-8 sm:pl-14 sm:pr-12">
            <p className="max-w-3xl text-sm leading-relaxed text-neutral-300 sm:text-base lg:text-[17px] lg:leading-[1.7]">
              {a}
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function FAQ() {
  const [openIndices, setOpenIndices] = useState(new Set([0]))

  const toggle = (i) => {
    setOpenIndices((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Navbar />
      <main>
        {/* Page hero */}
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
          <div className="mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8 lg:pb-20 lg:pt-36">
            <div className="mx-auto max-w-4xl text-center">
              <h1
                id="page-title"
                className="font-display text-6xl font-medium leading-[0.95] tracking-tight sm:text-7xl md:text-8xl lg:text-[4.5rem]"
                style={{
                  fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1',
                }}
              >
                <span className="text-[#FFD700]">FAQ</span>
                <span className="text-[#FFD700]/50">.</span>
              </h1>

              <div
                aria-hidden="true"
                className="mx-auto mt-10 h-px w-20 bg-white/20 sm:mt-12"
              />

              <p className="mx-auto mt-10 max-w-2xl text-base leading-relaxed text-neutral-300 sm:text-lg">
                Everything you might want to know before reaching out — from how
                we work to what we deliver.
              </p>
            </div>
          </div>
        </section>

        {/* Accordion list */}
        <section
          aria-labelledby="faq-list"
          className="bg-neutral-950 text-white"
        >
          <h2 id="faq-list" className="sr-only">
            Frequently asked questions
          </h2>

          <div className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
            <div className="border-t border-white/10">
              {faqs.map((item, i) => (
                <Reveal key={item.q} delay={(i % 4) * 50}>
                  <FAQItem
                    index={i}
                    q={item.q}
                    a={item.a}
                    isOpen={openIndices.has(i)}
                    onToggle={() => toggle(i)}
                  />
                </Reveal>
              ))}
            </div>

            {/* Closing CTA — inline-button headline */}
            <Reveal>
              <div className="mt-14 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent px-6 py-14 sm:mt-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
                <div className="mx-auto max-w-3xl text-center">
                  <p className="text-xs font-medium text-neutral-400 sm:text-sm">
                    Still have questions?
                  </p>

                  <h3 className="mt-6 text-balance text-3xl font-semibold leading-[1.15] tracking-tight text-white sm:mt-8 sm:text-4xl md:text-5xl lg:text-[2.75rem]">
                    Let&apos;s talk—book a free{' '}
                    <a
                      href="mailto:hiwagamakers@gmail.com"
                      className="group mx-1 inline-flex items-center gap-2 rounded-full bg-[#FFD700] py-1 pl-4 pr-1 align-middle text-lg font-medium text-neutral-900 transition-colors duration-300 hover:bg-[#FFE57A] sm:py-1.5 sm:pl-5 sm:text-xl md:text-2xl"
                    >
                      Get in touch
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-white transition-transform duration-300 group-hover:rotate-45 sm:h-9 sm:w-9 md:h-10 md:w-10">
                        <ArrowRight
                          aria-hidden="true"
                          className="h-4 w-4 md:h-5 md:w-5"
                          strokeWidth={2}
                        />
                      </span>
                    </a>{' '}
                    consultation
                  </h3>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
