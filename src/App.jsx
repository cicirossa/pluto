import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { AnimatePresence, motion } from 'framer-motion'
import { AudioProvider, useAudio } from './context/AudioContext'
import { TimelineProvider, useTimeline } from './context/TimelineContext'
import ProjectorCD from './components/ProjectorCD'
import LyricsPanel from './components/LyricsPanel'
import MediaStage from './components/MediaStage'
import FooterPlayer from './components/FooterPlayer'
import StickyNotes from './components/StickyNotes'
import EasterEggs from './components/EasterEggs'
import EndingScene from './components/EndingScene'
import { OPENING_LINES } from './data/content'
import { useTypingText } from './hooks/useTypingText'
import {
  FilmGrain,
  Vignette,
  PaperTexture,
  LightLeaks,
  DustParticles,
  ProjectorBeam,
  ProjectorFlicker,
  FilmScratches,
  GateWeave,
} from './components/effects/Effects'

const PHASE_ENERGY = { beginning: 0.25, middle: 0.55, climax: 1, ending: 0.4 }

// Ambient film effects whose intensity tracks the song's emotional phase.
function PhaseEffects({ beamRef }) {
  const { phase } = useTimeline()
  const energy = PHASE_ENERGY[phase] ?? 0.4
  return (
    <>
      <ProjectorBeam ref={beamRef} intensity={energy} />
      <LightLeaks intensity={energy} />
      <DustParticles count={46} intensity={energy} />
      <FilmGrain opacity={0.05 + energy * 0.05} />
    </>
  )
}

// Sequentially-typed dedication over the opening.
function OpeningIntro() {
  const [i, setI] = useState(0)
  const isLast = i >= OPENING_LINES.length - 1
  const { text, done } = useTypingText(OPENING_LINES[i], {
    speed: i === 2 ? 90 : 34,
    startDelay: i === 0 ? 300 : 220,
  })
  if (done && !isLast) {
    setTimeout(() => setI((v) => Math.min(v + 1, OPENING_LINES.length - 1)), 750)
  }
  return (
    <div className="flex min-h-[8.5rem] flex-col items-center gap-1 text-center sm:min-h-[9.5rem]">
      {OPENING_LINES.slice(0, i).map((l, k) => (
        <p
          key={k}
          className={
            k === 2
              ? 'font-serif text-3xl italic text-brown sm:text-5xl'
              : 'text-xs uppercase tracking-[0.35em] text-olive/70 sm:text-sm'
          }
        >
          {l}
        </p>
      ))}
      <p
        className={
          i === 2
            ? 'font-serif text-3xl italic text-brown sm:text-5xl'
            : i === 3
              ? 'max-w-md text-sm italic text-ink/70 sm:text-base'
              : 'text-xs uppercase tracking-[0.35em] text-olive/70 sm:text-sm'
        }
      >
        {text}
        <span className="ml-0.5 inline-block w-[1px] animate-pulse text-orange">|</span>
      </p>
    </div>
  )
}

// Deep-link a scene for previewing (e.g. #main, #ending); skips the transition.
function initialScene() {
  const h = typeof window !== 'undefined' ? window.location.hash.slice(1) : ''
  return h === 'main' || h === 'ending' ? h : 'opening'
}

