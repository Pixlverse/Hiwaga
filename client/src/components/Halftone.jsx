export default function Halftone() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-20 block"
      style={{
        backgroundImage:
          "radial-gradient(rgba(255,215,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.35), rgba(0,0,0,0.35))",
        backgroundSize: '12px 12px, 100% 100%',
        backgroundRepeat: 'repeat, no-repeat',
        opacity: 0.6,
      }}
    />
  )
}
