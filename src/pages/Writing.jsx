import { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { WRITINGS } from '../data/writings'
import { getReadingTime } from '../lib/readingTime'

const SECTIONS = [
  { category: 'Essay', label: 'Essays' },
  { category: 'Poem', label: 'Poems' },
  { category: 'Short story', label: 'Short story' },
  { category: 'Research', label: 'Research' },
]

const pad = (n) => String(n).padStart(2, '0')
const sectionId = (label) => `section-${label.toLowerCase().replace(/\s+/g, '-')}`

// One running number through the whole contents, in section order
const GROUPS = (() => {
  let running = 0
  return SECTIONS.map(({ category, label }) => ({
    label,
    entries: WRITINGS.filter((item) => item.category === category).map((item) => ({
      ...item,
      number: pad(++running),
      minutes: getReadingTime(item.html),
    })),
  })).filter((group) => group.entries.length)
})()

/**
 * Fixed backdrop: the golden-hour sky by default, crossfading to the
 * hovered piece's photograph. Layers mount on first hover so the page
 * doesn't download every image up front.
 */
function Backdrop({ activeSlug, seenSlugs }) {
  return (
    <div className="writing-contents__backdrop" aria-hidden="true">
      <div className="writing-contents__layer writing-contents__layer--sky is-visible" />
      {seenSlugs.map((slug) => (
        <div
          key={slug}
          className={`writing-contents__layer ${activeSlug === slug ? 'is-visible' : ''}`}
          style={{ backgroundImage: `url("/assets/writing/${slug}.jpg")` }}
        />
      ))}
      <div className="writing-contents__scrim" />
    </div>
  )
}

export default function Writing() {
  const [activeSlug, setActiveSlug] = useState(null)
  const [seenSlugs, setSeenSlugs] = useState([])

  const preview = (slug) => {
    setActiveSlug(slug)
    setSeenSlugs((seen) => (seen.includes(slug) ? seen : [...seen, slug]))
  }

  return (
    <div className="writing-contents min-h-screen flex flex-col">
      <Backdrop activeSlug={activeSlug} seenSlugs={seenSlugs} />

      <main className="writing-contents__grid">
        <header>
          <p className="writing-contents__eyebrow">Selected work</p>
          <h1 className="writing-contents__title">Writing</h1>
          <p className="writing-contents__lede">
            Essays on literature, a pair of poems, a short story, and an original study of how we scroll.
          </p>
        </header>

        <div className="writing-contents__list" onMouseLeave={() => setActiveSlug(null)}>
          {GROUPS.map((group) => (
            <section
              key={group.label}
              id={sectionId(group.label)}
              className="writing-contents__section"
              aria-labelledby={`${sectionId(group.label)}-heading`}
            >
              <h2 id={`${sectionId(group.label)}-heading`} className="writing-contents__section-label">
                {group.label}
              </h2>

              <ol>
                {group.entries.map((item) => (
                  <li key={item.slug}>
                    <Link
                      to={`/writing/${item.slug}`}
                      className="writing-contents__row"
                      onMouseEnter={() => preview(item.slug)}
                      onFocus={() => preview(item.slug)}
                      onBlur={() => setActiveSlug(null)}
                    >
                      <span className="writing-contents__number">{item.number}</span>
                      <span className="writing-contents__entry-title">{item.title}</span>
                      <span className="writing-contents__meta">{item.minutes} min</span>
                      <span className="writing-contents__arrow" aria-hidden="true">→</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