function Experience({ scene, setScene }) {
  const { play } = useAudio()
  const [docked, setDocked] = useState(() => initialScene() !== 'opening')
  const [messagesOpen, setMessagesOpen] = useState(false)

  // Refs the continuous-shot timeline drives.
  const flyingCdRef = useRef(null)
  const footerRef = useRef(null)
  const footerSlotRef = useRef(null)
  const beamRef = useRef(null)
  const stageRef = useRef(null)
  const lyricsWrapRef = useRef(null)
  const mediaWrapRef = useRef(null)
  const openingTextRef = useRef(null)
  const startedRef = useRef(false)

  const startTransition = () => {
    if (scene !== 'opening' || startedRef.current) return
    startedRef.current = true
    play()
    setScene('transition')
  }

  // The one continuous shot (V3 §Scene 1). Runs once the stage + footer mount.
  useEffect(() => {
    if (scene !== 'transition') return
    const cd = flyingCdRef.current
    const footer = footerRef.current
    const beam = beamRef.current
    const stage = stageRef.current
    const lyrics = lyricsWrapRef.current
    const media = mediaWrapRef.current
    const openingText = openingTextRef.current
    if (!cd || !footer) return

    // Measure the CD → footer-slot flight against the footer's RESTING position
    // (compensate for however far it has currently risen).
    const slotDelta = () => {
      const cdRect = cd.getBoundingClientRect()
      const footerH = footer.offsetHeight || 110
      const yPct = Number(gsap.getProperty(footer, 'yPercent')) || 0
      const slot = footerSlotRef.current.getBoundingClientRect()
      const restTop = slot.top - (yPct / 100) * footerH
      const dx = slot.left + slot.width / 2 - (cdRect.left + cdRect.width / 2)
      const dy = restTop + slot.height / 2 - (cdRect.top + cdRect.height / 2)
      return { dx, dy, scale: slot.width / cdRect.width }
    }

    gsap.set([lyrics, media], { opacity: 0 })
    gsap.set(footer, { yPercent: 140 })
    gsap.set(stage, { scale: 1, transformOrigin: '55% 42%' })

    const tl = gsap.timeline({
      onComplete: () => {
        setDocked(true)
        setScene('main')
      },
    })
    if (openingText) tl.to(openingText, { opacity: 0, y: 12, duration: 0.4 }, 0)
    if (beam) tl.fromTo(beam, { opacity: 0.45 }, { opacity: 1, duration: 0.7 }, 0.1)
    tl.to(stage, { scale: 1.045, duration: 1.0, ease: 'power2.inOut' }, 0.2)
    tl.to(footer, { yPercent: 0, duration: 0.6, ease: 'power3.out' }, 0.35)
    // fly + shrink into the dock (slight upward arc via a brief lift first)
    tl.to(cd, { y: '-=40', duration: 0.35, ease: 'power2.out' }, 0.6)
    tl.to(
      cd,
      {
        duration: 0.85,
        ease: 'power3.inOut',
        x: () => slotDelta().dx,
        y: () => slotDelta().dy,
        scale: () => slotDelta().scale,
      },
      0.9,
    )
    tl.add(() => setDocked(true), 1.6)
    tl.to(cd, { opacity: 0, duration: 0.25 }, 1.62)
    tl.to([lyrics, media], { opacity: 1, duration: 0.75, ease: 'power2.out' }, 1.55)
    tl.to(stage, { scale: 1, duration: 0.9, ease: 'power2.out' }, 1.55)

    return () => tl.kill()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene])

  const showStage = scene === 'transition' || scene === 'main'
  const cdSize = typeof window !== 'undefined' && window.innerWidth < 640 ? 220 : 300

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden">
      <PaperTexture />

      {/* Projector stage (lyrics + media) + footer, present from transition on */}
      {showStage && (
        <TimelineProvider active>
          <div className="relative flex min-h-0 flex-1">
            <GateWeave className="absolute inset-0">
              <div
                ref={stageRef}
                className="flex h-full w-full flex-col will-change-transform md:flex-row"
              >
                {/* Media — 70% (top on mobile) */}
                <div
                  ref={mediaWrapRef}
                  className="relative order-1 min-h-0 flex-[1.4] md:order-2 md:w-[68%] md:flex-none"
                >
                  <MediaStage />
                </div>
                {/* Lyrics — 30% dark glass panel (bottom on mobile) */}
                <div
                  ref={lyricsWrapRef}
                  className="relative order-2 min-h-0 flex-1 p-3 md:order-1 md:w-[32%] md:flex-none md:p-5"
                >
                  <LyricsPanel />
                </div>
              </div>
            </GateWeave>
          </div>

          <FooterPlayer
            ref={footerRef}
            slotRef={footerSlotRef}
            docked={docked}
            onOpenMessages={() => setMessagesOpen(true)}
          />

          <PhaseEffects beamRef={beamRef} />
          <EasterEggs />
        </TimelineProvider>
      )}

      {/* Opening dedication text */}
      <AnimatePresence>
        {scene === 'opening' && (
          <motion.div
            key="intro"
            ref={openingTextRef}
            className="pointer-events-none absolute inset-x-0 bottom-[12%] z-[66] flex flex-col items-center px-6"
            exit={{ opacity: 0 }}
          >
            <OpeningIntro />
            <p className="mt-6 text-center text-[0.7rem] uppercase tracking-[0.3em] text-olive/60">
              tap the record to begin
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The CD — centred in opening, flies to the footer during transition */}
      {(scene === 'opening' || scene === 'transition') && (
        <div className="pointer-events-none fixed inset-0 z-[65] flex items-center justify-center">
          <ProjectorCD
            ref={flyingCdRef}
            size={cdSize}
            spinning
            fast={scene === 'transition'}
            showPlay
            onClick={scene === 'opening' ? startTransition : undefined}
            className={scene === 'opening' ? 'pointer-events-auto' : ''}
          />
        </div>
      )}

      {/* Ending sequence */}
      <AnimatePresence>
        {scene === 'ending' && (
          <motion.div key="ending" className="absolute inset-0 z-[68]">
            <EndingScene />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky notes overlay (opened from the footer pill) */}
      <StickyNotes open={messagesOpen} onClose={() => setMessagesOpen(false)} />

      {/* Global cinematic overlays */}
      <ProjectorFlicker />
      <FilmScratches />
      <Vignette />
      {!showStage && <FilmGrain opacity={0.06} />}
      {!showStage && <DustParticles count={40} intensity={0.3} />}
    </div>
  )
}

export default function App() {
  // Scene lives here so AudioProvider's onEnded can flip to the ending while
  // Experience (inside the provider) can still consume useAudio().
  const [scene, setScene] = useState(initialScene)
  return (
    <AudioProvider onEnded={() => setScene('ending')}>
      <Experience scene={scene} setScene={setScene} />
    </AudioProvider>
  )
}
