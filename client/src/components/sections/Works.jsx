import { Button } from '@/components/ui/button'

const works = [
  {
    title: 'Heritage Restaurant Campaign',
    image:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=70',
    span: 'sm:col-span-1 sm:row-span-2',
  },
  {
    title: 'Lifestyle D2C Launch',
    image:
      'https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&w=900&q=70',
    span: 'sm:col-span-1',
  },
  {
    title: 'Brand Documentary',
    image:
      'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=900&q=70',
    span: 'sm:col-span-2',
  },
  {
    title: 'Founder Personal Brand',
    image:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=70',
    span: 'sm:col-span-1',
  },
  {
    title: 'Cafe Visual Identity',
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=70',
    span: 'sm:col-span-1',
  },
  {
    title: 'Retail OOH Series',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=70',
    span: 'sm:col-span-2',
  },
]

export default function Works() {
  return (
    <section
      id="works"
      aria-labelledby="works-heading"
      className="bg-neutral-950 text-white"
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <h2 id="works-heading" className="text-3xl font-semibold sm:text-4xl">
            Our Works
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-neutral-400 sm:text-base">
            Shaped by purpose, refined through process, and executed with intent.
            Our work balances strategy, creativity and storytelling — built to
            scale brands, drive pipeline across platforms and tastefully cross
            categories.
          </p>
        </header>

        <ul
          role="list"
          className="mt-12 grid grid-cols-2 gap-3 sm:mt-16 sm:grid-cols-4 sm:gap-4"
        >
          {works.map((w) => (
            <li
              key={w.title}
              className={`group relative overflow-hidden rounded-lg bg-neutral-900 ${w.span}`}
            >
              <img
                src={w.image}
                alt={w.title}
                loading="lazy"
                className="aspect-square h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
              />
              <figcaption className="absolute bottom-3 left-3 right-3 text-xs font-medium uppercase tracking-wider text-white/90">
                {w.title}
              </figcaption>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex justify-center sm:mt-12">
          <Button
            asChild
            size="lg"
            className="bg-white text-neutral-900 hover:bg-neutral-200"
          >
            <a href="#all-works">Explore All</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
