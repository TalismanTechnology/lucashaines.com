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
      <main className="relative z-[2] w-full h-full flex flex-col justify-end items-end gap-[150px] pt-[190px] px-2 md-tablet:gap-28 md-tablet:pt-auto mobile:justify-end mobile:items-start mobile:gap-[72px] mobile:pt-[140px] mobile:px-1.5">
        {/* Hero Name + Bio */}
        <section className="w-full flex items-end pb-2 mobile:pb-1.5">
          {/* Name */}
          <div
            ref={nameRef}
            className={`flex-[2] transition-all duration-[900ms] cubic-bezier(0.16, 1, 0.3, 1) ${
              nameVisible
                ? 'opacity-100'
                : 'opacity-0 translate-y-20'
            }`}
          >
            <h1 className="text-[240px] leading-[0.78] tracking-[-8px] font-medium uppercase md-tablet:text-[180px] md-tablet:tracking-[-7px] mobile:text-[clamp(96px,26vw,132px)] mobile:tracking-[-5px]">
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
