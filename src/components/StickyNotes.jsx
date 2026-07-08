import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { STICKY_NOTES } from '../data/content'

const NOTE_COLORS = [
  'var(--color-pink)',
  '#f2d9a6',
  'var(--color-orange)',
  '#cfd6a3',
  '#e9c7bd',
]

// Scattered resting positions for the spread-out notes (percent of overlay).
const SPOTS = [
  { top: '12%', left: '10%', rot: -6 },
  { top: '18%', left: '34%', rot: 4 },
  { top: '10%', left: '58%', rot: -3 },
  { top: '20%', left: '78%', rot: 7 },
  { top: '42%', left: '20%', rot: 5 },
  { top: '46%', left: '46%', rot: -5 },
  { top: '40%', left: '70%', rot: 3 },
  { top: '66%', left: '14%', rot: -4 },
  { top: '68%', left: '42%', rot: 6 },
  { top: '64%', left: '68%', rot: -7 },
]

function Note({ note, spot, color, index }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.button
      onClick={() => setOpen((v) => !v)}
      className="absolute h-40 w-40 origin-bottom cursor-pointer select-none rounded-sm p-4 text-left shadow-scrap"
      style={{
        top: spot.top,
        left: spot.left,
        background: color,
        transformStyle: 'preserve-3d',
      }}
      initial={{ opacity: 0, scale: 0.4, y: 40, rotate: 0 }}
      animate={{ opacity: 1, scale: 1, y: 0, rotate: spot.rot }}
      exit={{ opacity: 0, scale: 0.5, y: 30 }}
      transition={{
        type: 'spring',
        stiffness: 320,
        damping: 18,
        delay: index * 0.05,
      }}
      whileHover={{ scale: 1.06, rotate: 0, zIndex: 30 }}
    >
      {/* little tape strip */}
      <span className="absolute -top-2 left-1/2 h-4 w-12 -translate-x-1/2 bg-white/40" />
      <AnimatePresence mode="wait" initial={false}>
        {open ? (
          <motion.p
            key="msg"
            initial={{ rotateX: 90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: -90, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="font-serif text-[0.95rem] leading-snug text-brown-deep"
          >
            {note.message}
          </motion.p>
        ) : (
          <motion.span
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex h-full w-full items-center justify-center font-serif text-2xl text-brown-deep/80"
          >
            {note.preview}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

// Controlled overlay — the trigger now lives in the footer pill (V3 §11/§12).
export default function StickyNotes({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-brown-deep/45 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div
            className="relative h-full w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            {STICKY_NOTES.map((note, i) => (
              <Note
                key={i}
                index={i}
                note={note}
                spot={SPOTS[i]}
                color={NOTE_COLORS[i % NOTE_COLORS.length]}
              />
            ))}
            <motion.button
              onClick={onClose}
              className="glass absolute right-4 top-4 z-40 rounded-full px-4 py-2 text-sm text-brown shadow-scrap"
              whileHover={{ scale: 1.05 }}
            >
              close ✕
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
