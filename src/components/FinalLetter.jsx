import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { FINAL_LETTER } from '../data/content'

// Reveals the letter with a typing animation, paragraph by paragraph.
export default function FinalLetter() {
  // Flatten to a single string with paragraph breaks so we can type through it.
  const full = useMemo(() => FINAL_LETTER.join('\n'), [])
  const [count, setCount] = useState(0)

  useEffect(() => {
    let i = 0
    let timer
    const tick = () => {
      i += 1
      setCount(i)
      if (i < full.length) {
        // Pause a touch longer on line breaks for a natural cadence.
        const delay = full[i - 1] === '\n' ? 260 : 22
        timer = setTimeout(tick, delay)
      }
    }
    timer = setTimeout(tick, 600)
    return () => clearTimeout(timer)
  }, [full])

  const shown = full.slice(0, count)
  const done = count >= full.length
  const paragraphs = shown.split('\n')

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="mx-auto max-h-[80vh] w-full max-w-xl overflow-y-auto soft-scroll px-6 py-8"
    >
      <div className="glass rounded-lg px-7 py-9 shadow-scrap">
        {paragraphs.map((p, i) => (
          <p
            key={i}
            className={
              p === '❤️'
                ? 'mt-4 text-center text-3xl'
                : 'font-serif text-lg leading-relaxed text-brown-deep sm:text-xl'
            }
          >
            {p || ' '}
            {i === paragraphs.length - 1 && !done && (
              <span className="ml-0.5 inline-block w-[2px] animate-pulse text-orange">|</span>
            )}
          </p>
        ))}
      </div>
    </motion.div>
  )
}
