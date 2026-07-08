import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useFrame } from '../context/TimelineContext'

// A single projected memory: paper border, warm shadow, animated golden glow,
// tiny rotation, V3 idle motion (float 5–8px, rotate ±1.5°, zoom 1.00→1.08 over
// 12–18s, pan ≤5%), mouse parallax, and a macOS-style hover lift.
// `tier`: 'hero' (front, in focus) | 'secondary' (layered behind, dimmer/soft).
const DEFAULT_TAPE = [{ top: '-10px', left: '40%', rotate: -6 }]

export default function PhotoAnimator({ photo, slot, energy = 0.5, pointer, tier = 'hero', caption = null }) {
  const ref = useRef(null)
  const isHero = tier === 'hero'

  // Mouse parallax — depth scaled by slot.depth and current energy.
  useFrame(
    () => {
      const el = ref.current
      if (!el || !pointer) return
      const depth = (slot.depth ?? 0.5) * (0.4 + energy * 0.9)
      const px = (pointer.current.x - 0.5) * 24 * depth
      const py = (pointer.current.y - 0.5) * 16 * depth
      el.style.setProperty('--px', `${px}px`)
      el.style.setProperty('--py', `${py}px`)
    },
    [slot, energy, pointer],
  )

  // Idle motion durations within the V3 12–18s window (a touch faster w/ energy).
  const zoomDur = 17 - energy * 5
  const floatDur = 8 - energy * 2.5

  return (
    <motion.figure
      layout
      initial={{ opacity: 0, scale: 0.9, y: 22, rotate: slot.rotate * 1.4 }}
      animate={{ opacity: isHero ? 1 : 0.82, scale: 1, y: 0, rotate: slot.rotate }}
      exit={{ opacity: 0, scale: 0.94, y: -16, transition: { duration: 0.8 } }}
      transition={{ type: 'spring', stiffness: 110, damping: 22, mass: 1 }}
      className="absolute"
      style={{
        top: slot.top,
        left: slot.left,
        width: slot.width,
        zIndex: slot.z ?? 1,
      }}
    >
      {/* float layer */}
      <motion.div
        animate={{ y: [0, -(5 + energy * 3), 0] }}
        transition={{ duration: floatDur, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.div
          ref={ref}
          className={`group relative cursor-pointer will-change-transform ${isHero ? 'golden-glow' : ''} rounded-[4px]`}
          whileHover={{ scale: 1.045, rotate: 0, transition: { type: 'spring', stiffness: 240, damping: 18 } }}
          style={{ transform: 'translate3d(var(--px,0), var(--py,0), 0)' }}
        >
          {/* paper mat / border */}
          <div
            className="shadow-scrap rounded-[3px] bg-paper p-2 pb-6 transition-shadow duration-500"
            style={{
              filter: isHero
                ? 'none'
                : 'brightness(0.82) saturate(0.9) blur(0.6px)',
            }}
          >
            <div className="relative overflow-hidden rounded-[2px] bg-brown-deep/10">
              <motion.img
                src={photo.src}
                alt=""
                loading="lazy"
                className="block h-full w-full object-cover"
                style={{ willChange: 'transform' }}
                animate={{ scale: [1.0, 1.08, 1.0], x: ['0%', '-4%', '0%'], y: ['0%', '3%', '0%'] }}
                transition={{ duration: zoomDur, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-brown-deep/20" />
            </div>
          </div>

          {/* washi tape */}
          {(slot.tape ?? DEFAULT_TAPE).map((t, i) => (
            <div
              key={i}
              className="absolute h-6 w-16 bg-gold/30 shadow-sm backdrop-blur-[1px]"
              style={{
                top: t.top,
                left: t.left,
                right: t.right,
                transform: `rotate(${t.rotate}deg)`,
                borderLeft: '1px dashed rgba(255,255,255,0.4)',
                borderRight: '1px dashed rgba(255,255,255,0.4)',
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* One-time caption card — blurred glass with a paper outline that echoes
          the photo frame, and softly shadowed text. Editable placeholder. */}
      {caption && (
        <motion.figcaption
          className="absolute left-1/2 top-full z-20 mt-4 w-[88%] -translate-x-1/2"
          initial={{ opacity: 0, y: 12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, transition: { duration: 0.5 } }}
          transition={{ delay: 0.55, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* paper mat, mirroring the photo's outline */}
          <div className="shadow-scrap rounded-[4px] bg-paper/80 p-1.5 backdrop-blur-md">
            <div className="rounded-[2px] px-4 py-2.5 text-center ring-1 ring-brown/15">
              <p
                className="font-serif text-[0.95rem] leading-snug text-brown sm:text-base"
                style={{
                  textShadow:
                    '0 1px 10px rgba(245,235,217,0.9), 0 1px 2px rgba(58,44,34,0.2)',
                }}
              >
                {caption}
              </p>
            </div>
          </div>
        </motion.figcaption>
      )}
    </motion.figure>
  )
}
