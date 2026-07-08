import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useAudio } from './AudioContext'
import { LYRICS, activeIndexAt } from '../data/lyrics'

const Ctx = createContext(null)

// Emotional phases driven by progress through the song (PRD: beginning →
// middle → climax → ending). Returned to consumers so photos/effects/camera
// can scale their intensity to the music's arc.
export function phaseFor(progress) {
  if (progress < 0.25) return 'beginning'
  if (progress < 0.55) return 'middle'
  if (progress < 0.85) return 'climax'
  return 'ending'
}

// A 0..1 "energy" curve used to scale parallax / grain / light leaks.
export function intensityFor(progress) {
  // Rises through the middle, peaks in the climax, eases down at the end.
  if (progress < 0.25) return 0.15 + progress * 0.6 // 0.15 → 0.30
  if (progress < 0.55) return 0.3 + (progress - 0.25) * 1.33 // 0.30 → 0.70
  if (progress < 0.85) return 0.7 + (progress - 0.55) * 1.0 // 0.70 → 1.00
  return Math.max(0.2, 1 - (progress - 0.85) * 2.6) // 1.00 → ~0.6
}

export function TimelineProvider({ active, children }) {
  const { getTime, duration } = useAudio()
  const [activeIndex, setActiveIndex] = useState(-1)
  const [phase, setPhase] = useState('beginning')

  // Smooth per-frame values delivered via subscription (no 60fps re-render).
  const listeners = useRef(new Set())
  const frame = useRef(null)
  const lastIndex = useRef(-1)
  const lastPhase = useRef('beginning')

  useEffect(() => {
    if (!active) return
    const loop = () => {
      const t = getTime()
      const dur = duration || 1
      const progress = Math.min(1, t / dur)

      const idx = activeIndexAt(t, LYRICS)
      if (idx !== lastIndex.current) {
        lastIndex.current = idx
        setActiveIndex(idx)
      }
      const p = phaseFor(progress)
      if (p !== lastPhase.current) {
        lastPhase.current = p
        setPhase(p)
      }

      const payload = { time: t, progress, activeIndex: idx, phase: p }
      listeners.current.forEach((fn) => fn(payload))

      frame.current = requestAnimationFrame(loop)
    }
    frame.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frame.current)
  }, [active, getTime, duration])

  const value = useMemo(() => {
    const subscribe = (fn) => {
      listeners.current.add(fn)
      return () => listeners.current.delete(fn)
    }
    return { activeIndex, phase, duration, subscribe }
  }, [activeIndex, phase, duration])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useTimeline() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useTimeline must be used within TimelineProvider')
  return ctx
}

// Convenience: subscribe to the smooth frame stream with a callback.
export function useFrame(callback, deps = []) {
  const { subscribe } = useTimeline()
  useEffect(() => {
    return subscribe(callback)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
