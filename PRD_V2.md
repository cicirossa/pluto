# PRD_V2 --- Interactive Vintage Film Projector Birthday Website

## Product Vision

Create an award-quality interactive website that feels like a nostalgic
Super 8 film projector, not a slideshow. Every animation, lyric,
photograph, and transition must tell a story.

## Core Concept

After the rotating CD is clicked: 1. CD accelerates. 2. Camera performs
a subtle dolly zoom. 3. Warm projector light fills the scene. 4. CD
shrinks and follows a curved path into the Spotify-style footer. 5. CD
continues spinning as the album artwork. 6. Play morphs into Pause. 7.
Projector beam appears. 8. Film effects gradually fade in. 9. First
lyric and first memory appear seamlessly.

## Technology

-   React + Vite
-   Framer Motion
-   GSAP
-   HTML5 Audio API
-   Responsive
-   60 FPS target

## Visual Style

Theme: - Vintage Film - Scrapbook - Premium Apple Motion - Warm
nostalgic documentary

Background: - #F5EBD9 cream paper - Film grain - Dust - Light leaks -
Gate weave - Scratches - Soft vignette - Bloom

Never use photos as backgrounds.

## Opening

Centered rotating CD with typing text: - brings to you - made by... your
love - Pluto Projector - everytime i play this song, the first thing
that pops up in my mind is you and us..

Opening and main page must share the same vintage aesthetic.

## Layout

Desktop: Left = Lyrics Panel Right = Media Stage Bottom =
Spotify-inspired Player

Mobile: Media → Lyrics → Footer

## Lyrics Panel

Dark glass panel: - rgba(0,0,0,.45) - backdrop blur - rounded corners -
white border - soft shadow

Font: DM Serif Display / Lora / Libre Baskerville / Crimson Pro

Only previous, current and next lyric visible. Current lyric highlighted
in bright white.

## Media Stage

Future-proof container supporting both images and videos. Only replace
source files to switch media types.

## Photos

12 memories. Mixed aspect ratios. Displayed in elegant frames with: -
paper border - realistic shadow - animated warm golden glow - tape/paper
clip - slight rotation

## Motion

Photos never stop moving: - floating - zoom - pan - Ken Burns - subtle
rotation - parallax

Transitions: Camera drift → photo slides away → cross dissolve → new
media enters → camera settles.

## Timeline Engine

TXT/LRC timestamps control: - lyrics - media - camera - ambience -
glow - grain - parallax - lighting - animation speed

Everything follows the emotional flow of the song.

## Footer

Spotify Premium inspired. Glassmorphism. Warm reflection.

Contains: - rotating CD artwork - song - artist - timer - progress -
previous - play/pause - next

Replace volume with a rounded button: 'Cici's Messages' 'Click!'

Hover: lift + glow + spring animation.

Click: Launch sticky notes.

## Sticky Notes

10 notes explode into view using macOS spring motion. Initially show
only ❤️ or 'For You'. Click unfolds paper and reveals message.

## Film Effects

Subtle: - Grain - Dust - Flicker - Scratches - Gate weave - Light leak -
Lens breathing - Bloom - Vignette

Effects should be felt, not noticed.

## Ending

Music ends. Photos fade. Birthday cake appears. Single candle. Button:
Blow the Candle. Flame extinguishes. Smoke rises. Confetti. Vintage
envelope opens. Letter types out romantically.

## Components

OpeningScreen LyricsPanel MediaStage TimelineEngine FooterPlayer
PhotoAnimator StickyNotes EndingScene Envelope FinalLetter

TimelineEngine orchestrates the entire experience.

## Acceptance Criteria

-   CD transitions into footer smoothly.
-   No abrupt scene changes.
-   Media supports future videos.
-   Lyrics always readable.
-   Photos animate continuously.
-   Warm golden border glow.
-   Messages replace volume button.
-   Website feels like watching memories through an old film projector.
