import { Check } from 'lucide-react'

const bullets = [
  'Stronger brand presence',
  'Clearer identity',
  'Better engagement',
  // 'More trust',
  'Better visibility',
  'Communication that feels genuinely aligned with your goals',
]

export default function Strategy() {
  return (
    <section
      id="about"
      aria-labelledby="strategy-heading"
      className="bg-neutral-950 text-white"
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-8 bg-neutral-500" />
          <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 sm:text-xs md:text-sm">
            Success Indicators
          </p>
          <span aria-hidden="true" className="h-px w-8 bg-neutral-500" />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2
              id="strategy-heading"
              className="text-balance text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl"
            >
              Strategy. Creativity. Impact that lasts.
            </h2>

            <div className="mt-6 space-y-4 text-sm leading-relaxed text-neutral-400 sm:text-base">
              <p>
                Clients choose Hiwaga Makers because they experience a blend of
                structured strategy, honest communication and emotionally strong
                creativity. Our work is built to move audiences — sometimes with
                storytelling, sometimes with design clarity, sometimes with
                performance-driven campaigns, and often with videos that feel
                alive.
              </p>
              <p>
                We study brand behaviour deeply before suggesting anything. We
                refine website communication, reposition products/services when
                needed, craft meaningful content journeys and maintain
                consistency across every platform. Clients appreciate the fact
                that we listen, analyse, correct thoughtfully, and stay
                committed to improvement.
              </p>
            </div>
          </div>

          <ul role="list" className="space-y-4">
            {bullets.map((b) => (
              <li
                key={b}
                className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-4 sm:p-5"
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10"
                >
                  <Check className="h-3.5 w-3.5 text-white" />
                </span>
                <p className="text-sm leading-relaxed text-neutral-200 sm:text-[15px]">
                  {b}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
