import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import audioUrl from '../../assets/audio/pluto-projector.mp3?url'

const Ctx = createContext(null)

export function AudioProvider({ children, onEnded }) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [ready, setReady] = useState(false)

  // Create the single <audio> element once, preloaded.
  useEffect(() => {
    const a = new Audio(audioUrl)
    a.preload = 'auto'
    a.crossOrigin = 'anonymous'
    audioRef.current = a

    const onLoaded = () => {
      setDuration(a.duration || 0)
      setReady(true)
    }
    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    const onEnd = () => {
      setIsPlaying(false)
      onEnded?.()
    }
    a.addEventListener('loadedmetadata', onLoaded)
    a.addEventListener('canplaythrough', onLoaded)
    a.addEventListener('play', onPlay)
    a.addEventListener('pause', onPause)
    a.addEventListener('ended', onEnd)
    a.load()

    return () => {
      a.removeEventListener('loadedmetadata', onLoaded)
      a.removeEventListener('canplaythrough', onLoaded)
      a.removeEventListener('play', onPlay)
      a.removeEventListener('pause', onPause)
      a.removeEventListener('ended', onEnd)
      a.pause()
    }
    // onEnded is stable enough for our usage; intentionally run once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const play = useCallback(() => {
    const a = audioRef.current
    if (!a) return Promise.resolve()
    return a.play().catch(() => {})
  }, [])

  const pause = useCallback(() => audioRef.current?.pause(), [])

  const toggle = useCallback(() => {
    const a = audioRef.current
    if (!a) return
    if (a.paused) a.play().catch(() => {})
    else a.pause()
  }, [])

  const seek = useCallback((t) => {
    const a = audioRef.current
    if (!a) return
    a.currentTime = Math.max(0, Math.min(t, a.duration || t))
  }, [])

  // Read live time straight off the element (rAF consumers call this).
  const getTime = useCallback(() => audioRef.current?.currentTime ?? 0, [])

  const value = useMemo(
    () => ({ play, pause, toggle, seek, getTime, isPlaying, duration, ready, audioRef }),
    [play, pause, toggle, seek, getTime, isPlaying, duration, ready],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useAudio() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useAudio must be used within AudioProvider')
  return ctx
}
