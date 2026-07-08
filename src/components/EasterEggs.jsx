import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Tasteful hidden interactions (PRD): camera, envelope, vinyl, film roll, tiny
// letters. Each is a small emoji tucked in a corner; clicking pops a whisper.
const EGGS = [
  { icon: '📷', pos: 'top-4 left-4', note: 'say cheese — this one is my favourite of you.' },
  { icon: '✉️', pos: 'top-4 right-24', note: "there's a letter waiting for you at the very end." },
  { icon: '💿', pos: 'bottom-40 left-6', note: 'our song, on repeat, forever.' },
  { icon: '🎞️', pos: 'top-1/2 left-3', note: 'every frame of us is worth keeping.' },
  { icon: '💌', pos: 'bottom-44 left-1/2', note: 'p.s. i love you. always have.' },
]

function Egg({ icon, pos, note }) {
  const [show, setShow] = useState(false)
  return (
    <div className={`pointer-events-auto fixed z-30 ${pos}`}>
      <motion.button
        onClick={() => setShow((v) => !v)}
        className="text-lg opacity-25 transition-opacity hover:opacity-90"
        whileHover={{ scale: 1.3, rotate: 8 }}
        whileTap={{ scale: 0.9 }}
        aria-label="hidden note"
      >
        {icon}
      </motion.button>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="glass absolute left-1/2 top-8 w-52 -translate-x-1/2 rounded-lg px-3 py-2 text-center font-serif text-sm text-brown shadow-scrap"
          >
            {note}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function EasterEggs() {
  return (
    <div className="pointer-events-none">
      {EGGS.map((e, i) => (
        <Egg key={i} {...e} />
      ))}
    </div>
  )
}
