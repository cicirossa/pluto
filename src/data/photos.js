// Manifest of the 12 scrapbook photos + the album cover.
// To use real photos: drop them into assets/img/ and point `src` here at them
// (any aspect ratio works — the layout adapts). `orientation` just helps the
// layout engine balance compositions.
import p01 from '../../assets/img/photo-01.webp'
import p02 from '../../assets/img/photo-02.webp'
import p03 from '../../assets/img/photo-03.webp'
import p04 from '../../assets/img/photo-04.webp'
import p05 from '../../assets/img/photo-05.webp'
import p06 from '../../assets/img/photo-06.webp'
import p07 from '../../assets/img/photo-07.webp'
import p08 from '../../assets/img/photo-08.webp'
import p09 from '../../assets/img/photo-09.webp'
import p10 from '../../assets/img/photo-10.webp'
import p11 from '../../assets/img/photo-11.webp'
import p12 from '../../assets/img/photo-12.webp'
import albumCover from '../../assets/img/album-cover.svg'

export { albumCover }

// orientation: 'portrait' | 'landscape' | 'square'
// `caption`: shown ONCE, the first time this photo appears at the start of the
// experience (photos 1–3). Replace the placeholder text with your own words.
export const PHOTOS = [
  { id: 1, src: p01, orientation: 'portrait', caption: 'Tulis caption kenangan pertama di sini — ganti nanti ✎' },
  { id: 2, src: p02, orientation: 'landscape', caption: 'Ceritakan momen di foto kedua ini — teks placeholder ✎' },
  { id: 3, src: p03, orientation: 'square', caption: 'Caption untuk foto ketiga — tuliskan sesukamu ✎' },
  { id: 4, src: p04, orientation: 'portrait' },
  { id: 5, src: p05, orientation: 'landscape' },
  { id: 6, src: p06, orientation: 'square' },
  { id: 7, src: p07, orientation: 'portrait' },
  { id: 8, src: p08, orientation: 'landscape' },
  { id: 9, src: p09, orientation: 'portrait' },
  { id: 10, src: p10, orientation: 'landscape' },
  { id: 11, src: p11, orientation: 'square' },
  { id: 12, src: p12, orientation: 'portrait' },
]
