import { useReveal } from '../hooks/useReveal'
import Footer from '../components/Footer'

const STORIES = [
  {
    id: 1,
    title: 'Character',
    date: '2024',
    readTime: '18 min read',
    excerpt: 'An exploration of identity, choice, and the nature of who we become.',
  },
]

export default function ShortStories() {
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
            Short Stories
          </h1>
          <p className="text-base md-tablet:text-sm leading-6 tracking-[-0.16px] text-white/60 max-w-[600px]">
            Narrative explorations in varying lengths, genres, and styles.
          </p>
        </div>

        {/* Stories List */}
        <div className="space-y-8 md-tablet:space-y-6">
          {STORIES.map((story, index) => (
            <a
              key={story.id}
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
                    {story.title}
                  </h3>
                  <span className="text-xs leading-3 tracking-[-0.08px] font-medium uppercase text-white/40 flex-shrink-0">
                    {story.date}
                  </span>
                </div>
                <p className="text-sm leading-5 tracking-[-0.12px] text-white/60 group-hover:text-white/70 transition-colors">
                  {story.excerpt}
                </p>
                <div className="text-xs leading-3 tracking-[-0.08px] font-medium uppercase text-white/30 group-hover:text-white/50 transition-colors">
                  {story.readTime}
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
