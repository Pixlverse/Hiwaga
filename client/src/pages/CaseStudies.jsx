import { ArrowUpRight, ArrowDown } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Reveal from '@/components/Reveal'
import { caseStudies } from '@/data/caseStudies'

function pad(n) {
  return String(n).padStart(2, '0')
}

function StudyBlock({ study, index }) {
  const reversed = index % 2 === 1
  const number = pad(index + 1)

  return (
    <article
      id={study.slug}
      aria-labelledby={`${study.slug}-heading`}
      className="relative scroll-mt-28 border-t border-white/10 py-16 sm:py-20 lg:py-24"
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
        {/* Image */}
        <div
          className={`lg:col-span-6 ${reversed ? 'lg:order-2' : 'lg:order-1'}`}
        >
          <Reveal>
            <div className="relative">
              <div
                aria-hidden="true"
                className={`absolute -inset-x-2 -inset-y-2 -z-10 rounded-3xl bg-[#FFD700]/[0.06] blur-2xl ${
                  reversed ? 'translate-x-3' : '-translate-x-3'
                }`}
              />
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)] ring-1 ring-white/5">
                <div className="aspect-[4/5] w-full overflow-hidden sm:aspect-[4/3]">
                  <img
                    src={study.image}
                    alt={study.alt}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* Floating stat callout */}
              {study.stat && (
                <div
                  className={`absolute -bottom-5 hidden items-end gap-3 rounded-2xl border border-[#FFD700]/30 bg-neutral-950/90 px-5 py-4 shadow-2xl backdrop-blur-sm sm:flex ${
                    reversed ? 'right-4' : 'left-4'
                  }`}
                >
                  <span
                    className="font-display text-3xl font-semibold leading-none text-[#FFD700] sm:text-4xl lg:text-5xl"
                    style={{
                      fontVariationSettings:
                        '"opsz" 144, "SOFT" 50, "WONK" 1',
                    }}
                  >
                    {study.stat.value}
                  </span>
                  <span className="pb-1 text-[10px] font-medium uppercase tracking-widest text-neutral-300 sm:text-[11px]">
                    {study.stat.label}
                  </span>
                </div>
              )}
            </div>
          </Reveal>
        </div>

        {/* Text */}
        <div
          className={`lg:col-span-6 ${reversed ? 'lg:order-1' : 'lg:order-2'}`}
        >
          <Reveal delay={120}>
            <div className="flex items-baseline gap-3">
              <span
                className="font-display text-sm font-medium tracking-widest text-[#FFD700]/90"
                aria-hidden="true"
              >
                {number}
              </span>
              <span
                aria-hidden="true"
                className="h-px w-12 self-center bg-[#FFD700]/40"
              />
              <span className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 sm:text-xs">
                {study.industry}
              </span>
            </div>

            <h2
              id={`${study.slug}-heading`}
              className="mt-5 font-display text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl lg:text-[2.75rem]"
              style={{
                fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1',
              }}
            >
              {study.headline}
            </h2>

            {/* Mobile stat (inline) */}
            {study.stat && (
              <div className="mt-6 inline-flex items-baseline gap-3 rounded-xl border border-[#FFD700]/30 bg-[#FFD700]/[0.06] px-4 py-3 sm:hidden">
                <span
                  className="font-display text-3xl font-semibold leading-none text-[#FFD700]"
                  style={{
                    fontVariationSettings:
                      '"opsz" 144, "SOFT" 50, "WONK" 1',
                  }}
                >
                  {study.stat.value}
                </span>
                <span className="text-[10px] font-medium uppercase tracking-widest text-neutral-300">
                  {study.stat.label}
                </span>
              </div>
            )}

            <div className="mt-7 space-y-5 text-base leading-relaxed text-neutral-300 sm:mt-8 sm:text-lg sm:leading-[1.7]">
              {study.body.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </article>
  )
}

export default function CaseStudies() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Navbar />
      <main>
        {/* Hero */}
        <section
          aria-labelledby="page-title"
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

          <div className="mx-auto max-w-7xl px-4 pb-12 pt-24 sm:px-6 sm:pb-16 sm:pt-32 lg:px-8 lg:pt-36">
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#FFD700]/90 sm:text-xs">
                — Client Impact
              </p>

              <h1
                id="page-title"
                className="mt-6 font-display text-5xl font-medium leading-[0.95] tracking-tight sm:mt-8 sm:text-6xl md:text-7xl lg:text-[5.25rem]"
                style={{
                  fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1',
                }}
              >
                <span className="text-white">Client Impact</span>{' '}
                <span className="text-[#FFD700]">Stories</span>
                <span className="text-[#FFD700]/50">.</span>
              </h1>

              <div
                aria-hidden="true"
                className="mx-auto mt-10 h-px w-20 bg-white/20 sm:mt-12"
              />

              <p className="mx-auto mt-10 max-w-2xl text-base leading-relaxed text-neutral-300 sm:text-lg sm:leading-[1.7]">
                When you understand a brand deeply, the impact becomes visible.
                These stories reflect how the right communication, consistent
                effort and purposeful storytelling can transform how people
                see, engage with and trust a brand.
              </p>

              <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-[11px] font-medium uppercase tracking-widest text-neutral-300">
                <ArrowDown
                  aria-hidden="true"
                  className="h-3 w-3 text-[#FFD700]"
                  strokeWidth={2}
                />
                {caseStudies.length} case studies
              </div>
            </div>
          </div>
        </section>

        {/* Studies — index + alternating editorial blocks */}
        <section
          aria-labelledby="studies-heading"
          className="bg-neutral-950 text-white"
        >
          <h2 id="studies-heading" className="sr-only">
            Case studies
          </h2>

          <div className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 sm:pb-28 lg:px-8 lg:pb-32">
            {caseStudies.map((s, i) => (
              <StudyBlock key={s.slug} study={s} index={i} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-neutral-950 text-white">
          <div className="mx-auto max-w-5xl px-4 pb-24 sm:px-6 sm:pb-28 lg:px-8 lg:pb-32">
            <Reveal>
              <div className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-[#FFD700]/[0.08] via-neutral-900 to-black px-6 py-12 text-center ring-1 ring-[#FFD700]/25 sm:px-12 sm:py-16">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-32 -top-32 -z-10 h-80 w-80 rounded-full bg-[#FFD700]/[0.10] blur-3xl"
                />

                <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#FFD700]/90 sm:text-xs">
                  — Your story next?
                </p>

                <h2
                  className="mt-5 font-display text-3xl font-medium leading-[1.05] tracking-tight sm:mt-6 sm:text-4xl md:text-5xl"
                  style={{
                    fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1',
                  }}
                >
                  Let&apos;s build the next{' '}
                  <span className="text-[#FFD700]">impact story</span>.
                </h2>

                <a
                  href="https://forms.gle/RnJuBVvgYSaiaun18"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-10 inline-flex items-center gap-2 rounded-full bg-[#FFD700] px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-neutral-900 transition-all duration-300 hover:bg-[#FFE57A] hover:shadow-[0_10px_30px_-10px_rgba(255,215,0,0.5)] sm:px-7 sm:py-4 sm:text-[13px]"
                >
                  Get your free strategy call
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
