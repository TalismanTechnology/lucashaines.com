import { useEffect, useState } from 'react'
import Footer from '../components/Footer'

// Generated from the updated W PHOTOS folder and ordered by a true-color spectrum.
const PHOTOS = Array.from({ length: 82 }, (_, index) => `${String(index + 1).padStart(3, '0')}.jpg`)

const thumbnailFor = (file) => `/gallery/thumbs/${file}`

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
    <div className="sky-page min-h-screen flex flex-col pt-32 pb-20 mobile:pt-24">
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
          <img src={`/gallery/full/${activePhoto}`} alt={`Photograph ${activeIndex + 1}`} className="max-w-full max-h-[90vh] object-contain" />
          <button type="button" onClick={() => move(1)} className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-12 h-16 text-4xl text-white/65 hover:text-white" aria-label="Next photograph">›</button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs tracking-[0.16em] text-white/50">
            {String(activeIndex + 1).padStart(2, '0')} / {String(PHOTOS.length).padStart(2, '0')}
          </div>
        </div>
      )}
    </div>
  )
}
