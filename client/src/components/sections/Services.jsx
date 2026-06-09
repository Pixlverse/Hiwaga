import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

const services = [
  {
    number: '01',
    title: 'Social Media Management',
    body: 'Our team manages everything from campaign ideas and storytelling to copywriting, visual design, and short-form video production. Every piece of content is crafted to build brand recall, reflect your tone of voice, and engage your audience.',
  },
  {
    number: '02',
    title: 'Digital Marketing',
    body: 'Beyond campaigns, we help refine website messaging, improve communication flow, identify UX gaps, and enhance how your products or services are presented. From strategy planning to content creation, we ensure your online presence remains consistent, purposeful, and aligned with your overall brand vision.',
  },
  {
    number: '03',
    title: 'Influencer Marketing',
    body: 'From food and fashion to clinics, interiors, décor, construction, and education, we partner with influencers whose audiences match your customers. We manage the entire process end-to-end, ensuring the final content is natural, engaging, and strategically effective.',
  },
  {
    number: '04',
    title: 'Video Production',
    body: 'From script development and concept design to filming, direction, cinematography, and editing, we manage the entire process. We produce brand films, advertisements, product videos, interior walkthroughs, corporate films, testimonials, food videos, social media reels, and more.',
  },
  {
    number: '05',
    title: 'Personal Branding',
    body: "We help professionals such as doctors, entrepreneurs, consultants, and creators build a credible digital presence across LinkedIn, Instagram, YouTube, and Facebook. Personal branding isn't just about posting regularly — it's about clear positioning.",
  },
  {
    number: '06',
    title: 'Performance Marketing',
    body: "We help professionals such as doctors, entrepreneurs, consultants, and creators build a credible digital presence across LinkedIn, Instagram, YouTube, and Facebook. Personal branding isn't just about posting regularly — it's about clear positioning.",
  },
  {
    number: '07',
    title: 'OOH (Out-of-Home) Campaigns',
    body: 'Outdoor communication becomes an extension of your digital efforts rather than a separate initiative, maintaining consistency in visual identity, tone, and messaging — helping your brand stand out across both physical and digital spaces.',
  },
  {
    number: '08',
    title: 'SEO (Search Engine Optimization)',
    body: 'From identifying relevant keywords and improving on-page messaging to recommending technical improvements and shaping blogs or landing pages, we make your brand easier to find, understand, and trust — while supporting your overall digital narrative.',
  },
]

export default function Services() {
  const [active, setActive] = useState(0)
  const current = services[active]

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-neutral-950 text-white"
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-neutral-500" />
            <h2
              id="services-heading"
              className="text-pretty text-sm leading-relaxed text-neutral-400 sm:text-base md:text-lg font-medium"
            >
              Services
            </h2>
            <span aria-hidden="true" className="h-px w-8 bg-neutral-500" />
          </div>
        </div>

        {/* Desktop: interactive index + sticky detail */}
        <div className="mt-14 hidden gap-12 lg:mt-16 lg:grid lg:grid-cols-2">
          <ol>
            {services.map((s, i) => {
              const isActive = i === active
              return (
                <li key={s.number}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group flex w-full items-baseline gap-6 border-t border-white/10 py-5 text-left transition-all duration-300 last:border-b focus:outline-none"
                  >
                    <span
                      className={`shrink-0 text-xs tabular-nums transition-colors duration-300 ${
                        isActive ? 'text-amber-300' : 'text-neutral-600'
                      }`}
                    >
                      {s.number}
                    </span>
                    <span
                      className={`flex-1 font-display text-xl font-light leading-snug tracking-tight transition-all duration-300 sm:text-2xl ${
                        isActive
                          ? 'translate-x-2 text-white'
                          : 'text-neutral-500'
                      }`}
                      style={{
                        fontVariationSettings:
                          '"opsz" 144, "SOFT" 50, "WONK" 1',
                      }}
                    >
                      {s.title}
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className={`h-4 w-4 shrink-0 self-center transition-all duration-300 ${
                        isActive
                          ? 'translate-x-0 text-amber-300 opacity-100'
                          : '-translate-x-2 opacity-0'
                      }`}
                    />
                  </button>
                </li>
              )
            })}
          </ol>

          <div className="sticky top-24 self-start">
            <article
              key={current.number}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-8 lg:p-10"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-amber-300/[0.08] blur-3xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-32 -left-12 h-64 w-64 rounded-full bg-amber-500/[0.05] blur-3xl"
              />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <p className="text-xs tracking-widest text-amber-300">
                    {current.number} /{' '}
                    {String(services.length).padStart(2, '0')}
                  </p>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">
                    Service
                  </span>
                </div>

                <h3
                  className="mt-6 font-display text-3xl font-semibold leading-[1.1] tracking-tight md:text-4xl lg:text-[2.25rem]"
                  style={{
                    fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1',
                  }}
                >
                  {current.title}
                </h3>

                <div
                  aria-hidden="true"
                  className="mt-6 h-px w-12 bg-amber-300/70"
                />

                <p className="mt-6 text-base leading-relaxed text-neutral-300 lg:text-[17px]">
                  {current.body}
                </p>
              </div>
            </article>
          </div>
        </div>

        {/* Mobile / tablet: stacked list */}
        <div className="mt-12 space-y-5 sm:mt-14 lg:hidden">
          {services.map((s) => (
            <article
              key={s.number}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6"
            >
              <div className="flex items-baseline gap-4">
                <span className="text-xs tabular-nums text-amber-300">
                  {s.number}
                </span>
                <h3
                  className="font-display text-xl font-semibold leading-tight text-white sm:text-2xl"
                  style={{
                    fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1',
                  }}
                >
                  {s.title}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-neutral-400 sm:text-[15px]">
                {s.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
