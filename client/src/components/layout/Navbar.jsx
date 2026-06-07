import { useState } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import logo from '@/assets/hiwaga-logo.png'

// Primary nav — middle of the bar
const primary = [
  { label: 'About', to: '/about' },
  { label: 'Works', to: '/works' },
  { label: 'Services', to: '/services' },
  { label: 'Team', to: '/team' },
  { label: 'Careers', to: '/careers' },
  { label: 'Blog', to: '/blog' },
]

// Mobile sheet — everything (incl. Home + Contact)
const mobileLinks = [
  { label: 'Home', to: '/' },
  ...primary,
  { label: 'Contact', to: '/contact' },
]

function DesktopLink({ link }) {
  const base =
    'group relative text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-200'

  if (link.to) {
    return (
      <NavLink
        to={link.to}
        end={link.to === '/'}
        className={({ isActive }) =>
          `${base} ${isActive ? 'text-white' : 'text-white/70 hover:text-white'}`
        }
      >
        {({ isActive }) => (
          <>
            {link.label}
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute -bottom-1.5 left-1/2 h-px -translate-x-1/2 bg-[#FFD700] transition-all duration-300 ${
                isActive ? 'w-4' : 'w-0 group-hover:w-4'
              }`}
            />
          </>
        )}
      </NavLink>
    )
  }

  return (
    <a href={link.href} className={`${base} text-white/70 hover:text-white`}>
      {link.label}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-1.5 left-1/2 h-px w-0 -translate-x-1/2 bg-[#FFD700] transition-all duration-300 group-hover:w-4"
      />
    </a>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-neutral-950/85 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/65">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8"
      >
        {/* Left — Logo */}
        <div className="flex flex-1 items-center">
          <Link
            to="/"
            aria-label="Hiwaga Makers — home"
            className="inline-flex items-center"
          >
            <img
              src={logo}
              alt="Hiwaga Makers"
              className="h-8 w-auto sm:h-9"
            />
          </Link>
        </div>

        {/* Center — Primary nav (desktop) */}
        <ul className="hidden flex-1 items-center justify-center gap-8 lg:flex">
          {primary.map((l) => (
            <li key={l.label}>
              <DesktopLink link={l} />
            </li>
          ))}
        </ul>

        {/* Right — CTA + mobile menu */}
        <div className="flex flex-1 items-center justify-end gap-3">
          <Link
            to="/contact"
            className="group hidden items-center gap-1.5 rounded-full bg-[#FFD700] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-900 transition-all duration-300 hover:bg-[#FFE57A] lg:inline-flex"
          >
            Contact
            <ArrowUpRight
              aria-hidden="true"
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={2}
            />
          </Link>

          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white/80 hover:bg-white/10 hover:text-white lg:hidden"
          >
            {open ? (
              <X aria-hidden="true" className="h-5 w-5" />
            ) : (
              <Menu aria-hidden="true" className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-white/10 bg-neutral-950 lg:hidden">
          <ul className="space-y-1 px-4 py-3 sm:px-6">
            {mobileLinks.map((l) => (
              <li key={l.label}>
                {l.to ? (
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-3 py-2 text-sm font-medium uppercase tracking-[0.18em] text-white/80 hover:bg-white/5 hover:text-white"
                  >
                    {l.label}
                  </Link>
                ) : (
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-3 py-2 text-sm font-medium uppercase tracking-[0.18em] text-white/80 hover:bg-white/5 hover:text-white"
                  >
                    {l.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
