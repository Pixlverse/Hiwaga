import { useEffect, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  Clock,
  Share2,
  Loader2,
} from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Reveal from '@/components/Reveal'
import publicApi, { apiError } from '@/lib/publicApi'
import { formatDate } from '@/lib/formatDate'

export default function BlogDetail() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let alive = true
    setLoading(true)
    setNotFound(false)
    setError('')

    ;(async () => {
      try {
        const { data } = await publicApi.get(`/blogs/slug/${slug}`)
        if (!alive) return
        const p = data.data
        setPost(p)

        // Fire-and-forget view count
        publicApi.post(`/blogs/slug/${slug}/view`).catch(() => {})

        // Related: same category, exclude this slug
        if (p?.category) {
          try {
            const { data: r } = await publicApi.get('/blogs', {
              params: { publicOnly: 'true', category: p.category },
            })
            if (!alive) return
            setRelated(
              (r.data || []).filter((x) => x.slug !== slug).slice(0, 3),
            )
          } catch {
            /* ignore — related is nice-to-have */
          }
        }
      } catch (err) {
        if (!alive) return
        if (err?.response?.status === 404) {
          setNotFound(true)
        } else {
          setError(apiError(err))
        }
      } finally {
        if (alive) setLoading(false)
      }
    })()

    return () => {
      alive = false
    }
  }, [slug])

  if (notFound) return <Navigate to="/blog" replace />

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white">
        <Navbar />
        <main className="flex min-h-[60vh] items-center justify-center text-neutral-500">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Loading article…
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white">
        <Navbar />
        <main className="mx-auto flex min-h-[60vh] max-w-lg items-center justify-center px-4">
          <div className="rounded-md border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-center text-sm text-rose-300">
            {error || 'Article unavailable.'}
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const date = post.publishedOn || post.createdAt

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Navbar />
      <main>
        <article>
          <section
            aria-labelledby="post-title"
            className="relative isolate overflow-hidden bg-neutral-950 text-white"
          >
            <div className="mx-auto max-w-5xl px-4 pb-12 pt-24 sm:px-6 sm:pb-16 sm:pt-28 lg:px-8 lg:pt-32">
              <Link
                to="/blog"
                className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-neutral-400 transition-colors hover:text-[#FFD700] sm:text-[13px]"
              >
                <ArrowLeft
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5"
                  strokeWidth={1.8}
                />
                All Articles
              </Link>

              <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10">
                <span className="inline-flex items-center rounded-full bg-[#FFD700] px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-neutral-900 sm:text-[11px]">
                  {post.category}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-neutral-500">
                  <Calendar
                    aria-hidden="true"
                    className="h-3.5 w-3.5"
                    strokeWidth={1.8}
                  />
                  {formatDate(date)}
                </span>
                {post.readingTime && (
                  <span className="inline-flex items-center gap-1.5 text-xs text-neutral-500">
                    <Clock
                      aria-hidden="true"
                      className="h-3.5 w-3.5"
                      strokeWidth={1.8}
                    />
                    {post.readingTime}
                  </span>
                )}
              </div>

              <h1
                id="post-title"
                className="mt-6 font-display text-3xl font-semibold leading-[1.1] tracking-tight sm:mt-8 sm:text-4xl md:text-5xl lg:text-[3.5rem]"
                style={{
                  fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1',
                }}
              >
                {post.title}
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-relaxed text-neutral-300 sm:mt-7 sm:text-lg">
                {post.excerpt}
              </p>

              <div className="mt-8 flex items-center justify-between border-y border-white/10 py-5 sm:mt-10">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#FFD700]/25 to-[#FFD700]/10 text-xs font-semibold text-[#FFD700]">
                    {post.author?.initials}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {post.author?.name}
                    </p>
                    <p className="text-xs text-neutral-500">
                      Hiwaga Makers Team
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="inline-flex h-9 items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-3 text-xs font-medium text-neutral-300 transition-colors hover:border-white/35 hover:text-white sm:px-4"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: post.title,
                        url: window.location.href,
                      })
                    } else if (navigator.clipboard) {
                      navigator.clipboard.writeText(window.location.href)
                    }
                  }}
                >
                  <Share2
                    aria-hidden="true"
                    className="h-3.5 w-3.5"
                    strokeWidth={1.8}
                  />
                  Share
                </button>
              </div>
            </div>

            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <Reveal>
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-neutral-900 ring-1 ring-white/10">
                  <img
                    src={post.cover}
                    alt={post.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              </Reveal>
            </div>
          </section>

          <section className="bg-neutral-950 text-white">
            <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
              <Reveal>
                <div className="space-y-6 text-neutral-300 sm:space-y-7">
                  {(post.content || []).map((block, i) => {
                    if (block.type === 'h2') {
                      return (
                        <h2
                          key={i}
                          className="mt-8 font-display text-2xl font-semibold leading-tight tracking-tight text-white sm:mt-10 sm:text-3xl"
                          style={{
                            fontVariationSettings:
                              '"opsz" 144, "SOFT" 50, "WONK" 1',
                          }}
                        >
                          {block.text}
                        </h2>
                      )
                    }
                    if (block.type === 'quote') {
                      return (
                        <blockquote
                          key={i}
                          className="relative my-8 border-l-2 border-[#FFD700]/60 pl-6 sm:my-10 sm:pl-8"
                        >
                          <p
                            className="font-display text-xl italic leading-[1.4] text-white sm:text-2xl md:text-[1.6rem]"
                            style={{
                              fontVariationSettings:
                                '"opsz" 144, "SOFT" 50, "WONK" 1',
                            }}
                          >
                            “{block.text}”
                          </p>
                        </blockquote>
                      )
                    }
                    const paragraphs = String(block.text || '')
                      .split(/\n{2,}/)
                      .map((s) => s.trim())
                      .filter(Boolean)
                    return (
                      <div key={i} className="space-y-6 sm:space-y-7">
                        {paragraphs.map((para, j) => (
                          <p
                            key={j}
                            className="whitespace-pre-line text-base leading-[1.75] sm:text-[17px] sm:leading-[1.8]"
                          >
                            {para}
                          </p>
                        ))}
                      </div>
                    )
                  })}
                </div>
              </Reveal>
            </div>
          </section>
        </article>

        {related.length > 0 && (
          <section
            aria-labelledby="related-heading"
            className="border-t border-white/10 bg-neutral-950 text-white"
          >
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
              <Reveal>
                <div className="flex items-end justify-between gap-4">
                  <h2
                    id="related-heading"
                    className="font-display text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl"
                    style={{
                      fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1',
                    }}
                  >
                    Keep reading.
                  </h2>
                  <Link
                    to="/blog"
                    className="group inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#FFD700] hover:text-[#FFE57A] sm:text-[13px]"
                  >
                    All Articles
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </Link>
                </div>
              </Reveal>

              <ul
                role="list"
                className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8"
              >
                {related.map((p, i) => (
                  <li key={p._id || p.slug}>
                    <Reveal delay={i * 80}>
                      <article className="group h-full">
                        <Link
                          to={`/blog/${p.slug}`}
                          className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-all duration-500 hover:-translate-y-1 hover:border-white/30 hover:bg-white/[0.04]"
                        >
                          <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                            <img
                              src={p.cover}
                              alt={p.title}
                              loading="lazy"
                              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                            />
                          </div>
                          <div className="flex flex-1 flex-col p-5">
                            <span className="inline-flex w-fit items-center rounded-full bg-[#FFD700] px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-neutral-900">
                              {p.category}
                            </span>
                            <h3
                              className="mt-4 font-display text-lg font-semibold leading-tight tracking-tight text-white transition-colors group-hover:text-[#FFE57A] sm:text-xl"
                              style={{
                                fontVariationSettings:
                                  '"opsz" 144, "SOFT" 50, "WONK" 1',
                              }}
                            >
                              {p.title}
                            </h3>
                            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-400">
                              {p.excerpt}
                            </p>
                            <div className="mt-auto pt-4 text-xs text-neutral-500">
                              {formatDate(p.publishedOn || p.createdAt)}
                              {p.readingTime ? ` · ${p.readingTime}` : ''}
                            </div>
                          </div>
                        </Link>
                      </article>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}
