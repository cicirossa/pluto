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
  { id: 1, src: p01, orientation: 'portrait', caption: 'Today, on July 9th, the universe in my world loudly celebrated the day someone truly extraordinary arrived. My world unknowingly became a little brighter, simply because you existed. Some people are born to leave a mark, and somehow, you do it just by being you. So here\'s to the day the stars got it right. The day they decided the world deserved someone as rare, silly, kind, and unforgettable as you.' },
  { id: 2, src: p02, orientation: 'landscape', caption: 'As the years quietly passed and we both grew into different versions of ourselves, life somehow found the perfect moment to let our paths cross. Out of all the places, all the days, and all the endless possibilities, we found each other. What started as two ordinary people meeting turned into something that feels anything but ordinary. Somewhere along the way, you became my favorite person to laugh with, to lean on, and to share both the little moments and the big dreams with. And somehow, without even trying, we became the best team I could have ever asked for.' },
  { id: 3, src: p03, orientation: 'square', caption: 'Looking back at everything we\'ve been through, I realize how lucky I am to have someone like you, Andika Dwi Saputra. You\'ve been the one who cares for me in ways words could never fully describe. There were times when I disappointed you, times when I made things harder than they had to be, yet you stayed. You chose to understand, to be patient, and to keep believing in us even when I struggled to believe in myself. I love you simply because you\'re you, your heart, your face, your giggles, your kindness, your silly and wise little ways, and every part that makes you who you are. I hope we\'ll last forever, chasing our dreams, and facing whatever this world brings together. As long as you\'re with me, somehow, with you by my side, even the unknown feels a little less scary, and every step forward feels worth taking.' },
  { id: 4, src: p04, orientation: 'portrait', caption: 'Now you\'ll see a small piece rewind of our memories, creating art if you remember, our moment together and soo onn'},
  { id: 5, src: p05, orientation: 'landscape' },
  { id: 6, src: p06, orientation: 'square' },
  { id: 7, src: p07, orientation: 'portrait' },
  { id: 8, src: p08, orientation: 'landscape' },
  { id: 9, src: p09, orientation: 'portrait' },
  { id: 10, src: p10, orientation: 'landscape' },
  { id: 11, src: p11, orientation: 'square', caption: 'Did you click Cici\'s messages yet?' },
  { id: 12, src: p12, orientation: 'portrait', caption: 'I hope you enjoy this little gift, and I hope it reminds you of how much you mean to me. Happy birthday, my love.' },
]
