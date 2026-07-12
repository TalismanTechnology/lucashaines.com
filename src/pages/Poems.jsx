import { useReveal } from '../hooks/useReveal'
import Footer from '../components/Footer'

const POEMS = [
  {
    id: 1,
    title: 'Debt',
    date: '2024',
    excerpt: 'What we owe and what cannot be repaid...',
  },
  {
    id: 2,
    title: 'Sleep',
    date: '2024',
    excerpt: 'The space between waking and the unknown...',
  },
]

export default function Poems() {
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
            Poems
          </h1>
          <p className="text-base md-tablet:text-sm leading-6 tracking-[-0.16px] text-white/60 max-w-[600px]">
            Poetic explorations of form, space, and the spaces between.
          </p>
        </div>

        {/* Poems Grid */}
        <div className="grid grid-cols-1 md-tablet:grid-cols-2 gap-12 md-tablet:gap-8">
          {POEMS.map((poem, index) => (
            <a
              key={poem.id}
              href="#"
              onClick={(e) => e.preventDefault()}
              className={`group transition-all duration-[900ms] ${
                titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: titleVisible ? `${(index + 1) * 60}ms` : '0ms',
              }}
            >
              <div className="space-y-3">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-lg md-tablet:text-base leading-5 tracking-[-0.12px] font-medium group-hover:text-white/80 transition-colors">
                    {poem.title}
                  </h3>
                  <span className="text-xs leading-3 tracking-[-0.08px] font-medium uppercase text-white/40 flex-shrink-0">
                    {poem.date}
                  </span>
                </div>
                <p className="text-sm leading-6 tracking-[-0.12px] text-white/60 group-hover:text-white/70 transition-colors italic">
                  "{poem.excerpt}"
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
