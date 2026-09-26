import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Shirt,
  Utensils,
  ShoppingBag,
  Lamp,
  Armchair,
  Building2,
  Smile,
  PawPrint,
  Hospital,
  Plane,
  GraduationCap,
  User,
  Eye,
  Hotel,
  ArrowUpRight,
} from 'lucide-react'

const industries = [
  {
    name: 'Clothing & Apparel Brands',
    short: 'Apparel',
    icon: Shirt,
    pitch:
      'Drops, lookbooks and reels that make every collection feel like a moment worth waiting for.',
    focus: ['Collection launches', 'Lookbook shoots', 'Creator collabs'],
  },
  {
    name: 'Restaurants & Food Ventures',
    short: 'Food',
    icon: Utensils,
    pitch:
      'Content that tastes as good as it looks — built to fill tables and keep regulars coming back.',
    focus: ['Menu storytelling', 'Food cinematography', 'Local reach'],
  },
  {
    name: 'Boutiques & Fashion Stores',
    short: 'Boutiques',
    icon: ShoppingBag,
    pitch:
      'A curated, personal voice that turns browsing followers into loyal in-store shoppers.',
    focus: ['New arrivals', 'Styling content', 'Footfall campaigns'],
  },
  {
    name: 'Home Décor & Lifestyle Brands',
    short: 'Home Décor',
    icon: Lamp,
    pitch:
      'Warm, aspirational visuals that help people picture your pieces in their own spaces.',
    focus: ['Styled product shoots', 'Seasonal edits', 'Catalogue content'],
  },
  {
    name: 'Interior Design Studios',
    short: 'Interiors',
    icon: Armchair,
    pitch:
      'Project walkthroughs and before–afters that showcase craft and win high-intent clients.',
    focus: ['Project reels', 'Before & after', 'Designer POV'],
  },
  {
    name: 'Architectural Firms',
    short: 'Architecture',
    icon: Building2,
    pitch:
      'Thoughtful storytelling that brings your design philosophy and built work to life.',
    focus: ['Portfolio films', 'Thought leadership', 'Award submissions'],
  },
  {
    name: 'Dental Clinics',
    short: 'Dental',
    icon: Smile,
    pitch:
      'Friendly, trust-first content that eases anxiety and makes booking the next step feel easy.',
    focus: ['Patient education', 'Smile stories', 'Appointment drives'],
  },
  {
    name: 'Pet Clinics & Pet Care Services',
    short: 'Pet Care',
    icon: PawPrint,
    pitch:
      'Heartwarming, helpful content that pet parents love to share and trust with their family.',
    focus: ['Care tips', 'Community content', 'Service awareness'],
  },
  {
    name: 'Hospitals & Healthcare Practices',
    short: 'Healthcare',
    icon: Hospital,
    pitch:
      'Clear, compassionate communication that builds credibility and reaches the right patients.',
    focus: ['Doctor profiles', 'Health awareness', 'Reputation building'],
  },
  {
    name: 'Tours & Travel Services',
    short: 'Travel',
    icon: Plane,
    pitch:
      'Wanderlust-worthy stories that turn daydreams into bookings and travellers into advocates.',
    focus: ['Destination films', 'Itinerary content', 'Seasonal offers'],
  },
  {
    name: 'Educational Institutions & Training',
    short: 'Education',
    icon: GraduationCap,
    pitch:
      'Content that speaks to students and parents alike — and drives admissions season after season.',
    focus: ['Admission campaigns', 'Campus life', 'Alumni stories'],
  },
  {
    name: 'Personal Branding for Professionals',
    short: 'Personal Brands',
    icon: User,
    pitch:
      'A distinct, authentic voice that positions you as the go-to name in your field.',
    focus: ['Founder content', 'LinkedIn growth', 'Speaking & PR'],
  },
  {
    name: 'Optical Stores & Eye Care',
    short: 'Optical',
    icon: Eye,
    pitch:
      'Style-meets-care content that makes frames feel like fashion and eye tests feel essential.',
    focus: ['Frame styling', 'Eye health awareness', 'Store promotions'],
  },
  {
    name: 'Hotels & Hospitality Businesses',
    short: 'Hospitality',
    icon: Hotel,
    pitch:
      'Immersive visuals that sell the experience long before guests ever check in.',
    focus: ['Property films', 'Guest experiences', 'Direct bookings'],
  },
]

const AUTOPLAY_MS = 4500

const pad = (n) => String(n).padStart(2, '0')

