import { useEffect, useState } from 'react'
import Footer from '../components/Footer'

const PHOTOS = [
  'A1B76978-1961-486A-9D27-35ABC95849D6.png',
  'IMG_2084.png',
  'IMG_2100.png',
  'IMG_2107.png',
  'IMG_2135.png',
  'IMG_2145.png',
  'IMG_2156.png',
  'IMG_2218.png',
  'IMG_2239.png',
  'IMG_2240.png',
  'IMG_2262.png',
  'IMG_2265.png',
  'IMG_2280.png',
  'IMG_1890.png',
  'IMG_1583.png',
  '4FE265B2-DB33-4243-B382-C670B087E510.png',
  'AAB7B2F3-0FEF-4DAB-B320-16E793B77087.png',
  '0D9271AE-AC94-4313-9286-B534B5FC888F.png',
  'IMG_1198.png',
  'IMG_1161.png',
  'IMG_1148.png',
  'IMG_1138.png',
  'IMG_1113.png',
  'IMG_1071.png',
  'IMG_1022.png',
  'IMG_1014.png',
  'IMG_0997.png',
  'IMG_0975.png',
  'IMG_0961.png',
  'IMG_0959.png',
  'Image1-23-26.png',
  'IMG_0814.png',
  'IMG_0670.png',
  'IMG_0634.png',
  'IMG_0602.png',
  '258FEEB3-4663-40E2-9FC8-402844511E15.jpg',
  'DAA7DC1C-EEF3-4529-BDAA-630EF8AE5D9C.jpg',
  'IMG_0485.png',
  'IMG_0483.png',
  'IMG_0469.png',
  'IMG_0459.png',
  'IMG_2441.png',
  'IMG_2141.png',
  'IMG_0419.png',
  'IMG_0395.png',
  'IMG_0392.png',
  'IMG_0382.png',
  'IMG_0240.png',
  'IMG_0186.png',
  'IMG_0154.png',
  'IMG_0114.png',
  '0C45E398-EEAA-424D-92FB-06D51C15F429.jpg',
  'IMG_2452.png',
  'IMG_2449.png',
  'IMG_2443.png',
  'ADB667A7-E3C2-4EEA-BA28-7B3E2A342C92.png',
  'IMG_2331.png',
  'IMG_2017.png',
  'IMG_1133.png',
  'IMG_1861.png',
  'IMG_1469.png',
  'IMG_1359.png',
  'IMG_1199.png',
  'IMG_0743.png',
]

const thumbnailFor = (file) => `/thumbs/${file.replace(/\.[^.]+$/, '.jpg')}`

export default function Photography() {
  const [activeIndex, setActiveIndex] = useState(null)
  const activePhoto = activeIndex === null ? null : PHOTOS[activeIndex]

  const move = (direction) => {
    setActiveIndex((current) => (current + direction + PHOTOS.length) % PHOTOS.length)
  }

  useEffect(() => {
    if (activeIndex === null) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setActiveIndex(null)
      if (event.key === 'ArrowLeft') move(-1)
      if (event.key === 'ArrowRight') move(1)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeIndex])

  return (
    <div className="min-h-screen bg-black flex flex-col pt-32 pb-20 mobile:pt-24">
      <main className="w-full flex-1">
        <header className="max-w-[1340px] mx-auto px-[15px] md-tablet:px-[18px] mb-16 mobile:mb-10">
          <p className="text-xs uppercase tracking-[0.18em] text-white/45 mb-5">Selected frames</p>
          <h1 className="text-[80px] md-tablet:text-[60px] mobile:text-[48px] leading-[0.9] tracking-[-2px] font-medium uppercase">
            Photography
          </h1>
        </header>

        <div className="photo-columns px-1.5" aria-label="Photography gallery">
          {PHOTOS.map((file, index) => (
            <button
              key={file}
              type="button"
              className="photo-tile group"
              onClick={() => setActiveIndex(index)}
              aria-label={`Open photograph ${index + 1} of ${PHOTOS.length}`}
            >
              <img
                src={thumbnailFor(file)}
                alt=""
                loading="lazy"
                className="w-full h-auto block transition-opacity duration-300 group-hover:opacity-75"
              />
            </button>
          ))}
        </div>
      </main>
      <Footer />

      {activePhoto && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6 mobile:p-3" role="dialog" aria-modal="true" aria-label="Photograph viewer">
          <button type="button" onClick={() => setActiveIndex(null)} className="absolute top-5 right-5 z-10 w-11 h-11 text-3xl text-white/75 hover:text-white" aria-label="Close photograph">×</button>
          <button type="button" onClick={() => move(-1)} className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-12 h-16 text-4xl text-white/65 hover:text-white" aria-label="Previous photograph">‹</button>
          <img src={`/photos/${activePhoto}`} alt={`Photograph ${activeIndex + 1}`} className="max-w-full max-h-[90vh] object-contain" />
          <button type="button" onClick={() => move(1)} className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-12 h-16 text-4xl text-white/65 hover:text-white" aria-label="Next photograph">›</button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs tracking-[0.16em] text-white/50">
            {String(activeIndex + 1).padStart(2, '0')} / {String(PHOTOS.length).padStart(2, '0')}
          </div>
        </div>
      )}
    </div>
  )
}
