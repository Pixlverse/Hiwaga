const principles = [
  {
    tag: 'Intent',
    statement: 'Every idea has a reason. Every campaign has a narrative.',
    accent: 'bg-amber-500',
  },
  {
    tag: 'Craft',
    statement: "Video isn't a service; it's part of our creative DNA.",
    accent: 'bg-blue-500',
  },
  {
    tag: 'Empathy',
    statement:
      "We see your brand from your customer's eyes — and act accordingly.",
    accent: 'bg-purple-500',
  },
  {
    tag: 'Detail',
    statement: 'We care about tone, structure, clarity and consistency.',
    accent: 'bg-emerald-500',
  },
  {
    tag: 'Ecosystem',
    statement: 'We treat communication as an ecosystem, not isolated tasks.',
    accent: 'bg-pink-500',
  },
  {
    tag: 'Growth',
    statement: "Corrections don't scare us; stagnation does.",
    accent: 'bg-orange-500',
  },
  {
    tag: 'Joy',
    statement: 'We genuinely enjoy creating things that feel meaningful.',
    accent: 'bg-rose-500',
  },
]

export default function WhatYoullNotice() {
  return (
    <section
      aria-labelledby="notice-heading"
      className="bg-neutral-950 text-white"
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-neutral-500" />
            <h2
              id="notice-heading"
              className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 sm:text-xs md:text-sm"
            >
              What you’ll notice about us
            </h2>
            <span aria-hidden="true" className="h-px w-8 bg-neutral-500" />
          </div>
        </div>

        <ul
          role="list"
          className="mt-12 grid grid-cols-1 gap-4 sm:mt-14 sm:gap-5 lg:grid-cols-2"
        >
          {principles.map((p) => (
            <li key={p.statement}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 p-5 transition-all duration-500 hover:-translate-y-1 hover:border-white/25 sm:p-6 lg:p-7">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 right-0 w-1/2 sm:w-2/5"
                >
                  <div
                    className={`absolute right-[-15%] top-[10%] h-20 w-20 rotate-[14deg] rounded-2xl ${p.accent} opacity-30 blur-2xl sm:h-28 sm:w-28`}
                  />
                  <div
                    className={`absolute right-[-30%] bottom-[5%] h-24 w-24 -rotate-[18deg] rounded-2xl ${p.accent} opacity-20 blur-2xl sm:h-32 sm:w-32`}
                  />
                  <div
                    className={`absolute right-[10%] top-[45%] h-12 w-12 rotate-[8deg] rounded-xl ${p.accent} opacity-40 blur-xl sm:h-16 sm:w-16`}
                  />
                </div>

                <div className="relative flex h-full flex-col">
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.06] px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/85 sm:px-3.5 sm:text-[11px]">
                    <span
                      aria-hidden="true"
                      className={`inline-block h-1.5 w-1.5 rounded-full ${p.accent}`}
                    />
                    {p.tag}
                  </span>

                  <p className="mt-4 max-w-md text-lg font-semibold leading-[1.2] text-white sm:mt-5 sm:text-xl md:text-2xl">
                    {p.statement}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
