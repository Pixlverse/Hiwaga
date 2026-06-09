import { Target, Sparkles, Wand2 } from 'lucide-react'

const values = [
  {
    icon: Target,
    title: 'Impact over volume',
    body: "We don't count deliverables — we measure direction, clarity and brand movement. Every piece of content exists because it serves a purpose, not because a calendar demands it.",
  },
  {
    icon: Sparkles,
    title: 'Strategy wearing creative shoes',
    body: "Your brand gets a blend of thoughtful planning and imaginative storytelling. It's structure meeting spark — and that's where real engagement begins.",
  },
  {
    icon: Wand2,
    title: "In-house 'Video-Wizards'",
    body: 'With our fully-equipped internal video production wing, your stories get cinematic attention without the usual chaos. Fast, flexible, expressive — that’s how we roll the camera.',
  },
]

export default function ValueProps() {
  return (
    <section
      aria-labelledby="values-heading"
      className="bg-neutral-950 text-white"
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span
              aria-hidden="true"
              className="h-px w-8 bg-neutral-500"
            />
            <h2
              id="values-heading"
              className="text-pretty text-sm leading-relaxed text-neutral-400 sm:text-base md:text-lg font-medium"
            >
              Value Propositions
            </h2>
            <span
              aria-hidden="true"
              className="h-px w-8 bg-neutral-500"
            />
          </div>
        </div>

        <ul
          role="list"
          className="mt-14 grid grid-cols-1 gap-5 sm:mt-20 sm:gap-6 lg:grid-cols-3"
        >
          {values.map((v, i) => {
            const Icon = v.icon
            return (
              <li
                key={v.title}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-6 transition-all duration-500 hover:-translate-y-1 hover:border-white/25 sm:p-8"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255,255,255,0.08), transparent 70%)',
                  }}
                />

                <div className="flex items-start justify-between">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] text-white transition-colors duration-500 group-hover:border-white/30 group-hover:bg-white/[0.08]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-display text-3xl font-light italic text-white/30 transition-colors duration-500 group-hover:text-white/60 sm:text-4xl"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3
                  className="mt-6 font-display text-2xl font-semibold leading-tight text-white sm:mt-8 sm:text-[1.65rem]"
                  style={{
                    fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1',
                  }}
                >
                  {v.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-neutral-400 sm:text-[15px]">
                  {v.body}
                </p>

                <div
                  aria-hidden="true"
                  className="mt-6 h-px w-12 bg-white/20 transition-all duration-500 group-hover:w-24 group-hover:bg-white/40"
                />
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
