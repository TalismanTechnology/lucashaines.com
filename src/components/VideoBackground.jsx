import { useRef } from 'react'

export const VIDEO_URLS = [
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260629_030107_874273ea-684a-4e90-bb96-8fdfde48d53d.mp4',
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260629_032424_3c9c2a9d-807b-4482-80e6-dd6d9dfd4545.mp4',
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260627_094019_4214ea73-b963-46a4-8327-61489192de99.mp4',
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
