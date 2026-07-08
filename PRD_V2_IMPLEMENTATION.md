# PRD_V2_IMPLEMENTATION.md

# Pluto Projector --- Interactive Vintage Film Projector Experience

> **Goal:** Build an emotionally cinematic interactive birthday website.
> The final result must feel like a handcrafted short film projected
> from an old film projector, not a slideshow.

------------------------------------------------------------------------

# Product Principles

## This website IS

-   An interactive film
-   A digital scrapbook
-   A love letter
-   A premium storytelling experience
-   Responsive
-   Highly polished

## This website IS NOT

-   A slideshow
-   A gallery
-   A karaoke page
-   A generic music player

Every animation must have emotional purpose.

------------------------------------------------------------------------

# Technology

-   React + Vite
-   GSAP (master timeline)
-   Framer Motion (micro interactions)
-   HTML5 Audio
-   CSS variables
-   MediaStage component (image/video)

------------------------------------------------------------------------

# Global Design System

## Colors

Background: #F5EBD9

Accent: - Warm Gold - Olive - Warm Brown - Dusty Orange - Soft Pink

## Texture

Always visible: - subtle paper texture - very light grain - projector
dust - light leak - scratches - gate weave - vignette - soft bloom

Effects should be barely noticeable.

------------------------------------------------------------------------

# Opening Scene

Background already uses the same cream vintage style as the main page.

Center: Large rotating CD.

Behind CD: soft projector light.

Floating dust particles.

Typing animation:

brings to you

made by... your love

Pluto Projector

everytime i play this song, the first thing that pops up in my mind is
you and us..

Hover: - lift - glow - faster rotation

Click:

DO NOT instantly change page.

Instead create ONE CONTINUOUS SHOT.

Timeline:

0ms CD rotation accelerates.

300ms Projector light grows brighter.

500ms Camera performs subtle dolly zoom.

900ms Background transitions smoothly into the main experience.

1100ms Footer slides upward.

1300ms CD scales down.

1600ms CD follows a smooth Bézier curve into the album artwork slot.

1900ms Play morphs into Pause.

2100ms Lyrics panel fades in.

2200ms First memory appears.

The user must feel they are starting a projector.

------------------------------------------------------------------------

# Main Layout

Desktop

30% width Lyrics Panel

70% width Media Stage

Footer fixed bottom.

Mobile

Media ↓

Lyrics

↓

Footer

------------------------------------------------------------------------

# Lyrics Panel

Persistent panel.

Background: black glass

Opacity: \~45%

Backdrop blur: 30px

Radius: 24px

Soft border: 1px white

Shadow: soft

Font: DM Serif Display Fallback: Lora Libre Baskerville

Never use handwriting fonts.

Display only: previous current next

Current: largest bright white

Auto scroll synchronized with timestamps.

------------------------------------------------------------------------

# Media Stage

Must support: Image Video

Only replacing asset files should switch media type.

Never use media as page background.

Use a dedicated stage.

Hero media: 65% stage height.

Secondary media: 30%.

Layer composition: Hero Secondary Decoration

------------------------------------------------------------------------

# Photo Engine

Exactly 12 memories.

Mixed ratios.

No stretching.

Object-fit cover inside elegant frames.

Frames: paper edge warm shadow golden animated border glow slight
rotation

Glow resembles sunset.

------------------------------------------------------------------------

# Motion Specification

Every media continuously moves.

Floating: 5-8 px

Rotation: ±1.5°

Zoom: 1.00→1.08

Duration: 12-18s

Pan: max 5%

Ease: sine in/out

Never stop.

Transitions:

Camera drifts.

Old memory slides gently.

Cross dissolve.

New memory enters.

Camera settles.

Resume floating.

Never snap.

------------------------------------------------------------------------

# Storytelling Rules

Beginning: Single memory. Lots of whitespace.

Middle: More scrapbook layering.

Climax: More active camera. Warmer glow. Three layered memories.

Ending: Everything slows. Camera gently pulls back.

------------------------------------------------------------------------

# Timeline Engine

TXT/LRC is the master source.

Every timestamp controls: - lyrics - media - camera - glow - ambience -
grain - parallax - transitions

No random changes.

------------------------------------------------------------------------

# Film Simulation

Apply simultaneously:

-   grain
-   dust
-   flicker
-   scratches
-   gate weave
-   light leak
-   vignette
-   bloom
-   lens breathing

Subtle.

------------------------------------------------------------------------

# Footer

Spotify-inspired.

Glass.

Blur.

Warm reflections.

Contains: Album CD Song Artist Time Progress Previous Pause Next

Replace volume button with:

Round pill button

"Cici's Messages"

Click!

Hover: spring lift glow

Click: 10 sticky notes animate from bottom-right.

------------------------------------------------------------------------

# Sticky Notes

MacOS spring animation.

Random arrangement.

Initially: ❤️ or "For You"

Click unfolds.

Close folds.

Never show all text immediately.

------------------------------------------------------------------------

# Performance

60 FPS.

Lazy loading.

GPU transforms.

No layout shift.

Preload audio.

------------------------------------------------------------------------

# Ending

Music ends.

Photos disappear gradually.

Birthday cake fades in.

One candle.

Instruction:

"Once again... Happy Birthday to you monyett, make a wish and blow the
candle!"

Button: Blow the Candle

Flame dies.

Smoke.

Confetti.

Vintage envelope arrives.

Envelope opens.

Letter slides out.

Typing animation.

------------------------------------------------------------------------

# Acceptance Criteria

The finished website must make users feel they have watched an emotional
vintage film.

If any animation feels like PowerPoint, instant fade, abrupt
replacement, or generic slideshow, it is considered a failed
implementation.

Quality target: Apple product launch motion × Spotify Premium × Super 8
documentary × premium Awwwards storytelling.
