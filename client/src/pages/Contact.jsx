import { useState } from 'react'
import {
  Mail,
  Linkedin,
  Instagram,
  MapPin,
  Globe,
  ArrowUpRight,
  Send,
  Video,
} from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Reveal from '@/components/Reveal'
import Halftone from '@/components/Halftone'

const channels = [
  {
    label: 'Email',
    value: 'hiwagamakers@gmail.com',
    href: 'mailto:hiwagamakers@gmail.com',
    icon: Mail,
    accent: 'For project inquiries & general questions',
  },
  {
    label: 'LinkedIn',
    value: 'Hiwaga Makers',
    href: 'https://www.linkedin.com/company/hiwaga-makers/',
    icon: Linkedin,
    accent: 'Follow for case studies',
  },
  {
    label: 'Productions',
    value: '@hiwaga_makers',
    href: 'https://www.instagram.com/hiwaga_makers/',
    icon: Video,
    accent: 'Video Production - Client Works',
  },
  {
    label: 'Instagram',
    value: '@hiwaga_productions',
    href: '',
    icon: Instagram,
    accent: 'Brand Communications',
  },
  {
    label: 'Google Business',
    value: 'View our profile',
    href: 'https://share.google/HKJ17YykpbbrR6Fbh',
    icon: Globe,
    accent: 'Reviews & business details',
  },
  {
    label: 'Follow - Find Us.',
    value: 'Open in Google Maps',
    href: 'https://maps.app.goo.gl/L85bxphV3yS6yjer7',
    icon: MapPin,
    accent: 'You might find us.',
  },
]

function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-[#FFD700]/30 bg-[#FFD700]/[0.05] p-8 text-center sm:p-10">
        <p className="font-display text-2xl font-medium text-[#FFD700] sm:text-3xl">
          Thanks for reaching out!
        </p>
        <p className="mt-3 text-sm leading-relaxed text-neutral-300 sm:text-base">
          We&apos;ve got your message. Someone from the studio will get back
          to you shortly.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6"
    >
      <label className="block sm:col-span-2">
        <span className="block text-[11px] font-semibold uppercase tracking-widest text-neutral-400 sm:text-xs">
          Name <span className="ml-1 text-[#FFD700]">*</span>
        </span>
        <input
          type="text"
          name="name"
          required
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="mt-2 w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-neutral-500 transition-colors duration-300 focus:border-[#FFD700]/60 focus:bg-white/[0.06] focus:outline-none sm:text-base"
        />
      </label>

      <label className="block">
        <span className="block text-[11px] font-semibold uppercase tracking-widest text-neutral-400 sm:text-xs">
          Email <span className="ml-1 text-[#FFD700]">*</span>
        </span>
        <input
          type="email"
          name="email"
          required
          placeholder="example@mail.com"
          value={form.email}
          onChange={handleChange}
          className="mt-2 w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-neutral-500 transition-colors duration-300 focus:border-[#FFD700]/60 focus:bg-white/[0.06] focus:outline-none sm:text-base"
        />
      </label>

      <label className="block">
        <span className="block text-[11px] font-semibold uppercase tracking-widest text-neutral-400 sm:text-xs">
          Phone Number
        </span>
        <input
          type="tel"
          name="phone"
          placeholder="+91 00000 00000"
          value={form.phone}
          onChange={handleChange}
          className="mt-2 w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-neutral-500 transition-colors duration-300 focus:border-[#FFD700]/60 focus:bg-white/[0.06] focus:outline-none sm:text-base"
        />
      </label>

      <label className="block sm:col-span-2">
        <span className="block text-[11px] font-semibold uppercase tracking-widest text-neutral-400 sm:text-xs">
          Message <span className="ml-1 text-[#FFD700]">*</span>
        </span>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Tell us more about your project..."
          value={form.message}
          onChange={handleChange}
          className="mt-2 w-full resize-none rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-neutral-500 transition-colors duration-300 focus:border-[#FFD700]/60 focus:bg-white/[0.06] focus:outline-none sm:text-base"
        />
      </label>

      <div className="sm:col-span-2">
        <button
          type="submit"
          className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#FFD700] px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-neutral-900 transition-all duration-300 hover:bg-[#FFE57A] hover:shadow-[0_10px_30px_-10px_rgba(255,215,0,0.5)] sm:w-auto sm:px-8 sm:py-4 sm:text-[13px]"
        >
          <Send
            aria-hidden="true"
            strokeWidth={2}
            className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
          Send Message
        </button>
      </div>
    </form>
  )
}

