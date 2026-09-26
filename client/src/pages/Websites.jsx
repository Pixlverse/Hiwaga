import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Lock, MapPin } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Seo from '@/components/Seo'
import { pageSeo } from '@/data/seo'
import Footer from '@/components/layout/Footer'
import Reveal from '@/components/Reveal'
import Halftone from '@/components/Halftone'
import { websites } from '@/data/websites'

// Screenshot inside a minimal browser frame. Tilts toward the cursor.
function BrowserMockup({ site }) {
  const ref = useRef(null)

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 7).toFixed(2)}deg)`
  }

  const reset = () => {
    if (ref.current) ref.current.style.transform = 'rotateX(0deg) rotateY(0deg)'
  }

  return (
    <a
      href={site.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${site.name} (${site.domain}) in a new tab`}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      className="group relative block [perspective:1400px] focus-visible:outline-none"
    >
      {/* glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-6 -bottom-8 top-1/3 rounded-[2rem] opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-80"
        style={{
          background:
            'radial-gradient(60% 60% at 50% 60%, rgba(255,215,0,0.28), transparent 70%)',
        }}
      />

      <div
        ref={ref}
        className="relative overflow-hidden rounded-xl border border-white/10 bg-neutral-900 shadow-2xl shadow-black/60 ring-1 ring-black/40 transition-transform duration-300 ease-out will-change-transform group-focus-visible:ring-2 group-focus-visible:ring-[#FFD700] sm:rounded-2xl"
      >
        {/* window chrome */}
        <div className="flex h-8 items-center gap-3 border-b border-white/[0.06] bg-neutral-900 px-3 sm:h-10 sm:px-4">
          <div aria-hidden="true" className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          </div>
          <div className="mx-auto flex min-w-0 items-center gap-1.5 rounded-md bg-white/[0.05] px-3 py-1 text-[10px] text-neutral-400 sm:w-64 sm:justify-center sm:text-xs">
            <Lock aria-hidden="true" className="h-3 w-3 shrink-0 text-neutral-500" />
            <span className="truncate">{site.domain}</span>
          </div>
          <div aria-hidden="true" className="hidden w-[42px] sm:block" />
        </div>

        <div className="relative aspect-[2880/1494] overflow-hidden bg-neutral-950">
          <img
            src={site.image}
            alt={site.alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
          />
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-[#FFD700] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-900 opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 sm:bottom-4 sm:right-4">
            Visit site
            <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </a>
  )
}

function SiteRow({ site, index }) {
  const flip = index % 2 === 1
  const number = String(index + 1).padStart(2, '0')

  return (
    <article
      aria-labelledby={`${site.slug}-title`}
      className="grid grid-cols-1 items-center gap-10 py-14 sm:py-20 lg:grid-cols-12 lg:gap-14 lg:py-24"
    >
      <div className={`lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}>
        <BrowserMockup site={site} />
      </div>

      <div className={`lg:col-span-5 ${flip ? 'lg:order-1' : ''}`}>
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold tabular-nums text-[#FFD700]">
            {number}
          </span>
          <span aria-hidden="true" className="h-px flex-1 bg-white/10" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-neutral-500">
            {site.category}
          </span>
        </div>

        <h2
          id={`${site.slug}-title`}
          className="mt-6 font-display text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-4xl"
        >
          {site.name}
        </h2>

        <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-neutral-400">
          <MapPin aria-hidden="true" className="h-3.5 w-3.5 text-[#FFD700]/80" />
          {site.location}
        </p>

        <p className="mt-6 text-base leading-relaxed text-neutral-300">
          {site.description}
        </p>

        <a
          href={site.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-8 inline-flex items-center gap-2 border-b border-[#FFD700]/40 pb-1 text-sm font-medium text-white transition-colors hover:border-[#FFD700] hover:text-[#FFD700]"
        >
          {site.domain}
          <ArrowUpRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
      </div>
    </article>
  )
}

export default function Websites() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Navbar />
      <Seo {...pageSeo['/websites']} path="/websites" />
      <main>
        {/* Page hero */}
        <section
          aria-labelledby="websites-hero"
          className="relative isolate overflow-hidden bg-neutral-950 text-white"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-32 -z-10 mx-auto h-96 max-w-3xl opacity-40 blur-3xl"
            style={{
              background:
                'radial-gradient(closest-side, rgba(255,215,0,0.18), rgba(255,215,0,0) 70%)',
            }}
          />
          <Halftone />
          <div className="mx-auto max-w-7xl px-4 pb-10 pt-24 sm:px-6 sm:pb-12 sm:pt-32 lg:px-8 lg:pt-36">
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
                Website &amp; App Development
              </p>
              <h1
                id="websites-hero"
                className="mt-6 font-display text-5xl font-medium leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-[4.5rem]"
              >
                <span className="text-white">Websites</span>{' '}
                <span className="text-[#FFD700]">we&rsquo;ve built</span>
                <span className="text-[#FFD700]/50">.</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-pretty text-sm leading-relaxed text-neutral-400 sm:text-base">
                Fast, search-friendly websites shaped around each brand&rsquo;s
                story — built to turn visitors into customers.
              </p>
              <div
                aria-hidden="true"
                className="mx-auto mt-10 h-px w-20 bg-white/20 sm:mt-12"
              />
            </div>
          </div>
        </section>

        {/* Projects */}
        <section aria-label="Website projects" className="bg-neutral-950">
          <div className="mx-auto max-w-7xl divide-y divide-white/[0.06] px-4 sm:px-6 lg:px-8">
            {websites.map((site, i) => (
              <Reveal key={site.slug}>
                <SiteRow site={site} index={i} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section aria-labelledby="websites-cta" className="bg-neutral-950 pb-20 sm:pb-28">
          <Reveal>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent px-6 py-14 text-center sm:px-12 sm:py-16">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-[#FFD700]/[0.08] blur-3xl"
                />
                <h2
                  id="websites-cta"
                  className="relative font-display text-3xl font-semibold tracking-tight sm:text-4xl"
                >
                  Have a website or app in mind<span className="text-[#FFD700]">?</span>
                </h2>
                <p className="relative mx-auto mt-4 max-w-xl text-sm leading-relaxed text-neutral-400 sm:text-base">
                  Tell us what you&rsquo;re building. We&rsquo;ll plan it, design it
                  and ship it — with the marketing to back it up.
                </p>
                <Link
                  to="/contact"
                  className="group relative mt-8 inline-flex h-12 items-center gap-2 rounded-lg bg-[#FFD700] px-6 text-sm font-semibold text-neutral-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#FFE57A]"
                >
                  Start a project
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </div>
  )
}
