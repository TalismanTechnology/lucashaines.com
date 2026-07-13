import { useEffect, useMemo, useState } from 'react'
import Footer from '../components/Footer'
import Masonry from '../components/Masonry'
import { GALLERY_ITEMS } from '../data/gallery'

export default function Photography() {
  const [activeIndex, setActiveIndex] = useState(null)
  const activePhoto = activeIndex === null ? null : GALLERY_ITEMS[activeIndex]?.file
  const masonryItems = useMemo(
    () =>
      GALLERY_ITEMS.map((photo, index) => ({
        ...photo,
        img: `/gallery/thumbs/${photo.file}`,
        index,
        label: `Open photograph ${index + 1} of ${GALLERY_ITEMS.length}`,
      })),
    [],
  )

  const move = (direction) => {
    setActiveIndex((current) => (current + direction + GALLERY_ITEMS.length) % GALLERY_ITEMS.length)
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

        <div className="px-1" aria-label="Photography gallery">
          <Masonry
            items={masonryItems}
            onItemClick={(item) => setActiveIndex(item.index)}
            ease="power3.out"
            duration={0.6}
            stagger={0.018}
            animateFrom="bottom"
            scaleOnHover
            hoverScale={0.98}
            blurToFocus
          />
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
            {String(activeIndex + 1).padStart(2, '0')} / {String(GALLERY_ITEMS.length).padStart(2, '0')}
          </div>
        </div>
      )}
    </div>
  )
}
