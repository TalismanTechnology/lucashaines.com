import { useReveal } from '../hooks/useReveal'
import Footer from '../components/Footer'

const ESSAYS = [
  {
    id: 1,
    title: 'Examining the Integrity of Free Will in Paradise Lost',
    excerpt: 'An exploration of Milton\'s complex treatment of free will and divine predestination.',
    date: '2024',
    readTime: '15 min read',
  },
  {
    id: 2,
    title: 'The Mask Is Who We Are',
    excerpt: 'On identity, performance, and the self we present to the world.',
    date: '2024',
    readTime: '12 min read',
  },
  {
    id: 3,
    title: 'Odysseus, The Master Weaver',
    excerpt: 'Language, cunning, and the art of narrative in Homer\'s epic.',
    date: '2024',
    readTime: '14 min read',
  },
  {
    id: 4,
    title: 'Antigone\'s Conservative Rebellion',
    excerpt: 'Sophocles\' heroine and the tension between duty and defiance.',
    date: '2024',
    readTime: '13 min read',
  },
]

export default function Essays() {
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
            Essays
          </h1>
          <p className="text-base md-tablet:text-sm leading-6 tracking-[-0.16px] text-white/60 max-w-[600px]">
            Thoughts on design, technology, creativity, and the intersection of digital craft.
          </p>
        </div>

        {/* Essays List */}
        <div className="space-y-8 md-tablet:space-y-6">
          {ESSAYS.map((essay, index) => (
            <a
              key={essay.id}
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
                  <h3 className="text-lg md-tablet:text-base leading-6 tracking-[-0.12px] font-medium group-hover:text-white/80 transition-colors">
                    {essay.title}
                  </h3>
                  <span className="text-xs leading-3 tracking-[-0.08px] font-medium uppercase text-white/40 flex-shrink-0">
                    {essay.date}
                  </span>
                </div>
                <p className="text-sm leading-5 tracking-[-0.12px] text-white/60 group-hover:text-white/70 transition-colors">
                  {essay.excerpt}
                </p>
                <div className="text-xs leading-3 tracking-[-0.08px] font-medium uppercase text-white/30 group-hover:text-white/50 transition-colors">
                  {essay.readTime}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
