import { forwardRef, useRef } from 'react'
import { motion } from 'framer-motion'
import { albumCover } from '../data/photos'
import { SONG, SECTIONS } from '../data/lyrics'
import { useAudio } from '../context/AudioContext'
import { useFrame } from '../context/TimelineContext'

function fmt(t) {
  if (!isFinite(t) || t < 0) t = 0
  const m = Math.floor(t / 60)
  const s = Math.floor(t % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

function IconButton({ children, onClick, label, primary }) {
  return (
    <motion.button
      onClick={onClick}
      aria-label={label}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      className={
        primary
          ? 'flex h-11 w-11 items-center justify-center rounded-full bg-brown text-paper shadow-scrap'
          : 'flex h-9 w-9 items-center justify-center rounded-full text-ink/70 hover:text-ink'
      }
    >
      {children}
    </motion.button>
  )
}

// Fixed 110px Spotify-inspired footer (V3 §11). The album CD slot is the dock
// target for the opening continuous-shot; `slotRef` exposes it for measurement
// and `docked` reveals the footer's own rotating disc once the flight lands.
const FooterPlayer = forwardRef(function FooterPlayer(
  { slotRef, docked = true, onOpenMessages },
  ref,
) {
  const { toggle, seek, isPlaying, duration, getTime } = useAudio()
  const fillRef = useRef(null)
  const timeRef = useRef(null)

  useFrame(({ time, progress }) => {
    if (fillRef.current) fillRef.current.style.width = `${progress * 100}%`
    if (timeRef.current) timeRef.current.textContent = fmt(time)
  }, [])

  const scrub = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    const ratio = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width))
    seek(ratio * (duration || 0))
  }

  const jump = (dir) => {
    const t = getTime()
    if (dir < 0) {
      const prev = [...SECTIONS].reverse().find((s) => s.time < t - 1.2)
      seek(prev ? prev.time : 0)
    } else {
      const next = SECTIONS.find((s) => s.time > t + 0.2)
      seek(next ? next.time : duration || t)
    }
  }

  return (
    <footer
      ref={ref}
      className="glass z-40 flex h-[110px] w-full items-center gap-4 px-4 shadow-scrap md:px-8"
    >
      {/* Now playing — album CD dock slot */}
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div ref={slotRef} className="relative h-16 w-16 shrink-0">
          {/* footer's own rotating disc, shown once docked */}
          <div
            className="absolute inset-0 overflow-hidden rounded-full shadow-scrap ring-1 ring-black/10 transition-opacity duration-500"
            style={{
              opacity: docked ? 1 : 0,
              animation: 'cdspin 13s linear infinite',
            }}
          >
            <img src={albumCover} alt="album cover" className="h-full w-full object-cover" />
            <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,rgba(255,255,255,0.3),transparent_25%,rgba(255,255,255,0.12)_50%,transparent_75%,rgba(255,255,255,0.25))] opacity-60 mix-blend-screen" />
            <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-paper ring-2 ring-black/10" />
          </div>
        </div>
        <div className="min-w-0">
          <p className="truncate font-serif text-lg text-brown md:text-xl">{SONG.title}</p>
          <p className="truncate text-xs text-ink/60">{SONG.artist}</p>
        </div>
      </div>

      {/* Transport */}
      <div className="flex items-center gap-1 md:gap-2">
        <IconButton label="Previous" onClick={() => jump(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 6v12H5V6h2zm12 0v12l-9-6 9-6z" />
          </svg>
        </IconButton>
        <IconButton label={isPlaying ? 'Pause' : 'Play'} onClick={toggle} primary>
          {isPlaying ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 5l12 7-12 7V5z" />
            </svg>
          )}
        </IconButton>
        <IconButton label="Next" onClick={() => jump(1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 6v12h2V6h-2zM5 6v12l9-6-9-6z" />
          </svg>
        </IconButton>
      </div>

      {/* Progress (desktop) */}
      <div className="hidden flex-1 items-center gap-3 lg:flex">
        <span ref={timeRef} className="w-9 text-right text-xs tabular-nums text-ink/60">
          0:00
        </span>
        <div
          onClick={scrub}
          className="group relative h-1.5 flex-1 cursor-pointer rounded-full bg-ink/15"
        >
          <div ref={fillRef} className="absolute inset-y-0 left-0 rounded-full bg-brown" style={{ width: '0%' }}>
            <span className="absolute -right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-brown opacity-0 shadow transition-opacity group-hover:opacity-100" />
          </div>
        </div>
        <span className="w-9 text-xs tabular-nums text-ink/60">{fmt(duration)}</span>
      </div>

      {/* Cici's Messages pill (replaces volume — V3 §11) */}
      <motion.button
        onClick={onOpenMessages}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 400, damping: 16 }}
        className="flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-orange to-gold px-4 py-2.5 text-paper shadow-scrap"
        style={{ boxShadow: '0 6px 20px rgba(201,162,75,0.35)' }}
      >
        <span className="text-sm font-medium">Cici's Messages</span>
        <span className="rounded-full bg-paper/25 px-2 py-0.5 text-[0.7rem] uppercase tracking-wide">
          Click!
        </span>
      </motion.button>
    </footer>
  )
})

export default FooterPlayer
