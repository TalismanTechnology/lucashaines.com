import { useReveal } from '../hooks/useReveal'
import Footer from '../components/Footer'

export default function About() {
  const { ref: titleRef, isVisible: titleVisible } = useReveal()
  const { ref: contentRef, isVisible: contentVisible } = useReveal(0.3)

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
            About
          </h1>
          <p className="text-base md-tablet:text-sm leading-6 tracking-[-0.16px] text-white/60 max-w-[600px]">
            A bit about who I am and what drives my work.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md-tablet:grid-cols-3 gap-12 md-tablet:gap-8">
          {/* Bio */}
          <div
            ref={contentRef}
            className={`md-tablet:col-span-2 space-y-6 transition-all duration-[900ms] ${
              contentVisible ? 'opacity-100' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="space-y-4">
              <h2 className="text-lg md-tablet:text-base leading-5 tracking-[-0.12px] font-medium uppercase">
                Who I Am
              </h2>
              <p className="text-base leading-6 tracking-[-0.16px] text-white/70">
                I'm a writer based in New York. My work spans essays, poetry, short stories, and explorations of creative practice. I'm drawn to language that is precise, evocative, and intentional—writing that respects the reader's intelligence and time.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg md-tablet:text-base leading-5 tracking-[-0.12px] font-medium uppercase">
                What I Write About
              </h2>
              <p className="text-base leading-6 tracking-[-0.16px] text-white/70">
                I write about design, technology, creativity, and human experience. My essays examine how intention shapes form. My poems explore the spaces between thought and language. My short stories investigate character, narrative, and the moments that change us.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg md-tablet:text-base leading-5 tracking-[-0.12px] font-medium uppercase">
                What Drives Me
              </h2>
              <p className="text-base leading-6 tracking-[-0.16px] text-white/70">
                I'm fascinated by how language works, why aesthetics matter, and the relationship between constraint and creativity. I believe good writing—like good design—is invisible: it serves the reader's understanding rather than calling attention to itself. I'm committed to clarity, precision, and honesty.
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div
            className={`space-y-8 transition-all duration-[900ms]`}
            style={{
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? 'translateY(0)' : 'translateY(40px)',
              transitionDelay: '120ms',
            }}
          >
            <div>
              <h3 className="text-xs leading-3 tracking-[-0.08px] font-medium uppercase text-white/40 mb-4">
                Writing Forms
              </h3>
              <div className="space-y-2">
                {['Essays', 'Poetry', 'Short Stories', 'Photography', 'Research'].map((form) => (
                  <p key={form} className="text-sm leading-4 tracking-[-0.12px] text-white/70">
                    {form}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs leading-3 tracking-[-0.08px] font-medium uppercase text-white/40 mb-4">
                Interests
              </h3>
              <div className="space-y-2">
                {['Narrative', 'Language', 'Design', 'Technology', 'Culture'].map((interest) => (
                  <p key={interest} className="text-sm leading-4 tracking-[-0.12px] text-white/70">
                    {interest}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs leading-3 tracking-[-0.08px] font-medium uppercase text-white/40 mb-4">
                Contact
              </h3>
              <div className="space-y-2">
                <a
                  href="mailto:lucas@haines.nyc"
                  className="text-sm leading-4 tracking-[-0.12px] text-white/70 hover:text-white/100 transition-colors"
                >
                  lucas@haines.nyc
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
