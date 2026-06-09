import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { caseStudies } from '@/data/caseStudies'

export default function ClientImpactStories() {
  return (
    <section
      aria-labelledby="impact-heading"
      className="bg-neutral-950 text-white"
    >
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <div className="mb-10 text-center sm:mb-14">
          <div className="flex items-center justify-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-neutral-500" />
            <h2
              id="impact-heading"
              className="text-pretty text-sm leading-relaxed text-neutral-400 sm:text-base md:text-lg font-medium"
            >
              Client Impact Stories
            </h2>
            <span aria-hidden="true" className="h-px w-8 bg-neutral-500" />
          </div>
        </div>

        <ul
          role="list"
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:grid-rows-2"
        >
          {caseStudies.map((s, i) => {
            const featured = i === 0
            return (
              <li
                key={s.slug}
                className={
                  featured ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2' : ''
                }
              >
                <Link
                  to={`/case-studies#${s.slug}`}
                  className="group relative block h-full overflow-hidden rounded-2xl bg-white shadow-xl shadow-black/40 ring-1 ring-white/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/60 hover:ring-white/30"
                >
                  <figure className="relative h-full">
                    <div className="aspect-square h-full w-full overflow-hidden">
                      <img
                        src={s.image}
                        alt={s.alt}
                        loading="lazy"
                        className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] ${
                          featured ? 'sm:object-center' : ''
                        }`}
                      />
                    </div>

                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/85 via-black/35 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />

                    <span className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 text-white opacity-0 transition-all duration-500 group-hover:opacity-100 sm:right-4 sm:top-4 sm:h-10 sm:w-10">
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </span>

                    <figcaption className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                      <div className="translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                        <p className="text-[10px] font-medium uppercase tracking-widest text-white/60 sm:text-[11px]">
                          {s.industry}
                        </p>
                        <p
                          className={`mt-1 font-display font-semibold leading-tight text-white ${
                            featured
                              ? 'text-lg sm:text-xl md:text-2xl'
                              : 'text-sm sm:text-base'
                          }`}
                          style={{
                            fontVariationSettings:
                              '"opsz" 144, "SOFT" 50, "WONK" 1',
                          }}
                        >
                          {s.caption}
                        </p>
                      </div>
                    </figcaption>
                  </figure>
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="mt-10 flex justify-center sm:mt-12">
          <Link
            to="/case-studies"
            className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.03] px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:border-white/40 hover:bg-white/[0.07] sm:px-6 sm:py-3 sm:text-sm"
          >
            View all case studies
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  )
}
