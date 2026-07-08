// Lyrics engine data source.
// The timestamp file is the MASTER CLOCK for the whole experience — we never
// invent timing. We parse the tactiq.io YouTube transcript at assets/audio/lyrics.txt
// (format: `HH:MM:SS.mmm  text`, with `[Music]` instrumental markers).
import raw from '../../assets/audio/lyrics.txt?raw'

const LINE_RE = /^(\d{2}):(\d{2}):(\d{2})\.(\d{3})\s+(.*)$/

export function parseTranscript(text) {
  const out = []
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const m = trimmed.match(LINE_RE)
    if (!m) continue
    const [, hh, mm, ss, ms, body] = m
    const time =
      Number(hh) * 3600 + Number(mm) * 60 + Number(ss) + Number(ms) / 1000
    const content = body.trim()
    out.push({
      time,
      text: content,
      isMusic: content === '[Music]',
    })
  }
  // Ensure ascending order (defensive) and attach an end time per line.
  out.sort((a, b) => a.time - b.time)
  for (let i = 0; i < out.length; i++) {
    out[i].index = i
    out[i].end = i + 1 < out.length ? out[i + 1].time : out[i].time + 6
  }
  return out
}

export const LYRICS = parseTranscript(raw)

// "Sections" = sung lines (skip [Music]). Used by the player's prev/next.
export const SECTIONS = LYRICS.filter((l) => !l.isMusic)

export const SONG = {
  title: 'Pluto Projector',
  artist: 'Rex Orange County · cover by Sally Kim',
}

// Given a time, the index of the active line (last line whose time <= t).
export function activeIndexAt(t, lyrics = LYRICS) {
  let lo = 0
  let hi = lyrics.length - 1
  let ans = -1
  while (lo <= hi) {
    const mid = (lo + hi) >> 1
    if (lyrics[mid].time <= t) {
      ans = mid
      lo = mid + 1
    } else {
      hi = mid - 1
    }
  }
  return ans
}
