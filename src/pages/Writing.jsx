import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { WRITINGS } from '../data/writings'

const CATEGORY_ORDER = ['Essay', 'Poem', 'Short story', 'Research']

export default function Writing() {
  return (
    <div className="min-h-screen bg-black flex flex-col pt-28 pb-16 px-[15px] md-tablet:px-[18px] mobile:pt-24 mobile:px-[18px]">
      <main className="w-full max-w-[1120px] mx-auto flex-1">
        <header className="mb-12 mobile:mb-10">
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/45 mb-3">Selected work</p>
          <h1 className="text-[64px] md-tablet:text-[54px] mobile:text-[44px] leading-[0.9] tracking-[-2px] font-medium uppercase">
            Writing
          </h1>
        </header>

        <div className="grid md-tablet:grid-cols-2 lg:grid-cols-2 gap-x-14 gap-y-10 mobile:gap-y-8">
          {CATEGORY_ORDER.map((category) => {
            const entries = WRITINGS.filter((item) => item.category === category)
            if (!entries.length) return null

            return (
              <section key={category}>
                <h2 className="text-[10px] uppercase tracking-[0.18em] text-white/45 pb-3 border-b border-white/30">{category}</h2>
                <div className="divide-y divide-white/10">
                  {entries.map((item, index) => (
                    <Link
                      key={item.slug}
                      to={`/writing/${item.slug}`}
                      className="group grid min-h-[52px] grid-cols-[24px_1fr_auto] items-center gap-3 py-3 text-white/80 hover:text-white transition-colors"
                    >
                      <span className="text-[9px] tabular-nums text-white/30">{String(index + 1).padStart(2, '0')}</span>
                      <h3 className="text-[15px] mobile:text-sm leading-snug tracking-[-0.01em] text-pretty">
                        {item.title}
                      </h3>
                      <span className="text-sm text-white/25 group-hover:text-white transition-colors" aria-hidden="true">↗</span>
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
