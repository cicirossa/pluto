import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FinalLetter from './FinalLetter'

// A vintage envelope opens realistically, the letter slides up and out, then
// expands into the full FinalLetter.
export default function EnvelopeAnimation() {
  const [stage, setStage] = useState('closed') // closed → open → sliding → letter

  useEffect(() => {
    const t1 = setTimeout(() => setStage('open'), 700)
    const t2 = setTimeout(() => setStage('sliding'), 1600)
    const t3 = setTimeout(() => setStage('letter'), 2900)
    return () => [t1, t2, t3].forEach(clearTimeout)
  }, [])

  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <AnimatePresence mode="wait">
        {stage !== 'letter' ? (
          <motion.div
            key="envelope"
            className="relative"
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.4, transition: { duration: 0.5 } }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: '900px' }}
          >
            {/* envelope body */}
            <div 
              className="relative h-56 w-80 sm:h-64 sm:w-96"
              style={{ clipPath: 'polygon(-50% -200%, 150% -200%, 150% 100%, -50% 100%)' }}
            >
              {/* letter that slides out */}
              <motion.div
                className="absolute left-1/2 top-4 z-20 h-44 w-64 -translate-x-1/2 rounded-sm bg-paper shadow-scrap sm:h-52 sm:w-72"
                initial={{ y: 60, opacity: 0.4 }}
                animate={
                  stage === 'sliding'
                    ? { y: -120, opacity: 1 }
                    : stage === 'open'
                      ? { y: 20, opacity: 0.9 }
                      : { y: 60, opacity: 0.4 }
                }
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="p-5">
                  <div className="mb-3 h-2 w-24 rounded bg-brown/20" />
                  <div className="mb-2 h-1.5 w-full rounded bg-brown/15" />
                  <div className="mb-2 h-1.5 w-11/12 rounded bg-brown/15" />
                  <div className="mb-2 h-1.5 w-4/5 rounded bg-brown/15" />
                  <div className="mt-4 text-right font-serif text-lg text-brown">♡</div>
                </div>
              </motion.div>

              {/* back pocket */}
              <div className="absolute inset-0 z-10 rounded-md bg-brown shadow-scrap-lift" />
              {/* front pocket */}
              <div
                className="absolute inset-0 z-30 rounded-md"
                style={{
                  background: 'linear-gradient(160deg, #8a5a3e, #7a4f35)',
                  clipPath: 'polygon(0 38%, 50% 78%, 100% 38%, 100% 100%, 0 100%)',
                }}
              />
              {/* flap */}
              <motion.div
                className={`absolute left-0 top-0 h-[78%] w-full origin-top ${stage === 'closed' || stage === 'open' ? 'z-40' : 'z-10'}`}
                style={{
                  background: 'linear-gradient(160deg, #9a6647, #7a4f35)',
                  clipPath: 'polygon(0 0, 100% 0, 100% 48.7%, 50% 100%, 0 48.7%)',
                  transformStyle: 'preserve-3d',
                }}
                initial={{ rotateX: 0 }}
                animate={{ rotateX: stage === 'closed' ? 0 : -180 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
              {/* wax seal */}
              <motion.div
                className="absolute left-1/2 top-[70%] z-50 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-orange text-paper shadow-scrap"
                animate={{ opacity: stage === 'closed' ? 1 : 0, scale: stage === 'closed' ? 1 : 0.6 }}
              >
                ♡
              </motion.div>
            </div>
            <p className="mt-6 text-center text-xs uppercase tracking-[0.3em] text-paper/60">
              opening…
            </p>
          </motion.div>
        ) : (
          <motion.div key="letter" className="w-full">
            <FinalLetter />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
