import {
  Share2,
  Globe2,
  Users,
  Film,
  UserCircle2,
  TrendingUp,
  MapPin,
  Search,
  ArrowUpRight,
} from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Reveal from '@/components/Reveal'
import Halftone from '@/components/Halftone'

const services = [
  {
    n: '01',
    icon: Share2,
    title: 'Social Media Management',
    body: 'Our social media management is built around an Instagram-first approach, supported by platforms such as Facebook, LinkedIn, YouTube, and more. Instead of simply posting a fixed number of creatives every month, we focus on creating strategic content that genuinely supports your goals — whether that’s visibility, consistency, authority or conversions. Our team handles everything from conceptualising ideas and campaigns to crafting the narrative, writing copy, designing visuals, and producing short-form videos. Every piece of content is planned to build brand recall, speak your tone of voice, and keep your audience engaged. We monitor platform behaviours, stay aligned with trends, analyse competitors, and optimise publishing to ensure that your brand remains active, relevant and memorable.',
  },
  {
    n: '02',
    icon: Globe2,
    title: 'Digital Marketing',
    body: 'Our digital marketing service extends your brand beyond social media and positions it across important digital touchpoints. We work with different platforms, digital mediums and aggregator networks to help your content reach the right audience at the right time. Beyond campaigns, we support businesses by refining website messaging, improving communication structure, reviewing UX gaps and strengthening the way products or services are presented. From planning your digital strategy to creating the content needed to support it, we ensure that your online presence is consistent, meaningful and aligned with your larger brand vision.',
  },
  {
    n: '03',
    icon: Users,
    title: 'Influencer Marketing',
    body: 'Our influencer marketing approach focuses on working with micro and mid-level creators who bring genuine relevance to your industry. We don’t simply select influencers and pass on a brief — we ideate the structure of the content, form the communication strategy, and guide influencers to deliver messages that feel authentic, clear and aligned with your brand. Whether it’s food, fashion, lifestyle, clinics, interiors, décor, construction or education, we collaborate with influencers whose audiences truly match your customers. We coordinate the entire process end-to-end, ensuring the final output is natural, engaging and strategically valuable.',
  },
  {
    n: '04',
    icon: Film,
    title: 'Video Production',
    body: 'Video production is one of our strongest specialisations at Hiwaga Makers. With a full in-house team and our own equipment centre, we are able to produce high-quality visual content with complete creative control. Our team handles everything from script development and concept design to filming, direction, cinematography and editing. We create brand films, advertisements, product videos, interior walkthroughs, corporate videos, storytelling content, testimonial films, food videos, social media reels and more. Because everything is in-house, we maintain consistency, speed, flexibility and control over the creative output. For every brand, video becomes a tool to express identity, convey emotion, capture attention and establish long-term recall — which is exactly why it remains at the heart of our work.',
  },
  {
    n: '05',
    icon: UserCircle2,
    title: 'Personal Branding',
    body: 'We help professionals such as doctors, entrepreneurs, consultants and creators build a strong and credible digital presence across platforms like LinkedIn, Instagram, YouTube and Facebook. Personal branding is not just about regular updates — it is about positioning. Our approach involves understanding your expertise, defining your voice, shaping your narrative, and creating meaningful content that reflects your personality and professional values. From shaping thought-leadership posts to producing personal branding videos and managing overall consistency, we help individuals create an online identity that feels genuine, authoritative and approachable.',
  },
  {
    n: '06',
    icon: TrendingUp,
    title: 'Performance Marketing',
    body: 'Our performance marketing service focuses on measurable outcomes rather than inflated numbers or vanity metrics. We manage paid campaigns across Meta, Google, YouTube, LinkedIn and other networks. Before running any ads, we define the true objective — whether it is leads, awareness, reach, walk-ins, or conversions — and plan the entire structure around it. We create ad-specific visuals and videos, manage the budgets smartly, monitor performance regularly and optimise the campaigns to ensure the best possible results. Our reporting is transparent, straightforward and built to help you understand what is working and why.',
  },
  {
    n: '07',
    icon: MapPin,
    title: 'OOH (Out-of-Home) Campaigns',
    body: 'For select clients, we support Outdoor Advertising campaigns that complement their digital presence. From creative concepts and messaging to location suggestions and coordination, we ensure that every OOH campaign aligns with your ongoing branding strategy. Outdoor branding becomes an extension of your digital communication rather than an isolated initiative. This integration ensures consistency in visual identity, tone and message — helping your brand capture attention across both physical and digital spaces.',
  },
  {
    n: '08',
    icon: Search,
    title: 'SEO (Search Engine Optimization)',
    body: 'Our SEO approach is practical, purpose-driven and designed to support your long-term discoverability. We help brands strengthen search presence by offering strategic guidance on content, structure and website clarity. From identifying relevant keywords and improving on-page communication to recommending technical enhancements and shaping blog or landing page content, we ensure that your brand is easier to find, easier to understand and easier to trust. Our focus stays on improving your search visibility and supporting the broader narrative of your business across all digital platforms.',
  },
]

