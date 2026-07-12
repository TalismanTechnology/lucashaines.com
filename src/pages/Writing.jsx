import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { WRITINGS } from '../data/writings'

const CATEGORY_ORDER = ['Essay', 'Poem', 'Short story', 'Research']

export default function Writing() {
  return (
    <div className="min-h-screen bg-black flex flex-col pt-32 pb-20 px-[15px] md-tablet:px-[18px] mobile:pt-24 mobile:px-[18px]">
      <main className="w-full max-w-[1000px] mx-auto flex-1">
        <header className="mb-20 mobile:mb-14">
          <p className="text-xs uppercase tracking-[0.18em] text-white/45 mb-5">Selected work</p>
          <h1 className="text-[80px] md-tablet:text-[60px] mobile:text-[48px] leading-[0.9] tracking-[-2px] font-medium uppercase">
            Writing
          </h1>
        </header>

        <div className="space-y-20 mobile:space-y-14">
          {CATEGORY_ORDER.map((category) => {
            const entries = WRITINGS.filter((item) => item.category === category)
            if (!entries.length) return null

            return (
              <section key={category}>
                <h2 className="text-xs uppercase tracking-[0.18em] text-white/45 mb-2">{category}</h2>
                <div>
                  {entries.map((item) => (
                    <Link
                      key={item.slug}
                      to={`/writing/${item.slug}`}
                      className="group grid grid-cols-[1fr_auto] gap-8 py-7 border-b border-white/15 hover:border-white/50 transition-colors mobile:block"
                    >
                      <div>
                        <h3 className="text-xl mobile:text-lg leading-tight tracking-[-0.02em] group-hover:text-white/75 transition-colors">
                          {item.title}
                        </h3>
                        {item.summary && (
                          <p className="mt-3 max-w-[680px] text-sm leading-6 text-white/50 mobile:line-clamp-2">
                            {item.summary}
                          </p>
                        )}
                      </div>
                      <span className="text-xl text-white/35 group-hover:text-white transition-colors mobile:hidden" aria-hidden="true">↗</span>
                    </Link>
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      </main>
      <Footer />
    </div>
  )
}
