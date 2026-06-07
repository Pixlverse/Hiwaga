import { useEffect, useState } from 'react'
import { Download, FileText } from 'lucide-react'
import Reveal from '@/components/Reveal'
import publicApi from '@/lib/publicApi'

const FALLBACK_REEL_ID = 'DUdHNZfE_rw'

function getReelId(work) {
  if (work?.reelId) return work.reelId
  const m = String(work?.url || '').match(/(?:reel|p)\/([^/?]+)/)
  return m ? m[1] : null
}

export default function PortfolioCTA() {
  const [reelId, setReelId] = useState(FALLBACK_REEL_ID)

  useEffect(() => {
    let alive = true
    publicApi
      .get('/works')
      .then(({ data }) => {
        if (!alive) return
        const featured = (data.data || []).find((w) => w.featured)
        const id = getReelId(featured)
        if (id) setReelId(id)
      })
      .catch(() => {
        /* keep fallback */
      })
    return () => {
      alive = false
    }
  }, [])

  return (
    <section
      aria-labelledby="portfolio-cta-heading"
      className="bg-neutral-950 text-white"
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-[#FFD700]/[0.08] via-neutral-900 to-black px-6 py-14 ring-1 ring-[#FFD700]/25 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-32 -top-32 -z-10 h-96 w-96 rounded-full bg-[#FFD700]/[0.10] blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-32 -left-32 -z-10 h-80 w-80 rounded-full bg-[#FFD700]/[0.07] blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-px bg-gradient-to-b from-transparent via-[#FFD700]/40 to-transparent"
            />

            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
              {/* Left — text */}
              <div className="lg:col-span-7">
                <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#FFD700]/90 sm:text-xs">
                  — Portfolio
                </p>

                <h2
                  id="portfolio-cta-heading"
                  className="mt-5 font-display text-3xl font-medium leading-[1.05] tracking-tight sm:mt-6 sm:text-4xl md:text-5xl lg:text-[2.75rem]"
                  style={{
                    fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1',
                  }}
                >
                  Take our work{' '}
                  <span className="text-[#FFD700]">home with you</span>.
                </h2>

                <p className="mt-5 max-w-xl text-sm leading-relaxed text-neutral-300 sm:mt-6 sm:text-base lg:text-[17px] lg:leading-[1.6]">
                  A curated walk-through of our recent campaigns, brand work,
                  and films — packaged for easy sharing with your team.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-4">
                  <a
                    href="/Hiwaga-Makers-Portfolio.pdf"
                    download="Hiwaga-Makers-Portfolio.pdf"
                    className="group inline-flex items-center gap-2.5 rounded-full bg-[#FFD700] px-5 py-3.5 text-xs font-semibold uppercase tracking-widest text-neutral-900 transition-all duration-300 hover:bg-[#FFE57A] hover:shadow-[0_10px_30px_-10px_rgba(255,215,0,0.5)] sm:px-6 sm:py-4 sm:text-[13px]"
                  >
                    <Download
                      aria-hidden="true"
                      strokeWidth={2}
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
                    />
                    Download Portfolio
                  </a>

                  <a
                    href="/Hiwaga-Makers-Portfolio.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-5 py-3.5 text-xs font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:border-white/40 hover:bg-white/[0.08] sm:px-6 sm:py-4 sm:text-[13px]"
                  >
                    View Online
                  </a>
                </div>

                <div className="mt-6 flex items-center gap-4 text-xs text-neutral-500 sm:mt-7 sm:text-[13px]">
                  <span className="inline-flex items-center gap-1.5">
                    <FileText
                      aria-hidden="true"
                      className="h-3.5 w-3.5"
                      strokeWidth={1.6}
                    />
                    PDF
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>~18 MB</span>
                  <span aria-hidden="true">·</span>
                  <span>Latest edition</span>
                </div>
              </div>

              {/* Right — showreel */}
              <div className="lg:col-span-5">
                <div className="relative mx-auto max-w-sm">
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-4 top-4 -z-10 h-full rounded-2xl border border-white/10 bg-neutral-900/80 opacity-60 blur-[1px]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-2 top-2 -z-10 h-full rounded-2xl border border-white/10 bg-neutral-900/90 opacity-80"
                  />

                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-[#FFD700]/30 bg-black shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]">
                    <iframe
                      src={`https://www.instagram.com/reel/${reelId}/embed/`}
                      title="Hiwaga Makers — Showreel"
                      loading="lazy"
                      allow="encrypted-media; clipboard-write; picture-in-picture; web-share"
                      allowFullScreen
                      scrolling="no"
                      frameBorder="0"
                      className="absolute inset-0 block h-full w-full"
                      style={{ colorScheme: 'normal' }}
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-[14%] bg-gradient-to-b from-neutral-900 to-black"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-[24%] bg-gradient-to-t from-neutral-900 to-black"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
