import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import { getWriting, WRITINGS } from '../data/writings'

function getReadingTime(html) {
  const wordCount = html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&[^;]+;/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length

  return Math.max(1, Math.ceil(wordCount / 220))
}

export default function WritingDetail() {
  const { slug } = useParams()
  const writing = getWriting(slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!writing) return <Navigate to="/writing" replace />

  const currentIndex = WRITINGS.findIndex((item) => item.slug === writing.slug)
  const nextWriting = WRITINGS[(currentIndex + 1) % WRITINGS.length]
  const readingTime = getReadingTime(writing.html)
  const categoryClass = writing.category.toLowerCase().replace(/\s+/g, '-')
  const titleClass = writing.title.length > 52 ? 'writing-detail--long-title' : ''

  return (
    <div className={`writing-detail sky-page writing-detail--${categoryClass} ${titleClass}`}>
      <div className="writing-detail__progress" aria-hidden="true" />

      <main>
        <section className="writing-detail__hero" aria-labelledby="writing-title">
          <div className="writing-detail__hero-inner">
            <Link to="/writing" className="writing-detail__back">
              <span aria-hidden="true">←</span>
              <span>All writing</span>
            </Link>

            <div className="writing-detail__title-block">
              <div className="writing-detail__meta">
                <span>{writing.category}</span>
                <span className="writing-detail__meta-rule" aria-hidden="true" />
                <span>{readingTime} min read</span>
              </div>
              <h1 id="writing-title">{writing.title}</h1>
            </div>

            <a href="#piece" className="writing-detail__scroll-cue">
              <span>Read the piece</span>
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>

        <article id="piece" className="writing-detail__article">
          <aside className="writing-detail__rail" aria-label="Piece details">
            <span>Lucas Haines</span>
            <span>{writing.category}</span>
            <span>{String(currentIndex + 1).padStart(2, '0')} / {String(WRITINGS.length).padStart(2, '0')}</span>
          </aside>

          <div
            className={`writing-body ${writing.category === 'Poem' ? 'writing-body--poem' : ''}`}
            dangerouslySetInnerHTML={{ __html: writing.html.replaceAll('href="works/', 'href="/works/') }}
          />
        </article>

        <Link to={`/writing/${nextWriting.slug}`} className="writing-detail__next">
          <span className="writing-detail__next-label">Next piece · {nextWriting.category}</span>
          <span className="writing-detail__next-title">{nextWriting.title}</span>
          <span className="writing-detail__next-arrow" aria-hidden="true">↗</span>
        </Link>
      </main>

      <Footer />
    </div>
  )
}
