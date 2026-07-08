import { forwardRef, useEffect, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/* -------------------------------------------------------------------------
   All overlays are pointer-events:none, fixed, GPU-friendly (opacity/transform).
   `intensity` (0..1) lets the TimelineEngine dial grain / leaks with the music.
--------------------------------------------------------------------------- */

// SVG fractal-noise film grain that shifts each ~animation step.
export function FilmGrain({ opacity = 0.06 }) {
  const reduced = useReducedMotion()
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] mix-blend-multiply"
      style={{ opacity }}
    >
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          >
            {!reduced && (
              <animate
                attributeName="seed"
                values="1;7;3;9;2;6"
                dur="0.7s"
                repeatCount="indefinite"
                calcMode="discrete"
              />
            )}
          </feTurbulence>
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  )
}

export function Vignette() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[55]"
      style={{
        background:
          'radial-gradient(120% 100% at 50% 40%, transparent 55%, rgba(58,44,34,0.28) 100%)',
      }}
    />
  )
}

export function PaperTexture() {
  return <div aria-hidden className="paper-texture pointer-events-none fixed inset-0 z-0" />
}

// Very subtle drifting light leaks; opacity scaled by intensity.
export function LightLeaks({ intensity = 0.4 }) {
  const reduced = useReducedMotion()
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[58] overflow-hidden">
      <div
        className="absolute -left-40 -top-40 h-[60vmax] w-[60vmax] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(204,122,59,0.5), transparent 60%)',
          opacity: 0.12 + intensity * 0.22,
          animation: reduced ? 'none' : 'leakA 26s var(--ease-cinematic) infinite alternate',
        }}
      />
      <div
        className="absolute -right-40 bottom-[-20vmax] h-[55vmax] w-[55vmax] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(227,169,160,0.5), transparent 60%)',
          opacity: 0.1 + intensity * 0.22,
          animation: reduced ? 'none' : 'leakB 32s var(--ease-cinematic) infinite alternate',
        }}
      />
      <style>{`
        @keyframes leakA { from { transform: translate3d(0,0,0) scale(1); } to { transform: translate3d(8vw,6vh,0) scale(1.15); } }
        @keyframes leakB { from { transform: translate3d(0,0,0) scale(1.05); } to { transform: translate3d(-6vw,-8vh,0) scale(1); } }
      `}</style>
    </div>
  )
}

// Floating dust motes on a canvas — cheap, self-contained, honours reduced motion.
export function DustParticles({ count = 40, intensity = 0.5 }) {
  const canvasRef = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf
    let running = true
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
    }
    resize()
    window.addEventListener('resize', resize)

    const motes = Array.from({ length: count }, (_, i) => ({
      x: ((i * 97) % 100) / 100,
      y: ((i * 53) % 100) / 100,
      r: (((i * 7) % 5) + 1) * 0.5 * dpr,
      sx: (((i % 5) - 2) / 2) * 0.02,
      sy: -(((i % 3) + 1) / 3) * 0.03,
      a: (((i * 13) % 40) + 20) / 100,
    }))

    const draw = () => {
      if (!running) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const m of motes) {
        m.x += m.sx / 100
        m.y += m.sy / 100
        if (m.y < -0.02) m.y = 1.02
        if (m.x < -0.02) m.x = 1.02
        if (m.x > 1.02) m.x = -0.02
        ctx.beginPath()
        ctx.arc(m.x * canvas.width, m.y * canvas.height, m.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(245,235,217,${m.a * (0.4 + intensity * 0.6)})`
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [count, intensity, reduced])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[57] h-full w-full"
    />
  )
}

/* -------------------------------------------------------------------------
   Film-projector simulation (V3). Subtle by design.
--------------------------------------------------------------------------- */

// Soft projector light-cone falling over the media stage. forwardRef so the
// opening→main transition can brighten it via GSAP.
export const ProjectorBeam = forwardRef(function ProjectorBeam(
  { intensity = 0.6, style },
  ref,
) {
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[52] overflow-hidden"
      style={style}
    >
      {/* wide cone from the top */}
      <div
        className="absolute left-1/2 top-[-30vh] h-[150vh] w-[85vw] -translate-x-1/2"
        style={{
          background:
            'conic-gradient(from 180deg at 50% 0%, transparent 65deg, rgba(226,196,119,0.10) 80deg, rgba(245,235,217,0.16) 90deg, rgba(226,196,119,0.10) 100deg, transparent 115deg)',
          filter: 'blur(28px)',
          opacity: 0.4 + intensity * 0.6,
          mixBlendMode: 'screen',
        }}
      />
      {/* soft bloom hotspot where the beam lands */}
      <div
        className="absolute left-1/2 top-[8%] h-[45vmax] w-[45vmax] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(245,235,217,0.22), transparent 60%)',
          opacity: 0.3 + intensity * 0.5,
          mixBlendMode: 'screen',
        }}
      />
    </div>
  )
})

// Faint brightness flutter, like an old projector lamp.
export function ProjectorFlicker() {
  const reduced = useReducedMotion()
  if (reduced) return null
  return (
    <div
      aria-hidden
      className="proj-flicker pointer-events-none fixed inset-0 z-[59] bg-white mix-blend-overlay"
    />
  )
}

// A couple of thin drifting film scratches.
export function FilmScratches() {
  const reduced = useReducedMotion()
  if (reduced) return null
  const lines = [
    { left: '22%', width: '1px', dur: '7s', delay: '0s', color: 'rgba(255,255,255,0.5)' },
    { left: '61%', width: '1px', dur: '11s', delay: '3s', color: 'rgba(58,44,34,0.4)' },
    { left: '84%', width: '2px', dur: '9s', delay: '1.5s', color: 'rgba(255,255,255,0.35)' },
  ]
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[58] overflow-hidden">
      {lines.map((l, i) => (
        <span
          key={i}
          className="absolute top-0 h-full"
          style={{
            left: l.left,
            width: l.width,
            background: l.color,
            animation: `filmScratch ${l.dur} linear ${l.delay} infinite`,
          }}
        />
      ))}
    </div>
  )
}

// Wrap the projected stage so the whole frame weaves like real film.
export function GateWeave({ children, className = '' }) {
  const reduced = useReducedMotion()
  return (
    <div className={`${reduced ? '' : 'gate-weave'} ${className}`} style={{ willChange: 'transform' }}>
      {children}
    </div>
  )
}
