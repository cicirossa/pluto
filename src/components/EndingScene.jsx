import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import EnvelopeAnimation from './EnvelopeAnimation'
import { ENDING } from '../data/content'

const CONFETTI_COLORS = ['#cc7a3b', '#e3a9a0', '#6b6b3a', '#f5ebd9', '#8a8a55']

function Confetti() {
  const bits = Array.from({ length: 36 }, (_, i) => i)
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {bits.map((i) => {
        const angle = (i / bits.length) * Math.PI * 2
        const dist = 120 + (i % 5) * 40
        return (
          <motion.span
            key={i}
            className="absolute left-1/2 top-[38%] h-2 w-2 rounded-[1px]"
            style={{ background: CONFETTI_COLORS[i % CONFETTI_COLORS.length] }}
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
            animate={{
              x: Math.cos(angle) * dist,
              y: Math.sin(angle) * dist + 200,
              opacity: 0,
              rotate: 360 + i * 12,
            }}
            transition={{ duration: 1.8 + (i % 4) * 0.3, ease: 'easeOut' }}
          />
        )
      })}
    </div>
  )
}

function Cake({ lit }) {
  return (
    <div className="relative h-48 w-56">
      {/* candle */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2">
        {/* flame + smoke */}
        <div className="relative flex h-16 flex-col items-center">
          <AnimatePresence>
            {lit ? (
              <motion.div
                key="flame"
                className="absolute -top-1 h-6 w-3 rounded-full"
                style={{
                  background:
                    'radial-gradient(circle at 50% 70%, #fff3c4, #ffb347 55%, #cc7a3b 100%)',
                  filter: 'blur(0.4px)',
                  boxShadow: '0 0 22px 8px rgba(255,179,71,0.55)',
                }}
                animate={{
                  scaleY: [1, 1.25, 0.9, 1.15, 1],
                  scaleX: [1, 0.9, 1.1, 0.95, 1],
                  rotate: [-3, 3, -2, 2, -3],
                }}
                transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
                exit={{ opacity: 0, scaleY: 0, transition: { duration: 0.25 } }}
              />
            ) : (
              <motion.div
                key="smoke"
                className="absolute -top-2 h-8 w-2 rounded-full bg-ink/25 blur-[3px]"
                initial={{ opacity: 0.7, y: 0, scaleY: 0.6 }}
                animate={{ opacity: 0, y: -50, scaleY: 1.6, x: [-2, 4, -3] }}
                transition={{ duration: 2.2, ease: 'easeOut' }}
              />
            )}
          </AnimatePresence>
          {/* wick */}
          <div className="absolute top-5 h-1 w-0.5 bg-brown-deep" />
          {/* candle stick */}
          <div className="absolute top-6 h-10 w-2.5 rounded-sm bg-gradient-to-b from-pink to-orange/70" />
        </div>
      </div>

      {/* cake tiers */}
      <div className="absolute bottom-0 left-1/2 w-full -translate-x-1/2">
        <div className="mx-auto h-16 w-40 rounded-t-md rounded-b-lg bg-gradient-to-b from-[#c98b5e] to-[#7a4f35] shadow-scrap">
          <div className="h-3 w-full rounded-t-md bg-pink/70" />
          {/* frosting drips */}
          <div className="flex justify-around px-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-3 w-4 rounded-b-full bg-pink/70" />
            ))}
          </div>
        </div>
        <div className="mx-auto -mt-1 h-6 w-48 rounded-lg bg-[#5f3d29] shadow-scrap" />
      </div>
    </div>
  )
}

export default function EndingScene() {
  const [stage, setStage] = useState('cake') // cake → blown → envelope
  const lit = stage === 'cake'

  const blow = () => {
    if (stage !== 'cake') return
    setStage('blown')
    setTimeout(() => setStage('envelope'), 2600)
  }

  return (
    <motion.div
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(circle at 50% 40%, #3a2c22, #1c130d)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1] }}
      transition={{ duration: 1.6 }}
    >
      <AnimatePresence mode="wait">
        {stage !== 'envelope' ? (
          <motion.div
            key="cake"
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: [0, 1], y: [20, 0] }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.6 } }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <div className="relative">
              <Cake lit={lit} />
              {stage === 'blown' && <Confetti />}
            </div>

            <h2 className="mt-10 font-serif text-4xl italic text-paper sm:text-5xl">
              {ENDING.title}
            </h2>
            <p className="mt-2 font-serif text-2xl text-pink sm:text-3xl">{ENDING.subtitle}</p>
            <p className="mt-3 text-sm text-paper/70">{ENDING.prompt}</p>

            <AnimatePresence>
              {stage === 'cake' && (
                <motion.button
                  onClick={blow}
                  exit={{ opacity: 0, y: 10 }}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-7 rounded-full bg-orange px-7 py-3 font-medium text-paper shadow-scrap"
                >
                  {ENDING.button}
                </motion.button>
              )}
            </AnimatePresence>

            {stage === 'blown' && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-7 text-sm italic text-paper/60"
              >
                a letter is on its way…
              </motion.p>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="envelope"
            className="h-full w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <EnvelopeAnimation />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
