import { useEffect, useState } from 'react'
import VideoBackground from '../components/VideoBackground'

// Sun-amber, pulled from the golden-hour hero footage
const DOT_COLOR = '#F7A541'

export default function Home() {
  // The hero name is always above the fold, so reveal on mount. An
  // IntersectionObserver never fired on phones: the pre-reveal translate
  // pushed the title below the viewport.
  const [nameVisible, setNameVisible] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setNameVisible(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Video Background */}
      <VideoBackground />

      {/* Contrast gradient behind the hero title */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[42%] bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

      {/* Hero Content */}
      <main className="relative z-[2] w-full h-full flex flex-col justify-end items-end gap-[150px] pt-[190px] px-2 md-tablet:gap-28 md-tablet:pt-auto mobile:justify-end mobile:items-start mobile:gap-[72px] mobile:pt-[140px] mobile:px-1.5">
        {/* Hero Name + Bio */}
        <section className="w-full flex items-end pb-2 mobile:pb-1.5">
          {/* Name */}
          <div
            className={`flex-[2] transition-all duration-[900ms] cubic-bezier(0.16, 1, 0.3, 1) ${
              nameVisible
                ? 'opacity-100'
                : 'opacity-0 translate-y-20'
            }`}
          >
            <h1 className="hero-title text-[240px] leading-[0.78] tracking-[-8px] font-medium uppercase md-tablet:text-[180px] md-tablet:tracking-[-7px] mobile:text-[clamp(96px,26vw,132px)] mobile:tracking-[-5px]">
              Lucas
              <span style={{ color: DOT_COLOR }}>
                .
              </span>
            </h1>
          </div>
        </section>
      </main>
    </div>
  )
}
