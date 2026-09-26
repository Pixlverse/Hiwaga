import { useRef } from 'react'
import { ArrowRight, Phone } from 'lucide-react'

const LINES = [
  { lead: 'Purposefully', key: 'Creative' },
  { lead: 'Strategically', key: 'Curious' },
  { lead: 'Consistently', key: 'Impactful' },
]

const SERVICES = [
  'Social Media Management',
  'Digital Marketing',
  'Influencer Marketing',
  'Video Production',
  'Personal Branding',
  'Performance Marketing',
  'OOH Campaigns',
  'SEO',
  'Website & App Development',
]

const EASE = 'cubic-bezier(0.16,1,0.3,1)'

// Concentric glowing bands — reads as the rim of a huge lit sphere.
const ARC_BG = [
  'radial-gradient(circle at center,',
  'transparent 0 54%,',
  'rgba(255,215,0,0.04) 56%,',
  'rgba(255,205,0,0.55) 62.5%,',
  'rgba(255,215,0,0.10) 64%,',
  'rgba(255,215,0,0.02) 65.5%,',
  'rgba(255,200,0,0.30) 69.5%,',
  'rgba(255,215,0,0.05) 71%,',
  'rgba(255,215,0,0.14) 75%,',
  'transparent 80%)',
].join(' ')

