import { useReveal } from '../hooks/useReveal'
import Footer from '../components/Footer'

const PHOTOGRAPHY_SERIES = [
  {
    id: 1,
    title: 'Urban Geometry',
    year: '2024',
    description: 'Exploring architectural forms and urban landscapes',
    imageCount: 12,
  },
  {
    id: 2,
    title: 'Portraits in Motion',
    year: '2024',
    description: 'Capturing candid moments and human connection',
    imageCount: 18,
  },
  {
    id: 3,
    title: 'Nature & Light',
    year: '2023',
    description: 'Natural landscapes and light studies',
    imageCount: 24,
  },
  {
    id: 4,
    title: 'Digital Textures',
    year: '2023',
    description: 'Abstract and experimental digital imagery',
    imageCount: 15,
  },
]

export default function Photography() {
  const { ref: titleRef, isVisible: titleVisible } = useReveal()

  return (
    <div className="min-h-screen bg-black flex flex-col pt-32 pb-20 px-[15px] md-tablet:px-[18px] mobile:pt-24 mobile:px-[18px]">
      <div className="max-w-[1340px] mx-auto">
        {/* Header */}
        <div
          ref={titleRef}
          className={`mb-16 md-tablet:mb-12 mobile:mb-10 transition-all duration-[900ms] ${
            titleVisible ? 'opacity-100' : 'opacity-0 translate-y-10'
          }`}
        >
          <h1 className="text-[80px] md-tablet:text-[60px] mobile:text-[48px] leading-[0.9] tracking-[-2px] font-medium uppercase mb-6">
            Photography
          </h1>
          <p className="text-base md-tablet:text-sm leading-6 tracking-[-0.16px] text-white/60 max-w-[600px]">
            Visual explorations across genres, capturing moments, forms, and light through a lens of curiosity and intention.
          </p>
        </div>

        {/* Series Grid */}
        <div className="grid grid-cols-1 md-tablet:grid-cols-2 gap-12 md-tablet:gap-8">
          {PHOTOGRAPHY_SERIES.map((series, index) => (
            <div
              key={series.id}
              className={`group transition-all duration-[900ms] ${
                titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: titleVisible ? `${(index + 1) * 80}ms` : '0ms',
              }}
            >
              {/* Image Placeholder */}
              <div className="mb-6 aspect-square bg-gradient-to-br from-white/5 to-white/10 rounded-sm overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-white/40 text-sm font-medium mb-2">
                      {series.imageCount} photographs
                    </div>
                    <div className="text-white/20 text-xs">Collection Preview</div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-lg md-tablet:text-base leading-5 tracking-[-0.12px] font-medium uppercase group-hover:text-white/80 transition-colors">
                    {series.title}
                  </h3>
                  <span className="text-xs leading-3 tracking-[-0.08px] font-medium uppercase text-white/40 flex-shrink-0">
                    {series.year}
                  </span>
                </div>
                <p className="text-sm leading-5 tracking-[-0.12px] text-white/50">
                  {series.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
