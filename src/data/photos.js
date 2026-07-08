// Manifest of the 12 scrapbook photos + the album cover.
// To use real photos: drop them into assets/img/ and point `src` here at them
// (any aspect ratio works — the layout adapts). `orientation` just helps the
// layout engine balance compositions.
import p01 from '../../assets/img/photo-01.svg'
import p02 from '../../assets/img/photo-02.svg'
import p03 from '../../assets/img/photo-03.svg'
import p04 from '../../assets/img/photo-04.svg'
import p05 from '../../assets/img/photo-05.svg'
import p06 from '../../assets/img/photo-06.svg'
import p07 from '../../assets/img/photo-07.svg'
import p08 from '../../assets/img/photo-08.svg'
import p09 from '../../assets/img/photo-09.svg'
import p10 from '../../assets/img/photo-10.svg'
import p11 from '../../assets/img/photo-11.svg'
import p12 from '../../assets/img/photo-12.svg'
import albumCover from '../../assets/img/album-cover.svg'

export { albumCover }

// orientation: 'portrait' | 'landscape' | 'square'
export const PHOTOS = [
  { id: 1, src: p01, orientation: 'portrait' },
  { id: 2, src: p02, orientation: 'landscape' },
  { id: 3, src: p03, orientation: 'square' },
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
