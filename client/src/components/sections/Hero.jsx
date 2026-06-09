import { ArrowRight, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Halftone from '@/components/Halftone'

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-neutral-950 text-white font-hero"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-32 -z-10 mx-auto h-96 max-w-3xl opacity-40 blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, rgba(255,255,255,0.18), rgba(255,255,255,0) 70%)',
        }}
      />

      {/* Full-section dotted halftone background (subtle gold) */}
      <Halftone />

      <div className="mx-auto max-w-7xl px-4 pt-20 pb-16 sm:px-6 sm:pt-28 sm:pb-20 lg:px-8 lg:pt-32 lg:pb-24">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mx-auto max-w-3xl text-pretty text-sm leading-relaxed text-neutral-400 sm:text-base">
            Clear strategy. <span className="text-[#FFD700]/95">Powerful stories.</span> Marketing that delivers. We bring it all together.
          </p>

          <div
            aria-hidden="true"
            className="mx-auto mt-8 h-px w-16 bg-white/30"
          />

          <h1
            id="hero-heading"
            className="mt-8 font-display text-balance text-4xl font-light leading-[1.02] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-5xl"
            style={{ fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1' }}
          >
            <span className="group block cursor-default transition-all duration-500">
              <span className="font-bold text-white/75">Purposefully</span>{' '}
              <span className="font-bold text-[#FFD700]/85">
                Creative
              </span>
              <span className="text-[#FFD700]/40">.</span>
            </span>
            <span className="group mt-4 block cursor-default transition-all duration-500 sm:mt-5 md:mt-6">
              <span className="font-bold text-white/75">Strategically</span>{' '}
              <span className="font-bold text-[#FFD700]/85">
                Curious
              </span>
              <span className="text-[#FFD700]/40">.</span>
            </span>
            <span className="group mt-4 block cursor-default transition-all duration-500 sm:mt-5 md:mt-6">
              <span className="font-bold text-white/75">Consistently</span>{' '}
              <span className="font-bold text-[#FFD700]/85">
                Impactful
              </span>
              <span className="text-[#FFD700]/40">.</span>
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-pretty text-sm leading-relaxed text-neutral-400 sm:text-base">
            We craft stories, visuals and videos that make your brand feel
            clearer, stronger and unmistakably yours.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="group bg-white text-neutral-900 hover:bg-neutral-200"
            >
              <a
                href="https://forms.gle/RnJuBVvgYSaiaun18"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Your Free Strategy Call
                <ArrowRight
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <a href="tel:+919447853656" aria-label="Call us at +91 94478 53656">
                <Phone aria-hidden="true" />
                Call / WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
