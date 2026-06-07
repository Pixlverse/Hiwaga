import { Link, useLocation } from 'react-router-dom'
import { ArrowUpRight, Linkedin, Instagram, MapPin, Globe } from 'lucide-react'
import logo from '@/assets/hiwaga-logo.png'
import pixlverseLogo from '@/assets/pixlverse.png'

const socials = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/hiwaga-makers/',
    icon: Linkedin,
  },
  {
    label: 'Instagram — Hiwaga Makers',
    href: 'https://www.instagram.com/hiwaga_makers/',
    icon: Instagram,
  },
  {
    label: 'Instagram — Hiwaga Productions',
    href: 'https://www.instagram.com/hiwaga_productions/',
    icon: Instagram,
  },
  {
    label: 'Google Business Page',
    href: 'https://share.google/HKJ17YykpbbrR6Fbh',
    icon: Globe,
  },
  {
    label: 'Map Location',
    href: 'https://maps.app.goo.gl/L85bxphV3yS6yjer7',
    icon: MapPin,
  },
]

// Canonical page sequence — drives both the Explore list and the
// "Next Page" card (the card resolves to the page that follows the
// current route in this order).
const pageOrder = [
  {
    path: '/',
    title: 'Home',
    blurb:
      'Back to where it all begins — the studio, the work, the philosophy.',
  },
  {
    path: '/about',
    title: 'About Us',
    blurb:
      'Discover the team, the philosophy, and the work behind every project.',
  },
  {
    path: '/works',
    title: 'Works',
    blurb: 'Browse our recent reels, films, and campaigns.',
  },
  {
    path: '/services',
    title: 'Services',
    blurb: 'Strategy, content, video, performance — what we do, end to end.',
  },
  {
    path: '/team',
    title: 'Team',
    blurb: 'Meet the makers, strategists and storytellers behind Hiwaga.',
  },
  {
    path: '/careers',
    title: 'Careers',
    blurb: 'Join the studio — we’re always open to thoughtful creators.',
  },
  {
    path: '/contact',
    title: 'Contact',
    blurb: 'Email, social, or drop by the studio — we’re easy to reach.',
  },
  {
    path: '/faq',
    title: 'FAQ',
    blurb: 'Common questions about how we work, answered honestly.',
  },
]

// Explore column — labels for the footer link list.
const links = pageOrder.map((p) => ({
  label: p.title === 'About Us' ? 'About' : p.title,
  href: p.path,
}))

function getNextPage(currentPath) {
  const i = pageOrder.findIndex((p) => p.path === currentPath)
  if (i === -1) return { page: pageOrder[1], index: 1 }
  const nextIndex = (i + 1) % pageOrder.length
  return { page: pageOrder[nextIndex], index: nextIndex }
}

export default function Footer() {
  const { pathname } = useLocation()
  const { page: nextPage, index: nextIndex } = getNextPage(pathname)

  return (
    <footer className="border-t border-white/10 bg-neutral-950 text-white">
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-6 sm:pb-10 sm:pt-20 lg:px-8 lg:pb-12 lg:pt-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left — CTA */}
          <div className="lg:col-span-5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 sm:text-xs">
              Get in touch
            </p>
            <h2
              className="mt-4 font-display text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl md:text-5xl"
              style={{
                fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1',
              }}
            >
              Have a project in mind?{' '}
              <span className="text-[#FFD700]/95">
                Let&apos;s talk about it.
              </span>
            </h2>
            <a
              href="mailto:hiwagamakers@gmail.com"
              className="group mt-6 inline-flex items-baseline gap-2 text-base font-medium text-white sm:mt-8 sm:text-lg"
            >
              hiwagamakers@gmail.com
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4 self-center transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:h-5 sm:w-5"
              />
            </a>

            {/* Social icons */}
            <ul role="list" className="mt-7 flex flex-wrap items-center gap-2 sm:mt-8 sm:gap-3">
              {socials.map((s) => {
                const Icon = s.icon
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#FFD700]/60 hover:bg-[#FFD700]/10 hover:text-[#FFD700]"
                    >
                      <Icon
                        aria-hidden="true"
                        strokeWidth={1.6}
                        className="h-4 w-4"
                      />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Middle — Links */}
          <nav aria-label="Footer" className="lg:col-span-3">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 sm:text-xs">
              Explore
            </p>
            <ul className="mt-5 space-y-3">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="group inline-flex items-center gap-2 text-sm text-neutral-300 transition-colors hover:text-white sm:text-base"
                  >
                    <span
                      aria-hidden="true"
                      className="h-px w-0 bg-[#FFD700] transition-all duration-300 group-hover:w-4"
                    />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right — Next Page card (dynamic) */}
          <div className="lg:col-span-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 sm:text-xs">
              Next Page
            </p>
            <Link
              to={nextPage.path}
              className="group mt-5 block overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-6 transition-all duration-500 hover:-translate-y-0.5 hover:border-white/30 hover:from-white/[0.07] sm:p-7"
            >
              <div className="relative">
                <div className="flex items-start justify-between">
                  <span className="text-[11px] tracking-widest text-[#FFD700]/85">
                    {String(nextIndex + 1).padStart(2, '0')} / Next
                  </span>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-[#FFD700]/60 group-hover:bg-[#FFD700]/10">
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                  </span>
                </div>

                <h3
                  className="mt-8 font-display text-3xl font-semibold leading-tight sm:text-4xl"
                  style={{
                    fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1',
                  }}
                >
                  {nextPage.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-neutral-400 sm:text-[15px]">
                  {nextPage.blurb}
                </p>

                <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#FFD700]/90 sm:text-[13px]">
                  Discover
                  <span
                    aria-hidden="true"
                    className="inline-block h-px w-6 bg-[#FFD700]/80 transition-all duration-500 group-hover:w-10"
                  />
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* Divider + bottom row */}
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/"
                aria-label="Hiwaga Makers — home"
                className="inline-flex items-center"
              >
                <img
                  src={logo}
                  alt="Hiwaga Makers"
                  className="h-9 w-auto sm:h-10"
                />
              </Link>
              <span className="text-xs text-neutral-500">
                © {new Date().getFullYear()} · All rights reserved
              </span>
            </div>
            <a
              href="https://www.pixlverse.in/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Designed by Pixlverse — opens in a new tab"
              className="group inline-flex items-end gap-3 text-xs text-neutral-500 transition-colors hover:text-neutral-300 sm:text-base"
            >
              <span className="pb-3">Designed by</span>
              <img
                src={pixlverseLogo}
                alt="Pixlverse"
                className="h-12 w-auto opacity-85 transition-opacity duration-300 group-hover:opacity-100 sm:h-14"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