function ServiceRow({ service, index }) {
  const Icon = service.icon
  const flip = index % 2 === 1

  return (
    <article className="group relative overflow-hidden py-16 sm:py-20 lg:py-28">
      {/* Huge faded icon watermark in the background */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 hidden items-center lg:flex ${
          flip ? 'right-0 justify-end pr-4' : 'left-0 justify-start pl-4'
        }`}
      >
        <Icon
          strokeWidth={0.6}
          className="h-[26rem] w-[26rem] text-white/[0.03] transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>

      <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
        {/* Side A — oversized number + icon badge */}
        <div
          className={`relative lg:col-span-5 ${
            flip ? 'lg:order-2 lg:text-right' : 'lg:order-1'
          }`}
        >
          <span
            aria-hidden="true"
            className="block font-display text-[7rem] font-medium leading-[0.85] tracking-tight text-[#FFD700] sm:text-[9rem] lg:text-[11rem]"
            style={{
              fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1',
            }}
          >
            {service.n}
          </span>

          <div
            className={`mt-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.04] backdrop-blur sm:h-16 sm:w-16 ${
              flip ? 'lg:ml-auto' : ''
            }`}
          >
            <Icon
              aria-hidden="true"
              strokeWidth={1.4}
              className="h-6 w-6 text-[#FFD700] sm:h-7 sm:w-7"
            />
          </div>
        </div>

        {/* Side B — title + body */}
        <div className={`lg:col-span-7 ${flip ? 'lg:order-1' : 'lg:order-2'}`}>
          <h3
            className="font-display text-3xl font-medium leading-[1.05] tracking-tight sm:text-4xl md:text-5xl lg:text-[2.75rem]"
            style={{
              fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1',
            }}
          >
            {service.title}
          </h3>

          <div
            aria-hidden="true"
            className="mt-5 h-px w-12 bg-[#FFD700]/70 transition-all duration-500 group-hover:w-24 sm:mt-6"
          />

          <p className="mt-6 text-sm leading-relaxed text-neutral-300 sm:mt-7 sm:text-base lg:text-[17px] lg:leading-[1.75]">
            {service.body}
          </p>
        </div>
      </div>
    </article>
  )
}

export default function Services() {
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
                <span className="text-white">Our</span>{' '}
                <span className="text-[#FFD700]">Services</span>
                <span className="text-[#FFD700]/50">.</span>
              </h1>

              <div
                aria-hidden="true"
                className="mx-auto mt-10 h-px w-20 bg-white/20 sm:mt-12"
              />
            </div>
          </div>
        </section>

        {/* Intro */}
        <section
          aria-labelledby="services-intro"
          className="bg-neutral-950 text-white"
        >
          <h2 id="services-intro" className="sr-only">
            Services overview
          </h2>
          <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
            <Reveal>
              <p className="text-base leading-relaxed text-neutral-300 sm:text-lg sm:leading-[1.65] lg:text-[19px]">
                At <span className="text-white">Hiwaga Makers</span>, our
                services are built on a simple truth — brands don&apos;t grow
                through random content; they grow through{' '}
                <span className="text-white">clarity</span>,{' '}
                <span className="text-white">consistency</span> and{' '}
                <span className="text-white">meaningful communication</span>.
                Every service we offer is designed as part of a bigger ecosystem
                that supports your goals — whether you want awareness,
                authority, engagement, footfalls or conversions. From social
                media and digital marketing to personal branding, performance
                campaigns, influencer collaboration and high-end video
                production, we approach every project as{' '}
                <span className="text-[#FFD700]">strategic partners</span>, not
                task handlers. We analyse your brand, study your audience,
                refine the narrative and craft creative work that moves both
                people and business. With Hiwaga, marketing stops being a
                checklist and becomes a guided journey toward long-term brand
                growth.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Services list */}
        <section
          aria-labelledby="services-list"
          className="bg-neutral-950 text-white"
        >
          <h2 id="services-list" className="sr-only">
            Our services
          </h2>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ul role="list" className="divide-y divide-white/10">
              {services.map((s, i) => (
                <li key={s.n}>
                  <Reveal delay={i % 2 === 0 ? 0 : 80}>
                    <ServiceRow service={s} index={i} />
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Why work with us — closing CTA */}
        <section
          aria-labelledby="why-heading"
          className="bg-neutral-950 text-white"
        >
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
            <Reveal>
              <div className="relative isolate overflow-hidden rounded-3xl bg-black px-6 py-20 ring-1 ring-white/10 sm:px-12 sm:py-24 lg:px-16 lg:py-28">
                {/* Flowing curves background */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 1600 800"
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
                >
                  <defs>
                    <linearGradient
                      id="curveStrokeTop"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="rgba(180, 180, 220, 0.22)" />
                      <stop
                        offset="50%"
                        stopColor="rgba(255, 255, 255, 0.06)"
                      />
                      <stop offset="100%" stopColor="rgba(255, 215, 0, 0.28)" />
                    </linearGradient>
                    <linearGradient
                      id="curveStrokeBottom"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="rgba(180, 180, 220, 0.18)" />
                      <stop
                        offset="50%"
                        stopColor="rgba(255, 255, 255, 0.05)"
                      />
                      <stop offset="100%" stopColor="rgba(255, 215, 0, 0.24)" />
                    </linearGradient>
                  </defs>

                  {/* Top half — curves bowing downward toward center */}
                  {Array.from({ length: 4 }).map((_, i) => {
                    const y = 40 + i * 50
                    return (
                      <path
                        key={`t-${i}`}
                        d={`M 0 ${y} Q 800 ${y + 280 + i * 20} 1600 ${y}`}
                        fill="none"
                        stroke="url(#curveStrokeTop)"
                        strokeWidth="1"
                      />
                    )
                  })}

                  {/* Bottom half — curves bowing upward toward center */}
                  {Array.from({ length: 3 }).map((_, i) => {
                    const y = 760 - i * 50
                    return (
                      <path
                        key={`b-${i}`}
                        d={`M 0 ${y} Q 800 ${y - 280 - i * 20} 1600 ${y}`}
                        fill="none"
                        stroke="url(#curveStrokeBottom)"
                        strokeWidth="1"
                      />
                    )
                  })}
                </svg>

                {/* Central radial glow — soft and subtle */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-10 m-auto h-[24rem] w-[36rem] max-w-full rounded-full bg-[#FFD700]/[0.03] blur-3xl"
                />

                <div className="relative mx-auto max-w-3xl text-center">
                  <h3
                    id="why-heading"
                    className="mt-6 font-display text-3xl font-medium leading-[1.05] tracking-tight sm:mt-8 sm:text-4xl md:text-5xl lg:text-[3.25rem]"
                    style={{
                      fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1',
                    }}
                  >
                    Why work <span className="text-[#FFD700]">with us</span>.
                  </h3>

                  <p className="mx-auto mt-8 max-w-2xl text-sm leading-relaxed text-neutral-300 sm:mt-10 sm:text-base sm:leading-[1.7] lg:text-[17px]">
                    Choosing <span className="text-white">Hiwaga Makers</span>{' '}
                    means choosing a team that treats your brand with{' '}
                    <span className="text-white">intention</span>,{' '}
                    <span className="text-white">honesty</span> and{' '}
                    <span className="text-white">creative responsibility</span>.
                    We combine{' '}
                    <span className="text-[#FFD700]">
                      strategy with storytelling
                    </span>
                    , and pair{' '}
                    <span className="text-[#FFD700]">
                      creativity with performance
                    </span>{' '}
                    — working like an extension of your brand, not an external
                    vendor.
                  </p>

                  <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-neutral-400 sm:text-base sm:leading-[1.7]">
                    We&apos;re not here to impress you temporarily — we&apos;re
                    here to build your brand meaningfully.
                  </p>

                  <a
                    href="mailto:hiwagamakers@gmail.com"
                    className="group mt-10 inline-flex items-center gap-2 rounded-full bg-[#FFD700] px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-neutral-900 transition-all duration-300 hover:bg-[#FFE57A] sm:mt-12 sm:px-7 sm:py-4 sm:text-[13px]"
                  >
                    Start a conversation
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
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
