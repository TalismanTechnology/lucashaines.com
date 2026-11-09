// One seamless loop, four shots with half-second dissolves baked in — golden-hour coast, curtain, road, birds.
// Every shot is composed with a dark lower third so the hero name reads.
export const HERO_VIDEO_URL = '/assets/hero/golden-hour.mp4'
export const HERO_POSTER_URL = '/assets/hero/golden-hour-poster.jpg'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function VideoBackground() {
  const shouldAnimate = !prefersReducedMotion()

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
      <video
        src={HERO_VIDEO_URL}
        poster={HERO_POSTER_URL}
        autoPlay={shouldAnimate}
        muted
        playsInline
        loop
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10 z-[1]" />
    </div>
  )
}
