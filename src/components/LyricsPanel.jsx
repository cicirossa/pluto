import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { LYRICS } from '../data/lyrics'
import { useTimeline } from '../context/TimelineContext'

// Apple-Music style lyrics inside a dark glass panel (V3 §6): previous / current
// / next visible, current line large + bright white, the column glides so the
// active line stays centred. Always readable regardless of the media behind it.
export default function LyricsPanel() {
  const { activeIndex } = useTimeline()
  const containerRef = useRef(null)
  const lineRefs = useRef([])
  const [offset, setOffset] = useState(0)

  const recenter = () => {
    const container = containerRef.current
    const el = lineRefs.current[Math.max(0, activeIndex)]
    if (!container || !el) return
    setOffset(-(el.offsetTop + el.offsetHeight / 2 - container.clientHeight / 2))
  }

  useLayoutEffect(recenter, [activeIndex])

  useEffect(() => {
    window.addEventListener('resize', recenter)
    return () => window.removeEventListener('resize', recenter)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex])

  return (
    <div className="glass-dark relative h-full w-full overflow-hidden rounded-[24px]">
      {/* faint film scanline sheen on the panel */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 3px)',
        }}
      />
      <div
        ref={containerRef}
        className="soft-scroll relative h-full overflow-hidden px-6 py-8 md:px-8"
        style={{
          maskImage:
            'linear-gradient(to bottom, transparent, black 24%, black 76%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent, black 24%, black 76%, transparent)',
        }}
      >
        <div
          className="flex flex-col gap-6 py-[38vh] will-change-transform"
          style={{
            transform: `translate3d(0, ${offset}px, 0)`,
            transition: 'transform 0.7s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          {LYRICS.map((line, i) => {
            const isActive = i === activeIndex
            const distance = Math.abs(i - activeIndex)
            return (
              <p
                key={i}
                ref={(el) => (lineRefs.current[i] = el)}
                className={[
                  'leading-tight transition-all duration-700',
                  isActive
                    ? 'text-2xl text-white sm:text-3xl md:text-[2.15rem]'
                    : 'text-xl sm:text-2xl',
                  !isActive && (distance <= 1 ? 'opacity-30' : 'opacity-[0.12]'),
                  line.isMusic && 'italic',
                ]
                  .filter(Boolean)
                  .join(' ')}
                style={{
                  fontFamily: 'var(--font-lyrics)',
                  color: isActive ? '#fdfaf3' : 'rgba(245,235,217,0.85)',
                  textShadow: isActive
                    ? '0 0 24px rgba(226,196,119,0.35), 0 2px 10px rgba(0,0,0,0.4)'
                    : 'none',
                }}
              >
                {line.isMusic ? <span className="text-gold-soft/70">♪</span> : line.text}
              </p>
            )
          })}
        </div>
      </div>
    </div>
  )
}
