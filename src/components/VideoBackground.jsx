import { useRef } from 'react'

export const VIDEO_URLS = [
  '/assets/hero/painterly-01.mp4',
  '/assets/hero/painterly-02.mp4',
  '/assets/hero/painterly-03.mp4',
]

export default function VideoBackground({ activeIndex = 0 }) {
  const videoRefs = useRef([])

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
      {/* Videos */}
      {VIDEO_URLS.map((url, index) => (
        <video
          key={index}
          ref={(el) => (videoRefs.current[index] = el)}
          src={url}
          autoPlay
          muted
          playsInline
          loop
          preload={index === 0 ? 'auto' : 'metadata'}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] ease-in-out ${
            activeIndex === index ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10 z-[1]" />
    </div>
  )
}
