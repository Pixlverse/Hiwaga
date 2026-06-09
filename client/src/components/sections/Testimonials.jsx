import { useRef } from 'react'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import alishaTravelsVideo from '@/assets/Alisha Travels.mp4'
import decorsByMergeVideo from '@/assets/Decors byMerge.mp4'
import kiaraApparelsVideo from '@/assets/Kiara Apparels.mp4'
import ssInteriorsVideo from '@/assets/S&S interiors.MP4'
import homeStoriesVideo from '@/assets/Home stories.MP4'

// Each testimonial may include an optional `videoUrl`.
// Supported: direct video file URLs (.mp4, .webm, …), YouTube links, Vimeo links.
// Leave it as an empty string to render the quote-only card design.
const testimonials = [
  {
    quote:
      'Social media is a major route for businesses today, especially in our industry. We had worked with several marketing teams before, but none of those associations lasted beyond six months. The main reason was the lack of time, clarity, and true involvement from the digital side. With Hiwaga Makers, the experience changed. We finally found a team that took the time to understand our business and think alongside us. What sets Hiwaga apart is their commitment, strategic clarity, and the dedicated time they invest in our brand. That has made all the difference.',
    author: 'Ramzi Mohammed Ali',
    role: 'Founder',
    company: 'Alisha Tours & Travels',
    accent: 'bg-amber-400/15 text-amber-300',
    videoUrl: alishaTravelsVideo,
  },
  {
    // TODO: Replace placeholder quote/author with the actual testimonial content.
    quote: 'What impressed me most about Hiwaga Makers was that it never felt like I was working with just one person, it felt like having an entire team invested in my business. Their diverse perspectives, creativity and strategic thinking helped us create content that connected with a much wider audience than we initially imagined. Beyond content production, they provided valuable guidance on business growth, positioning and standing out in a competitive market. The team is professional yet approachable, making the entire process comfortable, collaborative and effective.',
    author: 'Neha Santhosh',
    role: 'Founder',
    company: 'Decors by Merge',
    accent: 'bg-teal-400/15 text-teal-300',
    videoUrl: decorsByMergeVideo,
  },
    {
    quote:
      'Managing a business is full of daily pressures, and trying to handle high-quality video production on top of it felt impossible. Partnering with Hiwaga Makers completely changed the game for Home Stories by Pioneer. They took over our social media content seamlessly, delivering gorgeous, high-end videos that our followers absolutely love. I’ve even had people reach out directly to ask who handles our production! They are professional, reliable, and highly recommended for any business owner looking to grow their digital presence without the stress.',
    author: 'Simi Babu',
    role: 'Founder',
    company: 'Home Stories by Pioneer',
    accent: 'bg-rose-400/15 text-rose-300',
    videoUrl: homeStoriesVideo,
  },
  {
    quote:
      'I used to be so camera-shy and hesitant about doing videos for my business, but working with Hiwaga Makers completely changed that! The team was incredibly supportive, patient, and made me feel so comfortable throughout the entire shoot. They truly understand that a business is like our own child and that we need the right partners to help it grow. If you’re a business owner looking for a creative team that offers genuine guidance and an amazing filming environment, I highly recommend Hiwaga Makers!',
    author: 'Kiara Apparels',
    role: 'Founder',
    company: 'Kiara Apparels',
    accent: 'bg-pink-400/15 text-pink-300',
    videoUrl: kiaraApparelsVideo,
  },
  {
    // TODO: Replace placeholder quote/author with the actual testimonial content.
    quote: 'We chose Hiwaga Makers through recommendations and research, and the experience has been excellent from the start. Their videos are professional, clear and widely appreciated by our audience. Beyond execution, the team consistently contributes valuable ideas that help improve communication and reach. I would happily recommend them to any business looking for a reliable marketing partner.',
    author: 'Krishna Prasad',
    role: 'Founder',
    company: 'S&S Interiors',
    accent: 'bg-sky-400/15 text-sky-300',
    videoUrl: ssInteriorsVideo,
  },
  {
    quote:
      'I was so nervous about being in front of the camera, but the team at Hiwaga Makers made the entire experience effortless! They actually did background research on my dental field beforehand, which allowed them to guide me through a natural conversation instead of making me memorize a script. The atmosphere on set was incredibly friendly and supportive. We ended up creating way more amazing content than I anticipated. Highly recommend them for any brand looking for a seamless, stress-free production experience!',
    author: 'Dr. Sreni K S',
    role: 'Founder',
    company: 'Bown Bee Kids Dental',
    accent: 'bg-indigo-400/15 text-indigo-300',
    videoUrl: '',
  },
  {
    quote:
      'For us, quality is non-negotiable. We had a clear strategy in mind — especially focusing on video content — but finding the right team was a real challenge. Online services are easy to find, but video production requires commitment, presence, and effort on-site. We needed a flexible, creative team that truly understood our vision without compromising on quality. When we met Hiwaga, the clarity and sensibility of their young team stood out immediately. They understood our needs from the very first meeting. Having a capable, reliable team in our own town is a huge advantage — I’m genuinely happy working with them.',
    author: 'Amal Rasheed',
    role: 'CEO',
    company: 'Allen & Habour Opticals',
    accent: 'bg-emerald-400/15 text-emerald-300',
    videoUrl: '',
  },
  {
    quote:
      'We began working with Hiwaga by placing complete trust in them — and that decision changed our growth trajectory. When we started, we had around 40,000 followers. Today, we have crossed 2 lakh followers, and our revenue has grown nearly 4–5x in just two years. Their availability, responsiveness, and 24/7 support made a huge difference. Whether it’s urgent posts, influencer collaborations, or brand positioning, they manage it end-to-end. Hiwaga has played a major role in building our brand visibility and scaling Kulina to where it is today.',
    author: 'Amal K Shaji & Jishnu Reji',
    role: 'Founders',
    company: 'Kulina Clothing',
    accent: 'bg-blue-400/15 text-blue-300',
    videoUrl: '',
  },
  {
    quote:
      'I’ve worked with Ananthu for over a decade, and later Hiwaga came on board as our creative partner. The improvement in quality, especially in visuals, has been remarkable. Their planning is precise. Even when shoots require long travel, they come fully prepared and extract maximum content in a single day — sometimes managing it efficiently for months. From social media and performance marketing to LinkedIn, YouTube, and Google pages, everything is handled end-to-end by their team. They are creative, strategic, and highly responsible — I never have to worry about follow-ups or execution.',
    author: 'Dr. Thrivikraman V',
    role: 'Founder & Chief Physician',
    company: 'Swetaranya Ayurvedasram',
    accent: 'bg-purple-400/15 text-purple-300',
    videoUrl: '',
  },
]

