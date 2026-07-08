# Product Requirements Document (PRD)

# Interactive Birthday Website -- "Pluto Projector"

## Vision

Create a highly emotional, cinematic, premium-quality interactive
birthday website that feels like a living scrapbook and love letter
rather than a slideshow. The experience should synchronize photos,
lyrics, animation, ambience, and music into one seamless story.

## Technology Stack

-   React + Vite
-   Framer Motion
-   GSAP
-   HTML5 Audio API
-   CSS Modules or Tailwind CSS
-   GPU-accelerated animations
-   Target 60 FPS
-   Responsive (Desktop, Tablet, Mobile)

## Assets

User will provide: - MP3 file - TXT/LRC file containing timestamped
lyrics - 12 photos with mixed aspect ratios

## Visual Theme

Vintage retro scrapbook with modern minimalism. Mood: warm, nostalgic,
dreamy, romantic, elegant, cinematic.

### Color Palette

-   Background: #F5EBD9
-   Olive
-   Warm Brown
-   Dusty Orange
-   Soft Pink

Use subtle paper texture, film grain, soft lighting, light
glassmorphism, realistic shadows.

## Typography

Headings: Instrument Serif or Cormorant Garamond Body: Inter or Manrope

## Opening Screen

Full-screen landing page with textured paper background. Centerpiece: -
Rotating vintage CD with album artwork. - Play button inside CD.
Hover: - Scale up - Dynamic reflection - Shadow response Click: - Faster
rotation - Zoom transition - Audio starts - Navigate to main experience.

Display: - brings to you - made by... your love - Pluto Projector -
everytime i play this song, the first thing that pops up in my mind is
you and us..

Use elegant typing animation.

## Main Layout

Desktop: Left: Lyrics Right: Animated scrapbook photos Bottom: Spotify
Premium-inspired player

Mobile: Photos ↓ Lyrics ↓ Footer player

## Lyrics Engine

Apple Music style: - Previous line (30% opacity) - Current line (large,
highlighted) - Next line (30% opacity) Smooth automatic scrolling. Read
timestamps from TXT/LRC. Never generate timing manually.

## Cinematic Timeline Engine

The timestamp file is the master controller of the experience.

Each timestamp synchronizes: - Lyrics - Photo changes - Scrapbook
composition - Zoom/Pan/Ken Burns - Parallax - Camera movement -
Lighting - Grain intensity - Floating motion - Depth - Scene transitions

Everything must follow the emotional progression of the music.

## Emotional Storytelling

Beginning: - Calm ambience - Slow movement - One photo at a time

Middle: - Scrapbook gradually fills - More layered compositions - Warmer
lighting - Slightly more active camera

Climax: - Stronger camera movement - Multiple photos - Increased
parallax - Subtle light leaks

Ending: - Motion slows - Camera gently pulls back - Prepare transition
to birthday scene

## Photo System

Exactly 12 photos. Mixed aspect ratios. Never use as page background.
Display inside premium photo containers with: - Paper borders - Tape /
paper clips - Soft shadows - Slight rotation

Use intelligent layout balancing. Allow photos to reappear later in
different scrapbook arrangements.

## Motion

Combine: - Fade - Zoom - Pan - Ken Burns - Parallax - Floating - Depth -
Cinematic camera

Scene transitions: Fade → Camera shift → New photo → Settle → Resume
parallax. Duration roughly 600--1200 ms with smooth easing.

Apply professional motion principles: - Ease in/out - Anticipation -
Follow-through - Secondary motion - Overlapping animation - Natural
inertia

## Effects

-   Film grain
-   Dust particles
-   Paper texture
-   Soft vignette
-   Very subtle light leaks

## Footer Player

Spotify Premium-inspired: - Album cover - Song title - Artist - Progress
bar - Current time - Play/Pause - Previous - Next No volume control.

## Interactive Messages

Small floating box: Text: "Click here to see Cici's messages"

On click: 10 sticky notes animate into view with macOS-like spring
motion.

Initially show only: ❤️ or "For You"

Click a note: - Flip / unfold animation - Reveal message - Can close
again

## Hidden Interactions

Include tasteful easter eggs: - Camera - Envelope - Vinyl - Film roll -
Tiny letters

## Cursor & Hover

Premium macOS-inspired interactions: - Lift photos - Dynamic shadows -
Spring buttons - Momentum CD rotation

## Performance

-   Lazy-load images
-   Preload audio
-   requestAnimationFrame
-   Smooth scrolling
-   60 FPS target

## Ending Scene

After music ends: - Screen darkens softly - Photos fade away - Birthday
cake appears - One lit candle

Text: "Once again... Happy Birthday to you, monyett. Make a wish and
blow the candle!"

Button: "Blow the Candle"

Interaction: - Flame flickers - Candle extinguishes - Smoke rises -
Small confetti

Then: Vintage envelope appears, opens realistically, letter slides out.

## Final Letter

Display with typing animation.

Text:

Happy Birthday, my monyett.

If there's one thing this song always reminds me of, it's us.

Every lyric carries a little piece of the memories we've made together,
and every note somehow brings me back to the moments where simply having
you beside me felt like enough.

I don't know what the future has prepared for us, but I know one thing
for sure: meeting you has been one of the most beautiful chapters of my
life.

Thank you for being my safe place, my biggest comfort, and the person
who unknowingly makes ordinary days feel extraordinary.

On your birthday, I don't wish for anything grand.

I simply wish that your heart stays light, your dreams find their way to
you, and your smile never loses the warmth that made me fall in love
with you in the first place.

May this new chapter bring you happiness that lasts, courage whenever
life becomes difficult, and countless little moments that remind you how
deeply you are loved.

And whenever life feels overwhelming, I hope you'll remember that
somewhere in this world, there's someone who will always be quietly
cheering for you.

Happy Birthday, my love.

Now...

Let's make more memories together.

❤️

## Architecture

Components: - OpeningScreen - AudioPlayer - LyricsEngine -
TimelineEngine - ScrapbookEngine - PhotoAnimator - StickyNotes -
FooterPlayer - EndingScene - EnvelopeAnimation - FinalLetter

TimelineEngine is the central controller synchronizing audio, lyrics,
photos, ambience, and animation.

## Success Criteria

The website must feel like: - A cinematic short film - A living
scrapbook - An interactive love letter - A premium emotional
storytelling experience

Avoid generic slideshow behavior. Every animation must have purpose and
support the song's emotional journey.
