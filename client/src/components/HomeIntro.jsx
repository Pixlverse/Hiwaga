import { useCallback, useEffect, useRef, useState } from 'react'

const STATEMENTS = [
  { lead: 'Purposefully', key: 'Creative' },
  { lead: 'Strategically', key: 'Curious' },
  { lead: 'Consistently', key: 'Impactful' },
]

const EASE = 'cubic-bezier(0.76,0,0.24,1)'

// Timeline (ms). Loading runs first, then the progress hairline stretches
// across the screen and the two halves of the overlay split open.
const LOAD_MS = 3000
const LINE_MS = 450
const SPLIT_MS = 850

const easeInOut = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

export default function HomeIntro({ onReveal, onComplete }) {
  const rootRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState(0)
  // loading -> line -> split
  const [phase, setPhase] = useState('loading')
  const skipRef = useRef(false)

  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  // Drive the counter + statement rotation from a single rAF clock.
  useEffect(() => {
    const total = reduced ? 900 : LOAD_MS
    let raf
    const start = performance.now()
    const tick = (now) => {
      const t = skipRef.current ? 1 : Math.min((now - start) / total, 1)
      setProgress(Math.round(easeInOut(t) * 100))
      setActive(Math.min(Math.floor(t * 3), 2))
      if (t < 1) raf = requestAnimationFrame(tick)
      else setPhase('line')
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduced])

  useEffect(() => {
    if (phase === 'line') {
      const t = setTimeout(() => setPhase('split'), reduced ? 0 : LINE_MS + 400)
      return () => clearTimeout(t)
    }
    if (phase === 'split') {
      onReveal?.()
      const t = setTimeout(() => onComplete?.(), reduced ? 300 : SPLIT_MS)
      return () => clearTimeout(t)
    }
  }, [phase, reduced, onReveal, onComplete])

  // Lock scroll while the intro is on screen.
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  const skip = useCallback(() => {
    skipRef.current = true
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', skip)
    return () => window.removeEventListener('keydown', skip)
  }, [skip])

  // Cursor-reactive glow + slight parallax, written straight to CSS vars.
  const handleMove = (e) => {
    const el = rootRef.current
    if (!el) return
    el.style.setProperty('--ix', `${e.clientX}px`)
    el.style.setProperty('--iy', `${e.clientY}px`)
    el.style.setProperty('--ipx', `${(e.clientX / window.innerWidth - 0.5) * 2}`)
    el.style.setProperty('--ipy', `${(e.clientY / window.innerHeight - 0.5) * 2}`)
  }

  const loading = phase === 'loading'
  const splitting = phase === 'split'

  const half = (side) => ({
    transform: splitting
      ? `translateY(${side === 'top' ? '-100%' : '100%'})`
      : 'translateY(0)',
    transition: `transform ${SPLIT_MS}ms ${EASE}`,
  })

  return (
    <div
      ref={rootRef}
      role="status"
      aria-live="polite"
      onPointerMove={handleMove}
      onClick={skip}
      className={`fixed inset-0 z-[100] select-none font-hero ${
        splitting ? 'pointer-events-none' : 'cursor-pointer'
      }`}
      style={{ '--ix': '50vw', '--iy': '50vh', '--ipx': 0, '--ipy': 0 }}
    >
      <span className="sr-only">Loading Hiwaga Makers</span>

      {/* Overlay halves — they part to reveal the hero underneath */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-neutral-950" style={half('top')} />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-neutral-950" style={half('bottom')} />

      {/* Cursor glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: loading ? 1 : 0,
          background:
            'radial-gradient(420px circle at var(--ix) var(--iy), rgba(255,215,0,0.09), transparent 70%)',
        }}
      />

      {/* Centre hairline that stretches edge-to-edge before the split */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2"
        style={{
          background:
            'linear-gradient(90deg, transparent, #FFD700 20%, #FFF3B0 50%, #FFD700 80%, transparent)',
          boxShadow: '0 0 18px 2px rgba(255,215,0,0.55)',
          transform: `scaleX(${phase === 'loading' ? 0 : 1})`,
          opacity: splitting ? 0 : 1,
          transition: `transform ${LINE_MS}ms ${EASE} 250ms, opacity 500ms ease ${
            splitting ? 250 : 0
          }ms`,
        }}
      />

      {/* Loader card */}
      <div
        className="absolute left-1/2 top-1/2 w-[min(86vw,25rem)]"
        style={{
          transform: `translate(calc(-50% + var(--ipx) * 8px), calc(-50% + var(--ipy) * 8px))`,
          opacity: loading ? 1 : 0,
          transition: 'opacity 220ms ease',
        }}
      >
        <div className="flex items-center justify-between text-[10px] font-medium uppercase tracking-[0.28em] text-neutral-500">
          <span>
            <span className="text-[#FFD700]">0{active + 1}</span>
            <span className="text-neutral-600"> / 03</span>
          </span>
          <span>Hiwaga Makers</span>
        </div>

        {/* Statement slot — each line slides through a mask */}
        <div className="relative mt-4 h-[2.6rem] overflow-hidden sm:h-12">
          {STATEMENTS.map((s, i) => {
            const offset = i < active ? '-110%' : i > active ? '110%' : '0%'
            return (
              <p
                key={s.key}
                aria-hidden={i !== active}
                className="absolute inset-0 flex items-baseline gap-2.5 whitespace-nowrap text-[1.75rem] font-bold leading-[1.35] tracking-[-0.03em] sm:text-4xl sm:leading-[1.3]"
              >
                <span
                  className="inline-block text-white/70"
                  style={{
                    transform: `translateY(${offset})`,
                    transition: `transform 620ms ${EASE}`,
                  }}
                >
                  {s.lead}
                </span>
                <span
                  className="inline-block text-[#FFD700]"
                  style={{
                    transform: `translateY(${offset})`,
                    transition: `transform 620ms ${EASE} 70ms`,
                  }}
                >
                  {s.key}
                  <span className="text-[#FFD700]/40">.</span>
                </span>
              </p>
            )
          })}
        </div>

        {/* Progress */}
        <div className="mt-6 flex items-center gap-4">
          <div className="relative h-px flex-1 bg-white/10">
            <div
              className="absolute inset-y-0 left-0 bg-[#FFD700]"
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFF3B0]"
              style={{
                left: `${progress}%`,
                boxShadow: '0 0 12px 3px rgba(255,215,0,0.7)',
              }}
            />
          </div>
          <span className="w-9 text-right text-xs font-semibold tabular-nums text-white/80">
            {String(progress).padStart(3, '0')}
          </span>
        </div>

        <div className="mt-3 flex gap-1.5">
          {STATEMENTS.map((s, i) => (
            <span
              key={s.key}
              className="h-0.5 flex-1 rounded-full transition-colors duration-500"
              style={{
                background: i <= active ? 'rgba(255,215,0,0.55)' : 'rgba(255,255,255,0.08)',
              }}
            />
          ))}
        </div>
      </div>

      <p
        className="absolute inset-x-0 bottom-8 text-center text-[10px] uppercase tracking-[0.3em] text-neutral-600 transition-opacity duration-300"
        style={{ opacity: loading ? 1 : 0 }}
      >
        Click anywhere to skip
      </p>
    </div>
  )
}