const avatarPositions = [
  { top: '38%', left: '8%' },
  { top: '18%', left: '24%' },
  { top: '60%', left: '40%' },
  { top: '10%', left: '60%' },
  { top: '46%', left: '78%' },
]

function initials(name) {
  return name
    .split(/[ &]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

function getYouTubeId(url) {
  const m = String(url).match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/,
  )
  return m ? m[1] : null
}

function getVimeoId(url) {
  const m = String(url).match(/vimeo\.com\/(\d+)/)
  return m ? m[1] : null
}

function TestimonialVideo({ url, title }) {
  if (!url) return null

  const ytId = getYouTubeId(url)
  if (ytId) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${ytId}?rel=0&modestbranding=1`}
        title={title}
        loading="lazy"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 h-full w-full object-contain"
      />
    )
  }

  const vimeoId = getVimeoId(url)
  if (vimeoId) {
    return (
      <iframe
        src={`https://player.vimeo.com/video/${vimeoId}?title=0&byline=0&portrait=0`}
        title={title}
        loading="lazy"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full object-contain"
      />
    )
  }

  // Direct video file
  return (
    <video
      src={url}
      controls
      muted
      playsInline
      preload="metadata"
      className="absolute inset-0 h-full w-full object-contain"
    />
  )
}

function AuthorBlock({ t }) {
  return (
    <div className="mt-6 flex items-center justify-between gap-3 pt-2 sm:mt-7">
      <div className="flex min-w-0 items-center gap-3">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold ring-1 ring-white/10 ${t.accent}`}
        >
          {initials(t.author)}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-white">{t.author}</p>
          <p className="truncate text-[11px] font-bold text-white sm:text-xs">
            {t.role}
          </p>
        </div>
      </div>
      <span className="shrink-0 text-right text-[11px] text-neutral-400 sm:text-xs">
        {t.company}
      </span>
    </div>
  )
}

function TestimonialCard({ t }) {
  const hasVideo = Boolean(t.videoUrl)

  return (
    <article
      className={`flex rounded-2xl border border-white/10 bg-neutral-900/60 transition-colors duration-300 hover:border-white/25 flex-col sm:flex-row items-stretch overflow-hidden`}
    >
      <div className="w-full sm:w-1/2 lg:w-2/5 flex-shrink-0 relative bg-black">
        {hasVideo ? (
          <div className="relative h-full w-full">
            <TestimonialVideo url={t.videoUrl} title={`${t.author} — Testimonial`} />
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-neutral-900/60 to-neutral-800/40 p-6">
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="rounded-full bg-white/6 p-4 text-4xl drop-shadow-md">🎬</div>
              <div className="text-sm italic text-neutral-300"></div>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7 min-w-0 sm:w-1/2 lg:w-3/5">
        <Quote
          aria-hidden="true"
          className="h-6 w-6 text-[#FFD700]/70 sm:h-7 sm:w-7"
          strokeWidth={1.4}
        />

        <div className="mt-4 text-sm italic leading-relaxed text-white/90 sm:text-[15px]">
          {t.quote}
        </div>

        <div className="mt-4">
          <AuthorBlock t={t} />
        </div>
      </div>
    </article>
  )
}

export default function Testimonials() {
  const scrollerRef = useRef(null)

  const scrollBy = (dir) => {
    const el = scrollerRef.current
    if (!el) return
    const card = el.querySelector('li')
    const step = card ? card.clientWidth + 24 : el.clientWidth * 0.8
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="bg-neutral-950 text-white"
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5 lg:pt-2">
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="h-px w-8 bg-neutral-500" />
                <h2
                  id="testimonials-heading"
                  className="text-pretty text-sm leading-relaxed text-neutral-400 sm:text-base md:text-lg font-medium"
                >
                  In Their Words
                </h2>
                <span aria-hidden="true" className="h-px w-8 bg-neutral-500" />
              </div>

              <p
                className="mt-6 font-display text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl md:text-5xl"
                style={{
                  fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1',
                }}
              >
                Stories from the brands{' '}
                <span className="font-light italic text-[#FFD700]">
                  we&apos;ve built with
                </span>
                .
              </p>
            </div>

            <div className="relative h-48 sm:h-56 lg:col-span-7 lg:h-auto lg:min-h-[220px]">
              <svg
                aria-hidden="true"
                viewBox="0 0 1200 240"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
              >
                {Array.from({ length: 8 }).map((_, i) => (
                  <path
                    key={i}
                    d={`M 0 ${190 - i * 4} Q 300 ${150 - i * 6} 600 ${110 - i * 7} T 1200 ${60 - i * 5}`}
                    fill="none"
                    stroke="rgba(255,215,0,0.22)"
                    strokeWidth="1"
                  />
                ))}
              </svg>

              {testimonials.map((t, i) => {
                const pos = avatarPositions[i] || {
                  top: '50%',
                  left: `${10 + i * 18}%`,
                }
                return (
                  <span
                    key={t.author}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={pos}
                  >
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-full text-xs font-semibold shadow-[0_6px_18px_rgba(0,0,0,0.5)] ring-2 ring-neutral-950 sm:h-14 sm:w-14 sm:text-sm ${t.accent}`}
                    >
                      {initials(t.author)}
                    </span>
                  </span>
                )
              })}
            </div>
          </div>

          <div className="relative mt-10 sm:mt-12">
            <ul
              ref={scrollerRef}
              role="list"
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:gap-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {testimonials.map((t) => (
                <li
                  key={t.author}
                  className="w-[90%] shrink-0 snap-start sm:w-[78%] lg:w-[62%]"
                >
                  <TestimonialCard t={t} />
                </li>
              ))}
            </ul>

            <div className="pointer-events-none absolute inset-y-0 left-0 hidden items-center pl-1 sm:flex">
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                aria-label="Previous testimonial"
                className="pointer-events-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-neutral-900 shadow-[0_8px_20px_rgba(0,0,0,0.4)] transition-colors hover:bg-neutral-100"
              >
                <ChevronLeft aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>

            <div className="pointer-events-none absolute inset-y-0 right-0 hidden items-center pr-1 sm:flex">
              <button
                type="button"
                onClick={() => scrollBy(1)}
                aria-label="Next testimonial"
                className="pointer-events-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-neutral-900 shadow-[0_8px_20px_rgba(0,0,0,0.4)] transition-colors hover:bg-neutral-100"
              >
                <ChevronRight aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 flex justify-end gap-2 sm:hidden">
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                aria-label="Previous testimonial"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-900 shadow-md"
              >
                <ChevronLeft aria-hidden="true" className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollBy(1)}
                aria-label="Next testimonial"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-900 shadow-md"
              >
                <ChevronRight aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
