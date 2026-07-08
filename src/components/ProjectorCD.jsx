import { forwardRef } from 'react'
import { albumCover } from '../data/photos'

// The vintage CD. Two nested layers on purpose:
//   - outer wrapper (forwardRef): GSAP animates position/scale during the
//     continuous-shot transition — NO rotation here.
//   - inner disc: rotates forever via CSS (`spinning`), so translate/scale and
//     rotation never fight over the same transform.
// `size` sets the resting diameter; `showPlay` toggles the centre play button.
const ProjectorCD = forwardRef(function ProjectorCD(
  { size = 280, spinning = true, fast = false, showPlay = true, onClick, className = '', style },
  ref,
) {
  return (
    <div
      ref={ref}
      className={`relative ${onClick ? 'cursor-pointer' : ''} ${className}`}
      style={{ width: size, height: size, willChange: 'transform', ...style }}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      aria-label={onClick ? 'Play and begin' : undefined}
    >
      {/* ground shadow */}
      <div className="absolute inset-x-[12%] bottom-[-6%] h-[8%] rounded-full bg-brown-deep/25 blur-xl" />

      {/* spinning disc */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          animation: spinning ? `cdspin ${fast ? 2.4 : 13}s linear infinite` : 'none',
          willChange: 'transform',
        }}
      >
        <div className="absolute inset-0 overflow-hidden rounded-full shadow-scrap-lift ring-1 ring-black/10">
          <img src={albumCover} alt="" className="h-full w-full object-cover" />
          {/* CD sheen */}
          <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,rgba(255,255,255,0.35),transparent_25%,rgba(255,255,255,0.15)_50%,transparent_75%,rgba(255,255,255,0.3))] opacity-70 mix-blend-screen" />
          <div className="absolute inset-0 rounded-full ring-[8px] ring-black/5" />
        </div>
        {/* hub */}
        <div className="absolute left-1/2 top-1/2 h-[22%] w-[22%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-paper shadow-inner ring-4 ring-black/10" />
        <div className="absolute left-1/2 top-1/2 h-[7%] w-[7%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brown-deep/70" />
      </div>

      {/* upright play button (does not rotate) */}
      {/* cdspin keyframe is defined globally in index.css */}
      {showPlay && (
        <div className="pointer-events-none absolute left-1/2 top-1/2 flex h-[24%] w-[24%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full glass shadow-scrap">
          <svg viewBox="0 0 24 24" fill="none" className="ml-[6%] h-[45%] w-[45%]">
            <path d="M6 4.5 L20 12 L6 19.5 Z" fill="#7a4f35" />
          </svg>
        </div>
      )}
    </div>
  )
})

export default ProjectorCD
