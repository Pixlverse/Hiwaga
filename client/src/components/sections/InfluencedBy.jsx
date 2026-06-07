const references = [
  'Content psychology & audience behaviour research',
  'Social media trend analysis',
  'Storytelling structures used in brand communication',
  'Video performance insights across major platforms',
  'UX-writing and website communication principles',
  'SEO and search-intent mapping frameworks',
  'Branding clarity and positioning studies',
]

export default function InfluencedBy() {
  return (
    <section
      aria-labelledby="influenced-heading"
      className="bg-neutral-950 text-white"
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span
              aria-hidden="true"
              className="h-px w-8 bg-neutral-500"
            />
            <h2
              id="influenced-heading"
              className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 sm:text-xs md:text-sm"
            >
              Backbone of our strategy
            </h2>
            <span
              aria-hidden="true"
              className="h-px w-8 bg-neutral-500"
            />
          </div>

          <p className="mt-6 text-base leading-relaxed text-neutral-300 sm:mt-8 sm:text-lg">
            Our approach is influenced by modern marketing frameworks, evolving
            consumer behaviour studies, storytelling principles, video
            marketing insights, branding fundamentals and performance research
            from reputable industry sources. We draw from:
          </p>
        </div>

        <ul
          role="list"
          className="mt-12 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3"
        >
          {references.map((item, i) => (
            <li
              key={item}
              className={`group flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.06] sm:p-6 ${
                i === references.length - 1
                  ? 'sm:col-span-2 lg:col-span-1 lg:col-start-2'
                  : ''
              }`}
            >
              <span
                aria-hidden="true"
                className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-300/10 text-[10px] font-bold text-amber-300 transition-colors duration-300 group-hover:bg-amber-300 group-hover:text-neutral-900"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-sm leading-relaxed text-white sm:text-[15px]">
                {item}
              </p>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-12 max-w-3xl text-center text-sm italic leading-relaxed text-neutral-400 sm:mt-14 sm:text-base">
          These references help us design strategies that{' '}
          <span className="not-italic text-white">stand the test of time</span>
          , not trends.
        </p>
      </div>
    </section>
  )
}
