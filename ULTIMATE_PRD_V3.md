# ULTIMATE_PRD_V3.md

# Pluto Projector --- Interactive Vintage Film Projector

**Design Goal:** Create an emotionally unforgettable interactive
birthday experience that feels like a handcrafted short film projected
from a vintage film projector. Every transition, animation, layout, and
interaction must contribute to storytelling.

------------------------------------------------------------------------

# 1. Product Philosophy

## Must Feel Like

-   A Super 8 documentary
-   A premium Apple keynote animation
-   Spotify Premium polish
-   Awwwards storytelling
-   A living scrapbook
-   A handwritten love letter

## Must NOT Feel Like

-   PowerPoint slideshow
-   Generic photo gallery
-   Karaoke website
-   Template landing page
-   Abrupt page transitions

Every motion must have intention.

------------------------------------------------------------------------

# 2. Tech Stack

React + Vite, GSAP (master timeline), Framer Motion
(micro-interactions), HTML5 Audio API. Architecture must be
component-based and future-proof.

------------------------------------------------------------------------

# 3. Design System

## Palette

Background: #F5EBD9

Accents: - Warm Gold - Olive - Warm Brown - Dusty Orange - Soft Pink

## Surface Materials

-   Paper texture
-   Film grain
-   Dust particles
-   Light leak
-   Gate weave
-   Film scratches
-   Soft bloom
-   Subtle vignette

Effects must remain subtle throughout.

## Typography

Headings: Instrument Serif / Cormorant Garamond Lyrics: DM Serif Display
→ Lora → Libre Baskerville fallback. Never use thin handwritten fonts.

------------------------------------------------------------------------

# 4. Storyboard

## Scene 1 -- Opening

Centered rotating CD on warm paper background. Projector light subtly
visible. Dust floats. Typing animation introduces the dedication.

Hover: Lift + glow + momentum.

Click triggers ONE CONTINUOUS SHOT.

Timeline: 0ms: CD accelerates. 300ms: projector light brightens. 500ms:
subtle dolly zoom. 900ms: footer rises. 1200ms: CD shrinks. 1500ms: CD
follows curved bezier path. 1800ms: docks into footer. 1900ms: Play
morphs to Pause. 2100ms: lyrics panel fades. 2200ms: first media fades.
2300ms: projector beam fully visible.

No cuts.

------------------------------------------------------------------------

## Scene 2 -- Film Begins

User now watches memories through the projector.

Left: Lyrics panel.

Right: Media Stage.

Bottom: Player.

------------------------------------------------------------------------

## Scene 3 -- Emotional Journey

Beginning: Minimal composition. One hero memory.

Middle: Additional memories layered. Warmer ambience.

Climax: Camera more expressive. Three memory composition. Glow slightly
stronger.

Ending: Motion slows. Camera gently pulls back. Scene prepares birthday
ending.

------------------------------------------------------------------------

# 5. Layout Specification

Desktop: 30% Lyrics 70% Media

Footer: 110px fixed.

Media Stage: Never use fullscreen background. Dedicated cinematic stage.
Supports images and future videos.

------------------------------------------------------------------------

# 6. Lyrics Engine

Apple Music inspired.

Display only: Previous Current Next

Current: Large Bright white

Panel: Dark glass Backdrop blur Rounded 24px Soft shadow Thin border

Always readable regardless of media.

------------------------------------------------------------------------

# 7. Media Engine

Component name: MediaStage

Must support: Images today. Videos tomorrow. Changing media type should
only require replacing assets.

Hero media occupies visual focus. Secondary memories remain layered
behind.

------------------------------------------------------------------------

# 8. Scrapbook Engine

12 photos.

Mixed aspect ratios.

Rules: Never stretch. Never crop faces unnecessarily. Always maintain
balanced composition.

Frames: Paper border. Warm shadow. Animated golden glow. Tiny rotation.
Optional tape.

------------------------------------------------------------------------

# 9. Motion Specification

Continuous idle motion: Floating 5--8px. Rotation ±1.5°. Zoom 1.00→1.08.
Duration 12--18s. Pan max 5%.

Transitions: Camera drift → Old memory exits → Cross dissolve → New
memory enters → Camera settles → Idle resumes.

Never snap.

------------------------------------------------------------------------

# 10. Timeline Engine

TXT/LRC is the master controller.

Each timestamp synchronizes: - Lyrics - Media - Camera - Glow - Grain -
Light - Parallax - Floating - Transition speed - Ambience

No randomness.

------------------------------------------------------------------------

# 11. Footer

Spotify-inspired.

Contains: Album CD (rotating) Song Artist Progress Timer Prev Play/Pause
Next

Replace volume with: Rounded pill: "Cici's Messages" "Click!"

Hover: Glow. Lift. Spring.

Click: Launch sticky notes.

------------------------------------------------------------------------

# 12. Sticky Notes

10 notes.

Appear with macOS spring animation.

Initially hide text.

Show only: ❤️ or "For You"

Click unfolds paper.

Close folds naturally.

------------------------------------------------------------------------

# 13. Film Simulation

Blend: Grain Dust Gate weave Light leak Scratches Projector flicker Lens
breathing Bloom Vignette

Should enhance immersion, never distract.

------------------------------------------------------------------------

# 14. Ending

Music ends.

Media fades.

Birthday cake fades in.

Single candle.

Instruction: "Once again... Happy Birthday to you monyett, make a wish
and blow the candle!"

Button: Blow the Candle.

Flame extinguishes. Smoke rises. Confetti appears.

Vintage envelope enters. Opens realistically. Letter slides out. Typing
animation reveals final message.

------------------------------------------------------------------------

# 15. Performance

60 FPS target. Use GPU transforms. Lazy load assets. Preload audio. No
CLS. Use requestAnimationFrame where appropriate.

------------------------------------------------------------------------

# 16. Component Tree

OpeningScreen TransitionController LyricsPanel MediaStage
ScrapbookEngine TimelineEngine PhotoAnimator FooterPlayer MessagesButton
StickyNotes BirthdayScene Envelope FinalLetter

TimelineEngine orchestrates all components.

------------------------------------------------------------------------

# 17. Acceptance Criteria

A successful implementation should make users feel they are watching
memories projected from an old projector instead of browsing a website.

If any transition feels abrupt, slideshow-like, or template-based, it
fails the design goal.

Quality benchmark: Apple Motion × Spotify Premium × Super 8 Film ×
Awwwards.
