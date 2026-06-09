import { useRef, useState } from 'react'
import {
  Check,
  Lightbulb,
  PenLine,
  Type,
  Video,
  Smile,
  Heart,
  Coffee,
  ArrowUpRight,
  Sparkles,
  Users,
  GraduationCap,
  Smile as SmileIcon,
  Loader2,
} from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Reveal from '@/components/Reveal'
import Halftone from '@/components/Halftone'
import publicApi, { apiError } from '@/lib/publicApi'

const traits = [
  { icon: Lightbulb, text: 'Thinks in ideas.' },
  { icon: PenLine, text: 'Writes notes — or “draws” notes.' },
  { icon: Type, text: 'Gets excited about clean typography.' },
  {
    icon: Video,
    text: 'Finds joy in editing frames until they feel “just right.”',
  },
  { icon: Smile, text: 'Understands memes and metrics in equal proportion.' },
  {
    icon: Heart,
    text: 'Takes responsibility — but not themselves too seriously.',
  },
  { icon: Coffee, text: 'Loves good content and good chai equally.' },
]

const roles = [
  'Social Media Executive',
  'Content Writer',
  'Graphic Designer',
  'Video Editor',
  'SEO Specialist',
  'Performance Marketer',
  'Multi-talented Unicorn',
]

const perks = [
  {
    icon: Sparkles,
    title: 'Real experience',
    body: 'Real clients, real briefs, real deadlines. The kind of exposure that actually shapes your craft.',
  },
  {
    icon: Users,
    title: 'A team that listens',
    body: 'We treat you with respect, hear out your ideas, correct you when needed and cheer when you grow.',
  },
  {
    icon: GraduationCap,
    title: 'Permission to learn',
    body: 'Mistakes happen — we all make them. What matters is what you take away and how you come back sharper.',
  },
  {
    icon: SmileIcon,
    title: 'A culture you’ll like',
    body: 'Curious people, good music, decent chai, healthy debates and the freedom to be slightly quirky.',
  },
]