export default function Contact() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Navbar />
      <main>
        {/* Page hero */}
        <section
          aria-labelledby="page-title"
          className="relative isolate overflow-hidden bg-neutral-950 text-white"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-32 -z-10 mx-auto h-96 max-w-3xl opacity-40 blur-3xl"
            style={{
              background:
                'radial-gradient(closest-side, rgba(255,255,255,0.18), rgba(255,255,255,0) 70%)',
            }}
          />

          <Halftone />
          <div className="mx-auto max-w-7xl px-4 pb-12 pt-24 sm:px-6 sm:pb-16 sm:pt-32 lg:px-8 lg:pt-36">
            <div className="mx-auto max-w-4xl text-center">
              <h1
                id="page-title"
                className="font-display text-6xl font-medium leading-[0.95] tracking-tight sm:text-7xl md:text-8xl lg:text-[4.5rem]"
                style={{
                  fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1',
                }}
              >
                <span className="text-white">Get in</span>{' '}
                <span className="text-[#FFD700]">Touch</span>
                <span className="text-[#FFD700]/50">.</span>
              </h1>

              <div
                aria-hidden="true"
                className="mx-auto mt-10 h-px w-20 bg-white/20 sm:mt-12"
              />

              <p className="mx-auto mt-10 max-w-2xl text-base leading-relaxed text-neutral-300 sm:text-lg">
                Whether it&apos;s a campaign, a film, or just a hello — pick
                the channel that&apos;s easiest for you.
              </p>
            </div>
          </div>
        </section>

        {/* Channels grid */}
        <section
          aria-labelledby="channels-heading"
          className="bg-neutral-950 text-white"
        >
          <h2 id="channels-heading" className="sr-only">
            Ways to reach Hiwaga Makers
          </h2>

          <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
            <ul
              role="list"
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
            >
              {channels.map((c, i) => {
                const Icon = c.icon
                const isExternal = c.href.startsWith('http')
                return (
                  <Reveal key={c.value + c.label} delay={(i % 3) * 80}>
                    <li className="h-full">
                      <a
                        href={c.href}
                        {...(isExternal
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
                        className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#FFD700]/40 hover:bg-white/[0.06] sm:p-7"
                      >
                        <div className="flex items-start justify-between">
                          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#FFD700]/25 bg-[#FFD700]/10 text-[#FFD700]">
                            <Icon
                              aria-hidden="true"
                              strokeWidth={1.6}
                              className="h-5 w-5"
                            />
                          </span>
                          <ArrowUpRight
                            aria-hidden="true"
                            className="h-5 w-5 text-white/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#FFD700]"
                          />
                        </div>

                        <p className="mt-6 text-[10px] font-semibold uppercase tracking-widest text-neutral-400 sm:text-xs">
                          {c.label}
                        </p>

                        <p
                          className="mt-1 font-display text-xl font-medium leading-tight text-white sm:text-2xl"
                          style={{
                            fontVariationSettings:
                              '"opsz" 144, "SOFT" 50, "WONK" 1',
                          }}
                        >
                          {c.value}
                        </p>

                        <p className="mt-3 text-sm leading-relaxed text-neutral-400 sm:text-[15px]">
                          {c.accent}
                        </p>
                      </a>
                    </li>
                  </Reveal>
                )
              })}
            </ul>
          </div>
        </section>

        {/* Contact form */}
        <section
          aria-labelledby="form-heading"
          className="bg-neutral-950 text-white"
        >
          <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8 lg:pb-28">
            <Reveal>
              <div className="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-6 sm:p-10 lg:p-14">
                {/* Soft gold corner glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-32 -top-32 -z-10 h-80 w-80 rounded-full bg-[#FFD700]/[0.08] blur-3xl"
                />

                <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
                  {/* Left — intro */}
                  <div className="lg:col-span-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#FFD700]/85 sm:text-xs">
                      — Send a Message
                    </p>

                    <h2
                      id="form-heading"
                      className="mt-5 font-display text-3xl font-medium leading-[1.05] tracking-tight sm:mt-6 sm:text-4xl md:text-5xl lg:text-[2.75rem]"
                      style={{
                        fontVariationSettings:
                          '"opsz" 144, "SOFT" 50, "WONK" 1',
                      }}
                    >
                      Tell us about your{' '}
                      <span className="text-[#FFD700]">project</span>.
                    </h2>

                    <div
                      aria-hidden="true"
                      className="mt-6 h-px w-12 bg-[#FFD700]/60"
                    />

                    <p className="mt-6 max-w-md text-sm leading-relaxed text-neutral-300 sm:mt-7 sm:text-base">
                      Share what you&apos;re working on, where you&apos;re
                      headed, or just say hi. We read every message and reply
                      personally.
                    </p>

                    <a
                      href="mailto:hiwagamakers@gmail.com"
                      className="mt-7 inline-block text-sm text-neutral-400 underline-offset-4 transition-colors hover:text-[#FFD700] hover:underline sm:text-base"
                    >
                      hiwagamakers@gmail.com
                    </a>
                  </div>

                  {/* Right — form */}
                  <div className="lg:col-span-7">
                    <ContactForm />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Map block */}
        <section
          aria-labelledby="map-heading"
          className="bg-neutral-950 text-white"
        >
          <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8 lg:pb-28">
            <Reveal>
              <a
                href="https://maps.app.goo.gl/L85bxphV3yS6yjer7"
                target="_blank"
                rel="noopener noreferrer"
                className="group block overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900 via-neutral-900 to-black ring-1 ring-white/5 transition-all duration-500 hover:border-[#FFD700]/30"
              >
                <div className="grid grid-cols-1 items-center gap-8 p-6 sm:p-10 lg:grid-cols-12 lg:gap-12 lg:p-14">
                  <div className="lg:col-span-7">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#FFD700]/85 sm:text-xs">
                      — Visit the Studio
                    </p>
                    <h3
                      id="map-heading"
                      className="mt-5 font-display text-3xl font-medium leading-[1.05] tracking-tight sm:text-4xl md:text-5xl"
                      style={{
                        fontVariationSettings:
                          '"opsz" 144, "SOFT" 50, "WONK" 1',
                      }}
                    >
                      Want to{' '}
                      <span className="text-[#FFD700]">drop by</span>?
                    </h3>
                    <p className="mt-5 max-w-md text-sm leading-relaxed text-neutral-300 sm:text-base">
                      We love a good conversation — over chai, over a brief or
                      just to say hi. Open the map to navigate to our studio.
                    </p>
                    <span className="mt-7 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#FFD700] sm:text-[13px]">
                      Open in Google Maps
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </span>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="relative aspect-square overflow-hidden rounded-2xl border border-[#FFD700]/25 bg-gradient-to-br from-[#FFD700]/[0.08] via-neutral-900 to-black">
                      {/* Decorative map grid lines */}
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 400 400"
                        className="absolute inset-0 h-full w-full opacity-30"
                      >
                        {Array.from({ length: 9 }).map((_, i) => (
                          <line
                            key={`h-${i}`}
                            x1="0"
                            y1={i * 50}
                            x2="400"
                            y2={i * 50}
                            stroke="white"
                            strokeOpacity="0.15"
                            strokeWidth="0.5"
                          />
                        ))}
                        {Array.from({ length: 9 }).map((_, i) => (
                          <line
                            key={`v-${i}`}
                            x1={i * 50}
                            y1="0"
                            x2={i * 50}
                            y2="400"
                            stroke="white"
                            strokeOpacity="0.15"
                            strokeWidth="0.5"
                          />
                        ))}
                        {/* Decorative paths */}
                        <path
                          d="M 0 280 Q 120 200 200 220 T 400 160"
                          stroke="rgba(255,215,0,0.4)"
                          strokeWidth="2"
                          fill="none"
                        />
                        <path
                          d="M 60 0 Q 100 100 180 140 T 320 400"
                          stroke="rgba(255,215,0,0.25)"
                          strokeWidth="1.5"
                          fill="none"
                        />
                      </svg>

                      {/* Pulse pin */}
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <span className="relative flex items-center justify-center">
                          <span
                            aria-hidden="true"
                            className="absolute inline-flex h-16 w-16 animate-ping rounded-full bg-[#FFD700]/30"
                          />
                          <span
                            aria-hidden="true"
                            className="absolute inline-flex h-10 w-10 rounded-full bg-[#FFD700]/40 blur-sm"
                          />
                          <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#FFD700] text-neutral-900 shadow-[0_10px_30px_-5px_rgba(255,215,0,0.6)]">
                            <MapPin
                              aria-hidden="true"
                              strokeWidth={2.5}
                              className="h-5 w-5"
                            />
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
