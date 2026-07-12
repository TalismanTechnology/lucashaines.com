import { useEffect } from 'react'
import VideoBackground from '../components/VideoBackground'
import { useReveal } from '../hooks/useReveal'

export default function Home({ activeVideoIndex, onVideoChange }) {
  const { ref: nameRef, isVisible: nameVisible } = useReveal()

  // Auto-rotate videos every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      onVideoChange((prev) => (prev + 1) % 3)
    }, 5000)
    return () => clearInterval(interval)
  }, [onVideoChange])

  const isDotPink = activeVideoIndex === 0
  const textColor = isDotPink ? '#F598F2' : '#FFFFFF'

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Video Background */}
      <VideoBackground activeIndex={activeVideoIndex} />

      {/* Hero Content */}
      <main className="relative z-[2] max-w-[1340px] mx-auto h-full flex flex-col justify-end items-end gap-[150px] pt-[190px] px-[15px] md-tablet:gap-28 md-tablet:pt-auto md-tablet:pb-52 md-tablet:pl-24 mobile:justify-end mobile:items-start mobile:gap-[72px] mobile:pt-[140px] mobile:px-[18px]">
        {/* Hero Name + Bio */}
        <section className="w-full flex items-end pb-[60px] mobile:pb-11 md-tablet:pb-0">
          {/* Name */}
          <div
            ref={nameRef}
            className={`flex-[2] transition-all duration-[900ms] cubic-bezier(0.16, 1, 0.3, 1) ${
              nameVisible
                ? 'opacity-100'
                : 'opacity-0 translate-y-20'
            }`}
          >
            <h1 className="text-[200px] leading-[81%] tracking-[-6px] font-medium uppercase md-tablet:text-[129.6px] md-tablet:leading-[113.4px] md-tablet:tracking-[-7.7px] mobile:text-hero-mobile mobile:leading-[96px] mobile:tracking-[-4.8px]">
              Lucas
              <span style={{ color: textColor }} className="transition-colors duration-300">
                .
              </span>
            </h1>
          </div>
        </section>
      </main>
    </div>
  )
}
