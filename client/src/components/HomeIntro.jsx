import { useEffect, useState } from 'react'

export default function HomeIntro({ onComplete }) {
  const [stage, setStage] = useState(0)
  // 0 = mount, 1 = line 1 in, 2 = line 2 in, 3 = line 3 in, 4 = fade out

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 150),
      setTimeout(() => setStage(2), 500),
      setTimeout(() => setStage(3), 850),
      setTimeout(() => setStage(4), 2000),
      setTimeout(() => onComplete && onComplete(), 2600),
    ]
    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  const fadingOut = stage >= 4

  const lineCls = (active) =>
    `block transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
      active ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
    }`

  return (
    <div
      aria-hidden={fadingOut}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-neutral-950 px-4 transition-all duration-500 ease-out ${
        fadingOut
          ? 'pointer-events-none scale-[1.04] opacity-0'
          : 'pointer-events-auto opacity-100'
      }`}
    >
      {/* Soft radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 mx-auto h-[28rem] max-w-3xl -translate-y-1/2 opacity-40 blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, rgba(255,215,0,0.10), rgba(255,255,255,0.06) 30%, rgba(255,255,255,0) 70%)',
        }}
      />

      <h2
        className="relative text-balance text-center font-display text-4xl font-light leading-[1.15] tracking-wide text-white sm:text-6xl md:text-7xl lg:text-[7rem]"
        style={{ fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1' }}
      >
        <span className={lineCls(stage >= 1)}>
          <span className="font-bold text-white/75">Purposefully</span>{' '}
          <span className="font-bold uppercase tracking-wider text-[#FFD700]">
            Creative
          </span>
          <span className="text-[#FFD700]/40">.</span>
        </span>
        <span className={`mt-3 sm:mt-5 md:mt-6 ${lineCls(stage >= 2)}`}>
          <span className="font-bold text-white/75">Strategically</span>{' '}
          <span className="font-bold uppercase tracking-wider text-[#FFD700]">
            Curious
          </span>
          <span className="text-[#FFD700]/40">.</span>
        </span>
        <span className={`mt-3 sm:mt-5 md:mt-6 ${lineCls(stage >= 3)}`}>
          <span className="font-bold text-white/75">Consistently</span>{' '}
          <span className="font-bold uppercase tracking-wider text-[#FFD700]">
            Impactful
          </span>
          <span className="text-[#FFD700]/40">.</span>
        </span>
      </h2>
    </div>
  )
}
