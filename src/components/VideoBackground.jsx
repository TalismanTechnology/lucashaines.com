import { useEffect, useRef, useState } from 'react'

const VIDEO_URLS = [
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260629_030107_874273ea-684a-4e90-bb96-8fdfde48d53d.mp4',
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260629_032424_3c9c2a9d-807b-4482-80e6-dd6d9dfd4545.mp4',
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260627_094019_4214ea73-b963-46a4-8327-61489192de99.mp4',
]

export default function VideoBackground({ activeIndex = 0 }) {
  const [videoUrls, setVideoUrls] = useState(VIDEO_URLS)
  const videoRefs = useRef([])

  useEffect(() => {
    const preloadVideos = async () => {
      const urls = await Promise.all(
        VIDEO_URLS.map(async (url) => {
          try {
            const response = await fetch(url)
            const blob = await response.blob()
            return URL.createObjectURL(blob)
          } catch (error) {
            console.warn(`Failed to preload video: ${url}`, error)
            return url // Fallback to original URL
          }
        })
      )
      setVideoUrls(urls)
    }

    preloadVideos()
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
      {/* Videos */}
      {videoUrls.map((url, index) => (
        <video
          key={index}
          ref={(el) => (videoRefs.current[index] = el)}
          src={url}
          autoPlay
          muted
          playsInline
          loop
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