export default function Industries() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [interacted, setInteracted] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const panelRef = useRef(null)
  const tabRefs = useRef([])
  const railRef = useRef(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const autoplay = !paused && !interacted && !reducedMotion

  useEffect(() => {
    if (!autoplay) return
    const id = setTimeout(
      () => setActive((i) => (i + 1) % industries.length),
      AUTOPLAY_MS,
    )
    return () => clearTimeout(id)
  }, [active, autoplay])

  // Keep the active chip visible in the mobile rail without scrolling the page
  useEffect(() => {
    const rail = railRef.current
    const chip = rail?.children[active]
    if (!rail || !chip || rail.offsetParent === null) return
    rail.scrollTo({
      left: chip.offsetLeft - rail.clientWidth / 2 + chip.clientWidth / 2,
      behavior: reducedMotion ? 'auto' : 'smooth',
    })
  }, [active, reducedMotion])

  const select = useCallback((i) => {
    setInteracted(true)
    setActive(i)
  }, [])

  const onKeyDown = (e) => {
    const keys = {
      ArrowDown: 1,
      ArrowRight: 1,
      ArrowUp: -1,
      ArrowLeft: -1,
    }
    let next
    if (e.key in keys) {
      next = (active + keys[e.key] + industries.length) % industries.length
    } else if (e.key === 'Home') {
      next = 0
    } else if (e.key === 'End') {
      next = industries.length - 1
    } else {
      return
    }
    e.preventDefault()
    select(next)
    tabRefs.current[next]?.focus()
  }

  const onPanelMove = (e) => {
    const el = panelRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    el.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  const current = industries[active]
  const Icon = current.icon

  return (
    <section
      aria-labelledby="industries-heading"
      className="relative overflow-hidden bg-neutral-950 text-white"
    >
      {/* Ambient grid backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-neutral-500" />
            <h2
              id="industries-heading"
              className="text-pretty text-sm font-medium leading-relaxed text-neutral-400 sm:text-base md:text-lg"
            >
              Industries We Work With
            </h2>
            <span aria-hidden="true" className="h-px w-8 bg-neutral-500" />
          </div>

          <p className="mt-6 text-base leading-relaxed text-neutral-300 sm:mt-8 sm:text-lg">
            We work with brands across a wide spectrum of industries, each with
            its own personality, audience and communication style. Whether
            it&apos;s fashion, food, healthcare, education or creative fields
            like interiors and architecture, we adapt our strategy and
            storytelling to suit the needs of each business.
          </p>

          <p className="mt-4 text-sm leading-relaxed text-neutral-400 sm:text-base">
            Our approach remains consistent —{' '}
            <span className="text-white">understand the industry deeply</span>,{' '}
            <span className="text-white">
              speak the audience&apos;s language
            </span>{' '}
            and{' '}
            <span className="text-white">
              create content that reflects the essence of the brand
            </span>{' '}
            while delivering measurable impact.
          </p>
        </div>

        <div
          className="mt-14 grid gap-6 sm:mt-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Industry selector */}
          <div className="order-2 lg:order-1">
            {/* Mobile / tablet: horizontal rail */}
            <div
              ref={railRef}
              className="-mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:hidden [&::-webkit-scrollbar]:hidden"
            >
              {industries.map(({ short, icon: ChipIcon }, i) => {
                const isActive = i === active
                return (
                  <button
                    key={short}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => select(i)}
                    className={`inline-flex shrink-0 snap-center items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-all duration-300 sm:text-sm ${
                      isActive
                        ? 'border-white bg-white text-neutral-950'
                        : 'border-white/15 bg-white/[0.03] text-neutral-300 hover:border-white/40'
                    }`}
                  >
                    <ChipIcon
                      aria-hidden="true"
                      strokeWidth={1.8}
                      className="h-3.5 w-3.5"
                    />
                    {short}
                  </button>
                )
              })}
            </div>

            {/* Desktop: vertical index list */}
            <ul
              role="tablist"
              aria-label="Industries"
              aria-orientation="vertical"
              onKeyDown={onKeyDown}
              className="hidden lg:block"
            >
              {industries.map(({ name, icon: RowIcon }, i) => {
                const isActive = i === active
                return (
                  <li
                    role="presentation"
                    key={name}
                    className="border-b border-white/10 first:border-t"
                  >
                    <button
                      ref={(el) => (tabRefs.current[i] = el)}
                      type="button"
                      role="tab"
                      id={`industry-tab-${i}`}
                      aria-selected={isActive}
                      aria-controls="industry-panel"
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => select(i)}
                      onMouseEnter={() => select(i)}
                      onFocus={() => select(i)}
                      className="group relative flex w-full items-center gap-4 py-3 text-left outline-none focus-visible:bg-white/[0.04]"
                    >
                      <span
                        className={`w-6 text-xs tabular-nums transition-colors duration-300 ${
                          isActive ? 'text-white' : 'text-neutral-600'
                        }`}
                      >
                        {pad(i + 1)}
                      </span>
                      <RowIcon
                        aria-hidden="true"
                        strokeWidth={1.6}
                        className={`h-4 w-4 shrink-0 transition-all duration-300 ${
                          isActive
                            ? 'scale-110 text-white'
                            : 'text-neutral-600 group-hover:text-neutral-300'
                        }`}
                      />
                      <span
                        className={`flex-1 text-[15px] font-medium transition-all duration-300 ${
                          isActive
                            ? 'translate-x-1 text-white'
                            : 'text-neutral-500 group-hover:text-neutral-200'
                        }`}
                      >
                        {name}
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        strokeWidth={1.6}
                        className={`h-4 w-4 transition-all duration-300 ${
                          isActive
                            ? 'translate-x-0 opacity-100'
                            : '-translate-x-2 opacity-0'
                        }`}
                      />

                      {/* Autoplay progress */}
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 -bottom-px h-px overflow-hidden"
                      >
                        {isActive && (
                          <span
                            key={`${active}-${autoplay}`}
                            className="block h-full origin-left bg-white"
                            style={
                              autoplay
                                ? {
                                    animation: `industry-progress ${AUTOPLAY_MS}ms linear forwards`,
                                  }
                                : undefined
                            }
                          />
                        )}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Showcase panel */}
          <div
            ref={panelRef}
            id="industry-panel"
            role="tabpanel"
            aria-labelledby={`industry-tab-${active}`}
            aria-live="polite"
            onMouseMove={onPanelMove}
            className="group/panel relative order-1 isolate flex min-h-[340px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-neutral-900 to-black p-6 sm:min-h-[400px] sm:p-10 lg:sticky lg:top-24 lg:order-2 lg:min-h-[520px] lg:self-start"
            style={{
              boxShadow:
                '0 30px 80px -20px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.06)',
            }}
          >
            {/* Cursor spotlight */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover/panel:opacity-100"
              style={{
                background:
                  'radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.09), transparent 60%)',
              }}
            />

            {/* Oversized watermark icon */}
            <Icon
              key={`bg-${active}`}
              aria-hidden="true"
              strokeWidth={0.6}
              className="hero-anim pointer-events-none absolute -bottom-10 -right-10 -z-10 h-64 w-64 text-white/[0.05] sm:h-80 sm:w-80 lg:h-[26rem] lg:w-[26rem]"
              style={{ animation: 'hero-fade 700ms ease-out both' }}
            />

            <div className="flex items-center justify-between text-xs text-neutral-500">
              <span className="tabular-nums">
                <span className="text-white">{pad(active + 1)}</span> /{' '}
                {pad(industries.length)}
              </span>
              <span className="uppercase tracking-[0.2em]">
                {current.short}
              </span>
            </div>

            <div key={active} className="hero-anim mt-auto pt-10">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.04] sm:h-16 sm:w-16"
                style={{ animation: 'hero-rise 600ms ease-out both' }}
              >
                <Icon
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="h-6 w-6 text-white sm:h-7 sm:w-7"
                />
              </div>

              <h3
                className="mt-6 text-balance text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl"
                style={{ animation: 'hero-rise 600ms 60ms ease-out both' }}
              >
                {current.name}
              </h3>

              <p
                className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-neutral-400 sm:text-base"
                style={{ animation: 'hero-rise 600ms 120ms ease-out both' }}
              >
                {current.pitch}
              </p>

              <ul
                role="list"
                className="mt-6 flex flex-wrap gap-2"
                style={{ animation: 'hero-rise 600ms 180ms ease-out both' }}
              >
                {current.focus.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-white/15 bg-white/[0.03] px-3 py-1 text-xs text-neutral-200 sm:text-sm"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile progress dots */}
            <div aria-hidden="true" className="mt-8 flex gap-1 lg:hidden">
              {industries.map((_, i) => (
                <span
                  key={i}
                  className={`h-0.5 flex-1 rounded-full transition-colors duration-300 ${
                    i === active ? 'bg-white' : 'bg-white/15'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
