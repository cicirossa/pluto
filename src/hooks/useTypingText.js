import { useEffect, useRef, useState } from 'react'

// Types out `text` character by character. Returns the visible substring and
// a `done` flag. `start=false` holds it empty until you flip it on.
export function useTypingText(text, { speed = 42, startDelay = 0, start = true } = {}) {
  const [out, setOut] = useState('')
  const [done, setDone] = useState(false)
  const timer = useRef(null)

  useEffect(() => {
    if (!start) return
    let i = 0
    setOut('')
    setDone(false)
    const tick = () => {
      i += 1
      setOut(text.slice(0, i))
      if (i >= text.length) {
        setDone(true)
        return
      }
      timer.current = setTimeout(tick, speed)
    }
    const kickoff = setTimeout(tick, startDelay)
    return () => {
      clearTimeout(kickoff)
      if (timer.current) clearTimeout(timer.current)
    }
  }, [text, speed, startDelay, start])

  return { text: out, done }
}