function Arc({ side, ready }) {
  const left = side === 'left'
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute top-[38%] h-[70rem] w-[70rem] sm:top-[30%] ${
        left
          ? '-left-[58rem] sm:-left-[52rem] lg:-left-[46rem]'
          : '-right-[58rem] sm:-right-[52rem] lg:-right-[46rem]'
      }`}
      style={{
        transform: `translate3d(calc(var(--px) * ${left ? 14 : -14}px), calc(var(--py) * 10px), 0)`,
        transition: 'transform 900ms ease-out',
      }}
    >
      <div
        className="h-full w-full rounded-full"
        style={{
          background: ARC_BG,
          filter: 'blur(1.5px)',
          opacity: 0.85,
          ...(ready
            ? {
                animation: `hero-fade 1600ms ${EASE} 200ms both, hero-drift-${side} 14s ease-in-out 1.8s infinite`,
              }
            : { opacity: 0 }),
        }}
      />
    </div>
  )
}

export default function Hero({ ready = true }) {
  const ref = useRef(null)
  const frame = useRef(0)

  // Pointer position → CSS vars (no re-renders) for a gentle parallax.
  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--px', `${((e.clientX - r.left) / r.width - 0.5) * 2}`)
      el.style.setProperty('--py', `${((e.clientY - r.top) / r.height - 0.5) * 2}`)
    })
  }

  const enter = (delay, name = 'hero-rise', dur = 1100) =>
    ready
      ? { animation: `${name} ${dur}ms ${EASE} ${delay}ms both` }
      : { opacity: 0 }

  const chipMask =
    'linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent)'

  return (
    <section
      ref={ref}
      aria-labelledby="hero-heading"
      onPointerMove={handleMove}
      className="hero-anim relative isolate flex min-h-[min(calc(100svh-4.5rem),860px)] items-center overflow-hidden bg-[#070707] font-hero text-white"
      style={{ '--px': 0, '--py': 0 }}
    >
      {/* ---------- Background ---------- */}

      {/* Spotlight falling from the top */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(38% 55% at 50% -8%, rgba(255,215,0,0.30), rgba(255,190,0,0.10) 45%, transparent 75%)',
          ...(ready
            ? { animation: 'hero-fade 1400ms ease both, hero-breathe 7s ease-in-out 1.4s infinite' }
            : { opacity: 0 }),
        }}
      />

      <div className="absolute inset-0 -z-10">
        <Arc side="left" ready={ready} />
        <Arc side="right" ready={ready} />
      </div>

      {/* Fade into the next section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-neutral-950"
      />

      {/* ---------- Content ---------- */}
      <div className="relative w-full px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <div style={enter(0)}>
            <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[10px] font-medium uppercase tracking-[0.26em] text-neutral-300 sm:gap-x-4 sm:text-xs">
              <span
                aria-hidden="true"
                className="hidden h-px w-14 bg-gradient-to-r from-transparent to-[#FFD700]/60 sm:block"
              />
              {['Clear strategy.', 'Powerful stories.', 'Marketing that delivers.'].map(
                (t, i) => (
                  <span key={t} className="flex items-center gap-3 sm:gap-4">
                    {i > 0 && (
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 10 10"
                        className="h-2 w-2 fill-[#FFD700]"
                      >
                        <path d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4 Z" />
                      </svg>
                    )}
                    <span className={i === 1 ? 'text-[#FFD700]' : ''}>{t}</span>
                  </span>
                ),
              )}
              <span
                aria-hidden="true"
                className="hidden h-px w-14 bg-gradient-to-l from-transparent to-[#FFD700]/60 sm:block"
              />
            </p>
            <p className="mt-3 text-sm text-neutral-500">
              We bring it all together.
            </p>
          </div>

          <h1
            id="hero-heading"
            className="mt-9 text-balance text-[1.8rem] font-bold leading-[1.3] min-[400px]:text-[2rem] tracking-[-0.035em] sm:text-5xl md:text-6xl lg:text-[4.1rem]"
          >
            {LINES.map((l, i) => (
              <span
                key={l.key}
                className="group block cursor-default [&:not(:first-child)]:mt-1 sm:[&:not(:first-child)]:mt-2"
                style={enter(150 + i * 120)}
              >
                <span className="bg-gradient-to-b from-white to-white/65 bg-clip-text text-transparent">
                  {l.lead}
                </span>{' '}
                <span
                  className="bg-clip-text text-transparent group-hover:[animation:hero-shine_1.4s_ease-out]"
                  style={{
                    backgroundImage:
                      'linear-gradient(100deg, #FFD700 42%, #FFF3B0 50%, #FFD700 58%)',
                    backgroundSize: '250% 100%',
                    backgroundPosition: '100% 0',
                  }}
                >
                  {l.key}
                </span>
                <span className="text-[#FFD700]/40">.</span>
              </span>
            ))}
          </h1>

          <p
            className="mx-auto mt-8 max-w-xl text-pretty text-sm leading-relaxed text-neutral-400 sm:text-base"
            style={enter(560)}
          >
            We craft stories, visuals and videos that make your brand feel
            clearer, stronger and unmistakably yours.
          </p>

          <div
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
            style={enter(680)}
          >
            <a
              href="https://forms.gle/RnJuBVvgYSaiaun18"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-12 items-center gap-2 rounded-lg px-6 text-sm font-semibold text-neutral-950 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700] focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
              style={{
                background: 'linear-gradient(180deg, #FFE98A 0%, #FFD700 45%, #E8BF00 100%)',
                boxShadow:
                  'inset 0 1px 0 rgba(255,255,255,0.65), inset 0 -2px 0 rgba(0,0,0,0.12), 0 0 0 1px rgba(255,215,0,0.55), 0 10px 32px -10px rgba(255,215,0,0.7)',
              }}
            >
              Get Your Free Strategy Call
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              />
            </a>

            <a
              href="tel:+919447853656"
              aria-label="Call us at +91 94478 53656"
              className="inline-flex h-12 items-center gap-2 rounded-lg bg-white/[0.06] px-6 text-sm font-medium text-white/90 ring-1 ring-inset ring-white/10 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700] focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
            >
              <Phone aria-hidden="true" className="h-4 w-4 text-[#FFD700]" />
              Call / WhatsApp
            </a>
          </div>

          {/* Services chips */}
          <div
            className="mx-auto mt-10 flex max-w-2xl overflow-hidden"
            style={{
              maskImage: chipMask,
              WebkitMaskImage: chipMask,
              ...enter(820, 'hero-fade', 900),
            }}
          >
            <ul
              aria-label="Our services"
              className="flex shrink-0 animate-[hero-marquee_40s_linear_infinite] gap-2 pr-2 hover:[animation-play-state:paused]"
            >
              {[...SERVICES, ...SERVICES].map((s, i) => (
                <li
                  key={i}
                  aria-hidden={i >= SERVICES.length}
                  className="flex items-center gap-2 whitespace-nowrap rounded-md border border-white/[0.08] bg-neutral-900/80 px-3 py-1.5 text-xs text-neutral-300"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 10 10"
                    className="h-2.5 w-2.5 fill-[#FFD700]"
                  >
                    <path d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4 Z" />
                  </svg>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
