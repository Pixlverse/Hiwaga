import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ContactCTA() {
  return (
    <section
      id="contact"
      aria-labelledby="cta-heading"
      className="bg-white text-neutral-900"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-3 lg:gap-12">
          <div className="lg:col-span-2">
            <h2
              id="cta-heading"
              className="text-balance text-3xl font-bold uppercase leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
            >
              Have a project in mind?{' '}
              <span className="block">Let’s get in touch!</span>
            </h2>
            <p className="mt-5 max-w-xl text-sm text-neutral-600 sm:text-base">
              Tell us where you’re going. We’ll help you get there with
              strategy, creative, and execution that holds up over time.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-neutral-900 text-white hover:bg-neutral-800"
              >
                <a href="mailto:hiwagamakers@gmail.com">
                  Start a conversation
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-neutral-300 bg-transparent text-neutral-900 hover:bg-neutral-100"
              >
                <a href="#works">See more work</a>
              </Button>
            </div>
          </div>

          <aside
            aria-label="Newsletter"
            className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 sm:p-8"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Works → Subscribe
            </p>
            <p className="mt-3 text-base font-medium text-neutral-900">
              Get new case studies in your inbox.
            </p>
            <form
              className="mt-5 flex gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="cta-email" className="sr-only">
                Email address
              </label>
              <input
                id="cta-email"
                type="email"
                required
                placeholder="you@company.com"
                className="min-w-0 flex-1 rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
              <Button
                type="submit"
                size="default"
                className="bg-neutral-900 text-white hover:bg-neutral-800"
              >
                Subscribe
              </Button>
            </form>
          </aside>
        </div>
      </div>
    </section>
  )
}