function Field({
  label,
  name,
  type = 'text',
  required = false,
  placeholder,
  value,
  onChange,
  hint,
}) {
  return (
    <label className="block">
      <span className="block text-[11px] font-semibold uppercase tracking-widest text-neutral-400 sm:text-xs">
        {label}
        {required && <span className="ml-1 text-[#FFD700]">*</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="mt-2 w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-neutral-500 transition-colors duration-300 focus:border-[#FFD700]/60 focus:bg-white/[0.06] focus:outline-none sm:text-base"
      />
      {hint && (
        <span className="mt-1.5 block text-xs text-neutral-500">{hint}</span>
      )}
    </label>
  )
}

export default function Careers() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    portfolio: '',
  })
  const resumeRef = useRef(null)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const file = resumeRef.current?.files?.[0]
    if (!file) {
      setError('Please attach your resume.')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Resume must be 5 MB or smaller.')
      return
    }

    const fd = new FormData()
    fd.append('fullName', form.name)
    fd.append('email', form.email)
    fd.append('phone', form.phone)
    fd.append('role', form.role)
    fd.append('portfolioLinks', form.portfolio || '')
    fd.append('resume', file)

    try {
      setSubmitting(true)
      await publicApi.post('/careers', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setSubmitted(true)
    } catch (err) {
      setError(apiError(err))
    } finally {
      setSubmitting(false)
    }
  }

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
                <span className="text-[#FFD700]">Careers</span>
                <span className="text-[#FFD700]/50">.</span>
              </h1>

              <div
                aria-hidden="true"
                className="mx-auto mt-10 h-px w-20 bg-white/20 sm:mt-12"
              />

              <p className="mx-auto mt-10 max-w-2xl text-base leading-relaxed text-neutral-300 sm:text-lg">
                Where ideas may begin casually — but execution is taken very
                seriously.
              </p>
            </div>
          </div>
        </section>

        {/* Welcome / intro */}
        <Reveal>
          <section className="bg-neutral-950 text-white">
            <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#FFD700]/85 sm:text-xs">
                — Join the studio
              </p>

              <h2
                className="mt-4 font-display text-3xl font-medium leading-[1.1] tracking-tight sm:text-4xl md:text-5xl"
                style={{
                  fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1',
                }}
              >
                We love people who{' '}
                <span className="text-[#FFD700]">think differently</span>.
              </h2>

              <div className="mt-6 space-y-5 text-base leading-relaxed text-neutral-300 sm:mt-8 sm:text-lg lg:leading-[1.7]">
                <p>
                  Welcome to the place where ideas may begin casually, but
                  execution is taken very seriously. At Hiwaga, we love people
                  who think differently, care deeply about their craft and
                  don&apos;t get scared when someone says, &ldquo;Let&apos;s try
                  something new.&rdquo;
                </p>
                <p>
                  Our doors are almost always open for{' '}
                  <span className="text-white">interns</span> as well as{' '}
                  <span className="text-white">experienced creators</span>,
                  marketers, visualizers and storytellers. If you&apos;re
                  curious, committed, slightly quirky in the right way, and have
                  the habit of surprising yourself with good work — you&apos;ll
                  enjoy being here.
                </p>
              </div>
            </div>
          </section>
        </Reveal>

        {/* Who fits in here */}
        <Reveal>
          <section
            aria-labelledby="who-fits-heading"
            className="bg-neutral-950 text-white"
          >
            <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
              {/* Centered header */}
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#FFD700]/85 sm:text-xs">
                  — Who Fits In Here
                </p>
                <h2
                  id="who-fits-heading"
                  className="mt-5 font-display text-3xl font-medium leading-[1.05] tracking-tight sm:text-4xl md:text-5xl"
                  style={{
                    fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1',
                  }}
                >
                  Someone who&apos;s{' '}
                  <span className="text-[#FFD700]">slightly quirky</span> in the
                  right way.
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-neutral-400 sm:text-base">
                  No exact checklist — but if a few of these feel like you, we
                  should probably talk.
                </p>
              </div>

              {/* 2-column traits grid */}
              <ul
                role="list"
                className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5"
              >
                {traits.map((t, i) => {
                  const Icon = t.icon
                  return (
                    <Reveal key={t.text} delay={(i % 2) * 80}>
                      <li className="flex h-full items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.06] sm:p-5">
                        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#FFD700]/25 bg-[#FFD700]/10 text-[#FFD700]">
                          <Icon
                            aria-hidden="true"
                            strokeWidth={1.6}
                            className="h-5 w-5"
                          />
                        </span>
                        <p className="text-sm leading-relaxed text-white sm:text-[15px]">
                          {t.text}
                        </p>
                      </li>
                    </Reveal>
                  )
                })}
              </ul>
            </div>
          </section>
        </Reveal>

        {/* Roles we welcome */}
        <Reveal>
          <section
            aria-labelledby="roles-heading"
            className="bg-neutral-950 text-white"
          >
            <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#FFD700]/85 sm:text-xs">
                  — Roles We Welcome
                </p>
                <h2
                  id="roles-heading"
                  className="mt-5 font-display text-3xl font-medium leading-[1.1] tracking-tight sm:text-4xl md:text-5xl"
                  style={{
                    fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1',
                  }}
                >
                  Currently keeping a{' '}
                  <span className="text-[#FFD700]">soft eye out for…</span>
                </h2>
              </div>

              <ul
                role="list"
                className="mx-auto mt-10 flex max-w-5xl flex-wrap justify-center gap-3 sm:mt-12 sm:gap-4"
              >
                {roles.map((r, i) => (
                  <Reveal key={r} delay={(i % 4) * 60}>
                    <li>
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:border-[#FFD700]/60 hover:bg-[#FFD700]/10 hover:text-[#FFD700] sm:px-5 sm:py-3 sm:text-[15px]">
                        <span
                          aria-hidden="true"
                          className="inline-block h-1.5 w-1.5 rounded-full bg-[#FFD700]"
                        />
                        {r}
                      </span>
                    </li>
                  </Reveal>
                ))}
              </ul>

              <p className="mx-auto mt-8 max-w-xl text-center text-xs italic text-neutral-500 sm:mt-10 sm:text-sm">
                …and the occasional multi-talented unicorn who does two of these
                without panicking.
              </p>
            </div>
          </section>
        </Reveal>

        {/* What you'll get */}
        <Reveal>
          <section
            aria-labelledby="perks-heading"
            className="bg-neutral-950 text-white"
          >
            <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#FFD700]/85 sm:text-xs">
                  — What You&apos;ll Get
                </p>
                <h2
                  id="perks-heading"
                  className="mt-5 font-display text-3xl font-medium leading-[1.1] tracking-tight sm:text-4xl md:text-5xl"
                  style={{
                    fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1',
                  }}
                >
                  Real <span className="text-[#FFD700]">experience.</span> Real
                  growth.
                </h2>
              </div>

              <ul
                role="list"
                className="mt-12 grid grid-cols-1 gap-5 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
              >
                {perks.map((p, i) => {
                  const Icon = p.icon
                  return (
                    <Reveal key={p.title} delay={(i % 4) * 80}>
                      <li className="group h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-500 hover:border-white/25 hover:bg-white/[0.06]">
                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#FFD700]/25 bg-[#FFD700]/10 text-[#FFD700]">
                          <Icon
                            aria-hidden="true"
                            strokeWidth={1.5}
                            className="h-5 w-5"
                          />
                        </span>

                        <h3
                          className="mt-5 font-display text-lg font-medium leading-tight text-white sm:text-xl"
                          style={{
                            fontVariationSettings:
                              '"opsz" 144, "SOFT" 50, "WONK" 1',
                          }}
                        >
                          {p.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-neutral-400 sm:text-[15px]">
                          {p.body}
                        </p>
                      </li>
                    </Reveal>
                  )
                })}
              </ul>
            </div>
          </section>
        </Reveal>

        {/* Application form */}
        <section
          id="apply"
          aria-labelledby="apply-heading"
          className="bg-neutral-950 text-white"
        >
          <div className="mx-auto max-w-3xl px-4 pb-20 sm:px-6 sm:pb-28 lg:px-8 lg:pb-32">
            <Reveal>
              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-6 sm:p-10 lg:p-12">
                <div className="text-center">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-[#FFD700]/85 sm:text-xs">
                    — Apply
                  </p>
                  <h2
                    id="apply-heading"
                    className="mt-4 font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl md:text-5xl"
                    style={{
                      fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1',
                    }}
                  >
                    Send us your <span className="text-[#FFD700]">resume</span>.
                  </h2>
                  <p className="mx-auto mt-4 max-w-md text-sm text-neutral-400 sm:text-base">
                    If this sounds like your type of chaos — tell us a bit about
                    yourself.
                  </p>
                </div>

                {submitted ? (
                  <div className="mt-10 rounded-2xl border border-[#FFD700]/30 bg-[#FFD700]/[0.05] p-6 text-center sm:p-8">
                    <p className="font-display text-xl font-medium text-[#FFD700] sm:text-2xl">
                      Thanks for reaching out!
                    </p>
                    <p className="mt-3 text-sm text-neutral-300 sm:text-base">
                      We&apos;ve got your application. If it&apos;s a fit,
                      someone from our team will be in touch soon.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6"
                  >
                    <Field
                      label="Full name"
                      name="name"
                      required
                      placeholder="Your name"
                      value={form.name}
                      onChange={handleChange}
                    />
                    <Field
                      label="Email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                    />
                    <Field
                      label="Phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="+91 …"
                      value={form.phone}
                      onChange={handleChange}
                    />

                    <label className="block">
                      <span className="block text-[11px] font-semibold uppercase tracking-widest text-neutral-400 sm:text-xs">
                        Role
                        <span className="ml-1 text-[#FFD700]">*</span>
                      </span>
                      <select
                        name="role"
                        required
                        value={form.role}
                        onChange={handleChange}
                        className="mt-2 w-full appearance-none rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white transition-colors duration-300 focus:border-[#FFD700]/60 focus:bg-white/[0.06] focus:outline-none sm:text-base"
                        style={{
                          backgroundImage:
                            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23999' stroke-width='1.5' viewBox='0 0 24 24'><polyline points='6,9 12,15 18,9'/></svg>\")",
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 1rem center',
                          paddingRight: '2.5rem',
                        }}
                      >
                        <option value="" disabled>
                          Pick a role
                        </option>
                        {roles.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                        <option value="Other">Something else</option>
                      </select>
                    </label>

                    <div className="sm:col-span-2">
                      <label className="block">
                        <span className="block text-[11px] font-semibold uppercase tracking-widest text-neutral-400 sm:text-xs">
                          Resume
                          <span className="ml-1 text-[#FFD700]">*</span>
                        </span>
                        <input
                          ref={resumeRef}
                          name="resume"
                          type="file"
                          required
                          accept=".pdf,.doc,.docx"
                          className="mt-2 block w-full cursor-pointer rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-neutral-300 file:mr-4 file:rounded-md file:border-0 file:bg-[#FFD700] file:px-4 file:py-1.5 file:text-xs file:font-semibold file:uppercase file:tracking-widest file:text-neutral-900 file:transition-colors hover:file:bg-[#FFE57A] focus:border-[#FFD700]/60 focus:bg-white/[0.06] focus:outline-none sm:text-base"
                        />
                        <span className="mt-1.5 block text-xs text-neutral-500">
                          PDF or DOC, up to 5 MB.
                        </span>
                      </label>
                    </div>

                    <div className="sm:col-span-2">
                      <Field
                        label="Portfolio Links"
                        name="portfolio"
                        placeholder="Behance, Dribbble, Instagram, LinkedIn, GitHub…"
                        value={form.portfolio}
                        onChange={handleChange}
                        hint="Optional but appreciated — drop in anything that shows your work."
                      />
                    </div>

                    {error && (
                      <div className="rounded-md border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300 sm:col-span-2">
                        {error}
                      </div>
                    )}

                    <div className="sm:col-span-2">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#FFD700] px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-neutral-900 transition-colors duration-300 hover:bg-[#FFE57A] disabled:opacity-60 sm:w-auto sm:px-8 sm:py-4 sm:text-[13px]"
                      >
                        {submitting ? (
                          <Loader2
                            aria-hidden="true"
                            className="h-4 w-4 animate-spin"
                          />
                        ) : (
                          <>
                            Send Application
                            <ArrowUpRight
                              aria-hidden="true"
                              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
