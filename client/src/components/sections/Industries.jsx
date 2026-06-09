import {
  Shirt,
  Utensils,
  ShoppingBag,
  Lamp,
  Armchair,
  Building2,
  Smile,
  PawPrint,
  Hospital,
  Plane,
  GraduationCap,
  User,
  Eye,
  Hotel,
} from 'lucide-react'

const industries = [
  { name: 'Clothing & Apparel Brands', icon: Shirt },
  { name: 'Restaurants & Food Ventures', icon: Utensils },
  { name: 'Boutiques & Fashion Stores', icon: ShoppingBag },
  { name: 'Home Décor & Lifestyle Brands', icon: Lamp },
  { name: 'Interior Design Studios', icon: Armchair },
  { name: 'Architectural Firms', icon: Building2 },
  { name: 'Dental Clinics', icon: Smile },
  { name: 'Pet Clinics & Pet Care Services', icon: PawPrint },
  { name: 'Hospitals & Healthcare Practices', icon: Hospital },
  { name: 'Tours & Travel Services', icon: Plane },
  { name: 'Educational Institutions & Training', icon: GraduationCap },
  { name: 'Personal Branding for Professionals', icon: User },
  { name: 'Optical Stores & Eye Care', icon: Eye },
  { name: 'Hotels & Hospitality Businesses', icon: Hotel },
]

export default function Industries() {
  return (
    <section
      aria-labelledby="industries-heading"
      className="bg-neutral-950 text-white"
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-neutral-500" />
            <h2
              id="industries-heading"
              className="text-pretty text-sm leading-relaxed text-neutral-400 sm:text-base md:text-lg font-medium"
            >
              Industries We Work With
            </h2>
            <span aria-hidden="true" className="h-px w-8 bg-neutral-500" />
          </div>

          <p className="mt-6 text-base leading-relaxed text-neutral-300 sm:mt-8 sm:text-lg">
            We work with brands across a wide spectrum of industries, each with
            its own personality, audience and communication style. Whether
            it&apos;s fashion, food, healthcare, education or creative fields
            like interiors and architecture, we adapt our strategy and
            storytelling to suit the needs of each business.
          </p>

          <p className="mt-4 text-sm leading-relaxed text-neutral-400 sm:text-base">
            Our approach remains consistent —{' '}
            <span className="text-white">understand the industry deeply</span>,{' '}
            <span className="text-white">
              speak the audience&apos;s language
            </span>{' '}
            and{' '}
            <span className="text-white">
              create content that reflects the essence of the brand
            </span>{' '}
            while delivering measurable impact.
          </p>
        </div>

        <ul
          role="list"
          className="mx-auto mt-14 flex max-w-5xl flex-wrap justify-center gap-3 sm:mt-16 sm:gap-4"
        >
          {industries.map(({ name, icon: Icon }) => (
            <li key={name}>
              <span
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-gradient-to-b from-neutral-800 via-neutral-900 to-black px-4 py-2 text-xs font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/50 sm:px-5 sm:py-2.5 sm:text-sm"
                style={{
                  boxShadow:
                    '0 2px 10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
                }}
              >
                <Icon
                  aria-hidden="true"
                  strokeWidth={1.8}
                  className="h-3.5 w-3.5 text-white/90 sm:h-4 sm:w-4"
                />
                {name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
