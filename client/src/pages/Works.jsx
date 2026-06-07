import { useEffect, useState } from 'react'
import { ArrowUpRight, Loader2 } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Reveal from '@/components/Reveal'
import publicApi, { apiError } from '@/lib/publicApi'

function getReelId(work) {
  if (work?.reelId) return work.reelId
  const m = String(work?.url || '').match(/(?:reel|p)\/([^/?]+)/)
  return m ? m[1] : null
}

function ReelEmbed({ id, title }) {
  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-black ring-1 ring-white/5">
      <iframe
        src={`https://www.instagram.com/reel/${id}/embed/`}
        title={title || `Hiwaga Makers — Instagram reel ${id}`}
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
  )
}

function ReelCard({ id, title }) {
  return (
    <article className="group relative h-full transition-transform duration-500 hover:-translate-y-1">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-black ring-1 ring-white/5">
        <iframe
          src={`https://www.instagram.com/reel/${id}/embed/`}
          title={title || `Hiwaga Makers — Instagram reel ${id}`}
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
    </article>
  )
}

function ReelsGallery({ reels }) {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
    >
      {reels.map((reel, i) => {
        const id = getReelId(reel)
        if (!id) return null
        return (
          <li key={reel._id || id}>
            <Reveal delay={(i % 3) * 90 + Math.floor(i / 3) * 60}>
              <ReelCard id={id} title={reel.title} />
            </Reveal>
          </li>
        )
      })}
    </ul>
  )
}

function SectionLabel({ children, id }) {
  return (
    <div className="flex items-center justify-center gap-3">
      <span aria-hidden="true" className="h-px w-8 bg-neutral-500" />
      <h2
        id={id}
        className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 sm:text-xs md:text-sm"
      >
        {children}
      </h2>
      <span aria-hidden="true" className="h-px w-8 bg-neutral-500" />
    </div>
  )
}

export default function Works() {
  const [works, setWorks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const { data } = await publicApi.get('/works')
        if (!alive) return
        setWorks(data.data || [])
      } catch (err) {
        if (!alive) return
        setError(apiError(err))
      } finally {
        if (alive) setLoading(false)
      }
    })()
    return () => {
      alive = false
    }
  }, [])

  const showreel = works.find((w) => w.featured) || null
  const rest = works.filter((w) => w !== showreel)

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Navbar />
      <main>
        {/* Page hero — title only */}
        <section
          aria-labelledby="works-hero"
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

          <div className="mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8 lg:pb-20 lg:pt-36">
            <div className="mx-auto max-w-4xl text-center">
              <h1
                id="works-hero"
                className="font-display text-6xl font-medium leading-[0.95] tracking-tight sm:text-7xl md:text-8xl lg:text-[4.5rem]"
                style={{
                  fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1',
                }}
              >
                <span className="text-white">Our</span>{' '}
                <span className="text-[#FFD700]">Works</span>
                <span className="text-[#FFD700]/50">.</span>
              </h1>

              <div
                aria-hidden="true"
                className="mx-auto mt-10 h-px w-20 bg-white/20 sm:mt-12"
              />
            </div>
          </div>
        </section>

        {/* CTA box — showreel + manifesto */}
        <section
          aria-labelledby="showreel-heading"
          className="bg-neutral-950 text-white"
        >
          <h2 id="showreel-heading" className="sr-only">
            Hiwaga Makers Showreel
          </h2>
          <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8 lg:pb-28">
            <Reveal>
              <div className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-black p-6 ring-1 ring-white/10 sm:p-10 lg:p-14">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 800 800"
                  className="pointer-events-none absolute -right-32 top-1/2 -z-10 h-[120%] w-auto -translate-y-1/2 opacity-[0.08]"
                >
                  {[380, 320, 260, 200, 140, 80].map((r) => (
                    <circle
                      key={r}
                      cx="400"
                      cy="400"
                      r={r}
                      fill="none"
                      stroke="white"
                      strokeWidth="1"
                    />
                  ))}
                </svg>

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-32 -top-32 -z-10 h-80 w-80 rounded-full bg-[#FFD700]/[0.08] blur-3xl"
                />

                <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
                  <div className="lg:col-span-7">
                    <h3
                      className="mt-5 font-display text-3xl font-medium leading-[1.1] tracking-tight sm:mt-6 sm:text-4xl md:text-5xl lg:text-[2.75rem]"
                      style={{
                        fontVariationSettings:
                          '"opsz" 144, "SOFT" 50, "WONK" 1',
                      }}
                    >
                      Shaped by <span className="text-[#FFD700]">purpose</span>.
                    </h3>

                    <div
                      aria-hidden="true"
                      className="mt-6 h-px w-12 bg-[#FFD700]/70"
                    />

                    <p className="mt-7 max-w-xl text-base leading-relaxed text-neutral-300 sm:text-lg sm:leading-[1.65] lg:text-[17px]">
                      Shaped by <span className="text-white">purpose</span>,
                      refined through{' '}
                      <span className="text-white">process</span> and executed
                      with <span className="text-white">intent</span>, our work
                      balances <span className="text-[#FFD700]">strategy</span>,{' '}
                      <span className="text-[#FFD700]">creativity</span> and{' '}
                      <span className="text-[#FFD700]">storytelling</span> to
                      build meaningful brand presence across platforms and
                      touchpoints.
                    </p>

                    <div className="mt-9 flex flex-wrap items-center gap-3 sm:mt-10">
                      <a
                        href="https://www.instagram.com/hiwagamakers/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 rounded-full bg-[#FFD700] px-5 py-3 text-xs font-semibold uppercase tracking-widest text-neutral-900 transition-all duration-300 hover:bg-[#FFE57A] sm:px-6 sm:text-[13px]"
                      >
                        Follow on Instagram
                        <ArrowUpRight
                          aria-hidden="true"
                          className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </a>
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="mx-auto w-full max-w-md sm:max-w-lg lg:mx-0">
                      {showreel && getReelId(showreel) ? (
                        <ReelEmbed
                          id={getReelId(showreel)}
                          title={showreel.title || 'Hiwaga Makers — Showreel'}
                        />
                      ) : (
                        <div className="flex aspect-[3/4] w-full items-center justify-center rounded-2xl bg-black ring-1 ring-white/5">
                          {loading ? (
                            <Loader2 className="h-5 w-5 animate-spin text-neutral-500" />
                          ) : (
                            <p className="px-6 text-center text-xs text-neutral-500">
                              No showreel set yet.
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Reels grid */}
        <section
          aria-labelledby="reels-heading"
          className="bg-neutral-950 text-white"
        >
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
            <Reveal>
              <SectionLabel id="reels-heading">Recent Work</SectionLabel>
            </Reveal>

            <div className="mt-12 sm:mt-16">
              {loading ? (
                <div className="flex items-center justify-center py-12 text-neutral-500">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading work…
                </div>
              ) : error ? (
                <div className="mx-auto max-w-lg rounded-md border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-center text-sm text-rose-300">
                  {error}
                </div>
              ) : rest.length === 0 ? (
                <p className="py-12 text-center text-sm text-neutral-500">
                  No reels published yet.
                </p>
              ) : (
                <ReelsGallery reels={rest} />
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
