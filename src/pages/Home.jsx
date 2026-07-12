import { useEffect } from 'react'
import VideoBackground from '../components/VideoBackground'
import { useReveal } from '../hooks/useReveal'

export default function Home({ activeVideoIndex, onVideoChange }) {
  const { ref: nameRef, isVisible: nameVisible } = useReveal()
  const { ref: ctaRef, isVisible: ctaVisible } = useReveal()

  // Auto-rotate videos every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      onVideoChange((prev) => (prev + 1) % 3)
    }, 5000)
    return () => clearInterval(interval)
  }, [onVideoChange])

  const isDotPink = activeVideoIndex === 0
  const dotColor = isDotPink ? '#F598F2' : '#FFFFFF'
  const textColor = isDotPink ? '#F598F2' : '#FFFFFF'

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Video Background */}
      <VideoBackground activeIndex={activeVideoIndex} />

      {/* Hero Content */}
      <main className="relative z-[2] max-w-[1340px] mx-auto h-full flex flex-col justify-end items-end gap-[150px] pt-[190px] px-[15px] md-tablet:gap-28 md-tablet:pt-auto md-tablet:pb-52 md-tablet:pl-24 mobile:justify-end mobile:items-start mobile:gap-[72px] mobile:pt-[140px] mobile:px-[18px]">
        {/* Availability Indicator */}
        <section className="w-full flex justify-end mobile:justify-start">
          <div className="flex items-center gap-3">
            <div
              className="dot-glow w-[7px] h-[7px] animate-dot-pulse"
              style={{ backgroundColor: dotColor }}
            />
            <span className="text-xs leading-4 tracking-[-0.12px] font-medium uppercase">
              Available for work
            </span>
          </div>
        </section>

        {/* Hero Name + Bio */}
        <section className="w-full flex justify-between items-end gap-12 mobile:gap-8 mobile:flex-col mobile:items-start pb-[60px] mobile:pb-11 md-tablet:gap-6 md-tablet:pb-0">
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

          {/* Bio Section */}
          <div
            ref={ctaRef}
            className={`flex-1 mobile:max-w-[420px] transition-all duration-[900ms] cubic-bezier(0.16, 1, 0.3, 1) ${
              ctaVisible
                ? 'opacity-100'
                : 'opacity-0 translate-x-24'
            }`}
            style={{
              transitionDelay: ctaVisible ? '80ms' : '0ms',
            }}
          >
            <p className="text-base leading-6 tracking-[-0.16px] font-medium text-white/80">
              Writer. Essays, poems, short stories, and explorations of creative practice.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}
