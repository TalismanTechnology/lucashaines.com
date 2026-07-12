import { useReveal } from '../hooks/useReveal'
import Footer from '../components/Footer'

const RESEARCH = [
  {
    id: 1,
    title: 'The Elliptical Model',
    category: 'Theory & Analysis',
    date: '2024',
    description: 'A comprehensive exploration of elliptical structures and their applications.',
  },
]

export default function Research() {
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
            Research
          </h1>
          <p className="text-base md-tablet:text-sm leading-6 tracking-[-0.16px] text-white/60 max-w-[600px]">
            Deep dives into design, technology, and creative practice.
          </p>
        </div>

        {/* Research List */}
        <div className="space-y-8 md-tablet:space-y-6">
          {RESEARCH.map((item, index) => (
            <a
              key={item.id}
              href="#"
              onClick={(e) => e.preventDefault()}
              className={`group block pb-8 md-tablet:pb-6 border-b border-white/10 hover:border-white/30 transition-all duration-300 transition-all duration-[900ms] ${
                titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: titleVisible ? `${(index + 1) * 60}ms` : '0ms',
              }}
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-baseline justify-between gap-4">
                  <div>
                    <h3 className="text-lg md-tablet:text-base leading-6 tracking-[-0.12px] font-medium group-hover:text-white/80 transition-colors mb-1">
                      {item.title}
                    </h3>
                    <span className="text-xs leading-3 tracking-[-0.08px] font-medium uppercase text-white/40">
                      {item.category}
                    </span>
                  </div>
                  <span className="text-xs leading-3 tracking-[-0.08px] font-medium uppercase text-white/40 flex-shrink-0">
                    {item.date}
                  </span>
                </div>
                <p className="text-sm leading-5 tracking-[-0.12px] text-white/60 group-hover:text-white/70 transition-colors">
                  {item.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
