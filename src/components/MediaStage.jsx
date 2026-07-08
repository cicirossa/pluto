import { useEffect, useMemo, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PhotoAnimator from './PhotoAnimator'
import { PHOTOS } from '../data/photos'
import { useTimeline } from '../context/TimelineContext'

// MediaStage (V3 §7): a dedicated cinematic stage — never a fullscreen bg.
// A hero memory holds visual focus; secondary memories stay layered behind.
// Composition fullness follows the song's emotional phase (V3 §3).
const PHASE = {
  beginning: { count: 1, energy: 0.2 },
  middle: { count: 2, energy: 0.55 },
  climax: { count: 3, energy: 1.0 },
  ending: { count: 1, energy: 0.35 },
}

// Slot 0 is always the hero (centred, front, largest). The rest sit behind it.
const LAYOUTS = {
  1: [
    { top: '14%', left: '26%', width: '48%', rotate: -1.5, z: 5, depth: 0.6, tape: [{ top: '-10px', left: '42%', rotate: -5 }] },
  ],
  2: [
    { top: '16%', left: '30%', width: '46%', rotate: -1.5, z: 5, depth: 0.6 },
    { top: '30%', left: '6%', width: '30%', rotate: -5, z: 2, depth: 0.9 },
  ],
  3: [
    { top: '18%', left: '32%', width: '44%', rotate: -1.5, z: 5, depth: 0.55 },
    { top: '12%', left: '5%', width: '28%', rotate: -6, z: 2, depth: 0.95 },
    { top: '46%', left: '66%', width: '27%', rotate: 5, z: 2, depth: 0.85 },
  ],
}

export default function MediaStage() {
  const { activeIndex, phase } = useTimeline()
  const pointer = useRef({ x: 0.5, y: 0.5 })
  const stageRef = useRef(null)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const onMove = (e) => {
      const r = stage.getBoundingClientRect()
      pointer.current = {
        x: (e.clientX - r.left) / r.width,
        y: (e.clientY - r.top) / r.height,
      }
    }
    stage.addEventListener('mousemove', onMove)
    return () => stage.removeEventListener('mousemove', onMove)
  }, [])

  const { count, energy } = PHASE[phase] ?? PHASE.beginning
  const layout = LAYOUTS[count]

  // Captions (photos 1–3) show only the FIRST time each photo appears. Once the
  // hero moves on, that photo's caption is marked seen and never returns.
  const captionSeen = useRef(new Set())

  // Rotating window into the 12 photos, keyed to the lyric line: memories
  // advance with the song and reappear later in new arrangements. Deterministic
  // (no randomness — V3 §10).
  const shown = useMemo(() => {
    const step = Math.floor(Math.max(0, activeIndex) / 2)
    return layout.map((slot, i) => {
      const photo = PHOTOS[(step + i * 5) % PHOTOS.length]
      const tier = i === 0 ? 'hero' : 'secondary'
      const showCaption =
        tier === 'hero' && !!photo.caption && !captionSeen.current.has(photo.id)
      return {
        slot,
        photo,
        key: `${photo.id}-${i}`,
        tier,
        caption: showCaption ? photo.caption : null,
      }
    })
  }, [activeIndex, layout])

  const isDirect = typeof window !== 'undefined' && window.location.hash.slice(1) === 'main'
  const entranceDelay = isDirect ? 0.2 : 1.55

  // When the hero changes, retire the previous hero's caption (shown once).
  const heroId = shown[0]?.photo?.id
  const prevHeroRef = useRef(null)
  useEffect(() => {
    if (prevHeroRef.current != null && prevHeroRef.current !== heroId) {
      captionSeen.current.add(prevHeroRef.current)
    }
    prevHeroRef.current = heroId ?? null
  }, [heroId])

  return (
    <motion.div
      ref={stageRef}
      className="relative h-full w-full overflow-hidden"
      style={{ perspective: '1300px' }}
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 4.2, ease: [0.22, 1, 0.36, 1], delay: entranceDelay }}
    >
      {/* stage floor glow that the projector beam lands on */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 45% at 50% 32%, rgba(226,196,119,0.10), transparent 70%)',
        }}
      />
      <AnimatePresence mode="popLayout">
        {shown.map(({ slot, photo, key, tier, caption }) => (
          <PhotoAnimator
            key={key}
            photo={photo}
            slot={slot}
            energy={energy}
            pointer={pointer}
            tier={tier}
            caption={caption}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  )
}
