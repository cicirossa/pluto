// Generates 12 placeholder photo SVGs (mixed aspect ratios) + an album cover.
// Real photos can later replace assets/img/photo-01..12.<ext> (update photos.js).
import { writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const outDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'assets', 'img')
mkdirSync(outDir, { recursive: true })

const palette = ['#6b6b3a', '#7a4f35', '#cc7a3b', '#e3a9a0', '#8a8a55']
const paper = '#f5ebd9'

// [w, h] — mixed aspect ratios (portrait / landscape / square / tall / wide)
const sizes = [
  [800, 1000], [1200, 800], [900, 900], [700, 1050], [1200, 700], [1000, 1000],
  [820, 1080], [1280, 720], [960, 1200], [1100, 760], [880, 880], [760, 1140],
]

const label = (n) =>
  `Photo ${String(n).padStart(2, '0')}`

for (let i = 0; i < 12; i++) {
  const [w, h] = sizes[i]
  const c1 = palette[i % palette.length]
  const c2 = palette[(i + 2) % palette.length]
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c1}"/>
      <stop offset="1" stop-color="${c2}"/>
    </linearGradient>
    <radialGradient id="v" cx="0.5" cy="0.42" r="0.75">
      <stop offset="0" stop-color="${paper}" stop-opacity="0.18"/>
      <stop offset="1" stop-color="#000000" stop-opacity="0.28"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <rect width="${w}" height="${h}" fill="url(#v)"/>
  <g fill="${paper}" opacity="0.9" font-family="Georgia, serif" text-anchor="middle">
    <circle cx="${w / 2}" cy="${h / 2 - h * 0.06}" r="${Math.min(w, h) * 0.12}" fill="none" stroke="${paper}" stroke-width="3" opacity="0.55"/>
    <text x="${w / 2}" y="${h / 2 - h * 0.04}" font-size="${Math.min(w, h) * 0.09}">☾</text>
    <text x="${w / 2}" y="${h / 2 + h * 0.14}" font-size="${Math.min(w, h) * 0.075}" letter-spacing="2">${label(i + 1)}</text>
    <text x="${w / 2}" y="${h / 2 + h * 0.22}" font-size="${Math.min(w, h) * 0.038}" opacity="0.7" letter-spacing="4">${w} × ${h}</text>
  </g>
</svg>`
  writeFileSync(join(outDir, `photo-${String(i + 1).padStart(2, '0')}.svg`), svg)
}

// Album cover — Pluto / projector motif in palette.
const cover = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
  <defs>
    <radialGradient id="sky" cx="0.5" cy="0.4" r="0.8">
      <stop offset="0" stop-color="#7a4f35"/>
      <stop offset="0.6" stop-color="#4a2f20"/>
      <stop offset="1" stop-color="#2a1a12"/>
    </radialGradient>
    <radialGradient id="planet" cx="0.4" cy="0.35" r="0.75">
      <stop offset="0" stop-color="#e3a9a0"/>
      <stop offset="0.5" stop-color="#cc7a3b"/>
      <stop offset="1" stop-color="#7a4f35"/>
    </radialGradient>
  </defs>
  <rect width="600" height="600" fill="url(#sky)"/>
  <g opacity="0.85" fill="#f5ebd9">
    ${Array.from({ length: 40 }, (_, k) => {
      const x = (k * 137.5) % 600
      const y = (k * 89.3) % 600
      const r = (k % 3) * 0.6 + 0.6
      return `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r}"/>`
    }).join('')}
  </g>
  <circle cx="300" cy="285" r="150" fill="url(#planet)"/>
  <ellipse cx="300" cy="300" rx="230" ry="60" fill="none" stroke="#f5ebd9" stroke-width="6" opacity="0.5" transform="rotate(-18 300 300)"/>
  <text x="300" y="520" text-anchor="middle" font-family="Georgia, serif" font-size="46" fill="#f5ebd9" letter-spacing="2">Pluto Projector</text>
</svg>`
writeFileSync(join(outDir, 'album-cover.svg'), cover)

console.log('Generated 12 placeholder photos + album-cover.svg in', outDir)
