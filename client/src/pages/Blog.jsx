import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Reveal from '@/components/Reveal'
import publicApi, { apiError } from '@/lib/publicApi'
import { formatDate } from '@/lib/formatDate'

function PostCard({ post, large = false }) {
  const date = post.publishedOn || post.createdAt
  return (
    <article className="group h-full">
      <Link
        to={`/blog/${post.slug}`}
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-all duration-500 hover:-translate-y-1 hover:border-white/30 hover:bg-white/[0.04]"
      >
        <div
          className={`relative overflow-hidden bg-neutral-900 ${
            large ? 'aspect-[16/10]' : 'aspect-[16/11]'
          }`}
        >
          <img
            src={post.cover}
            alt={post.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
          />
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <span className="inline-flex w-fit items-center rounded-full bg-[#FFD700] px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-neutral-900 sm:text-[11px]">
            {post.category}
          </span>

          <h3
            className={`mt-4 font-display font-semibold leading-tight tracking-tight text-white transition-colors duration-300 group-hover:text-[#FFE57A] ${
              large
                ? 'text-2xl sm:text-3xl md:text-4xl'
                : 'text-lg sm:text-xl md:text-2xl'
            }`}
            style={{ fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1' }}
          >
            {post.title}
          </h3>

          <p
            className={`mt-3 text-sm leading-relaxed text-neutral-400 ${
              large ? 'sm:text-base lg:text-[15px]' : 'line-clamp-2'
            }`}
          >
            {post.excerpt}
          </p>

          <div className="mt-auto pt-5">
            <div className="flex items-center gap-3 text-xs text-neutral-400 sm:text-[13px]">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#FFD700]/25 to-[#FFD700]/10 text-[10px] font-semibold text-[#FFD700]">
                {post.author?.initials}
              </span>
              <span className="font-medium text-white">{post.author?.name}</span>
              <span className="text-neutral-600">·</span>
              <span className="uppercase tracking-widest text-neutral-500">
                {formatDate(date)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [active, setActive] = useState('All')

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const { data } = await publicApi.get('/blogs', {
          params: { publicOnly: 'true' },
        })
        if (!alive) return
        setPosts(data.data || [])
      } catch (err) {
        if (!alive) return
        setError(apiError(err))
      } finally {
        if (alive) setLoading(false)
      }
    })()
    return () => {
      alive = false
    }
  }, [])

  const categories = useMemo(
    () => ['All', ...new Set(posts.map((p) => p.category).filter(Boolean))],
    [posts],
  )

  const filtered = useMemo(() => {
    if (active === 'All') return posts
    return posts.filter((p) => p.category === active)
  }, [active, posts])

  const [featured, ...rest] = filtered

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

          <div className="mx-auto max-w-7xl px-4 pb-10 pt-24 sm:px-6 sm:pb-12 sm:pt-32 lg:px-8 lg:pt-36">
            <div className="mx-auto max-w-4xl text-center">
              <h1
                id="page-title"
                className="font-display text-6xl font-medium leading-[0.95] tracking-tight sm:text-7xl md:text-8xl lg:text-[4.5rem]"
                style={{
                  fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1',
                }}
              >
                <span className="text-[#FFD700]">Journal</span>
                <span className="text-[#FFD700]/50">.</span>
              </h1>

              <div
                aria-hidden="true"
                className="mx-auto mt-10 h-px w-20 bg-white/20 sm:mt-12"
              />

              <p className="mx-auto mt-10 max-w-2xl text-base leading-relaxed text-neutral-300 sm:text-lg">
                Field notes on strategy, video, branding and the work that
                quietly compounds.
              </p>
            </div>
          </div>
        </section>

        {/* Category filter */}
        {categories.length > 1 && (
          <section className="bg-neutral-950 text-white">
            <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 sm:pb-12 lg:px-8">
              <Reveal>
                <ul
                  role="list"
                  className="flex flex-wrap justify-center gap-2 sm:gap-3"
                >
                  {categories.map((c) => (
                    <li key={c}>
                      <button
                        type="button"
                        onClick={() => setActive(c)}
                        className={`rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-widest transition-all duration-300 sm:text-xs ${
                          active === c
                            ? 'bg-[#FFD700] text-neutral-900'
                            : 'border border-white/15 bg-white/[0.03] text-neutral-300 hover:border-white/30 hover:bg-white/[0.06] hover:text-white'
                        }`}
                      >
                        {c}
                      </button>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </section>
        )}

        {/* Posts */}
        <section
          aria-labelledby="posts-heading"
          className="bg-neutral-950 text-white"
        >
          <h2 id="posts-heading" className="sr-only">
            Blog posts
          </h2>

          <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8 lg:pb-28">
            {loading ? (
              <div className="flex items-center justify-center py-20 text-neutral-500">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading articles…
              </div>
            ) : error ? (
              <div className="mx-auto max-w-lg rounded-md border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-center text-sm text-rose-300">
                {error}
              </div>
            ) : filtered.length === 0 ? (
              <div className="py-16 text-center text-neutral-400">
                No posts in this category yet.
              </div>
            ) : (
              <>
                {featured && (
                  <Reveal>
                    <div className="mb-10 sm:mb-12">
                      <PostCard post={featured} large />
                    </div>
                  </Reveal>
                )}

                {rest.length > 0 && (
                  <ul
                    role="list"
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8"
                  >
                    {rest.map((p, i) => (
                      <li key={p._id || p.slug}>
                        <Reveal delay={(i % 3) * 80}>
                          <PostCard post={p} />
                        </Reveal>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
