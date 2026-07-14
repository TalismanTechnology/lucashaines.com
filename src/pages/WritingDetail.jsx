import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import { getWriting, WRITINGS } from '../data/writings'

const STUDY_FIGURES = [
  {
    after: 'more input cannot reverse the descent.',
    src: '/works/figures/elliptical-fig1.png',
    alt: 'The basic elliptical path plotted across Quality and Phase axes.',
    number: 'Figure 1',
    caption: 'The basic ellipse rises to a peak, falls past zero into the lower half, then loops back to the start.',
  },
  {
    after: 'You have not yet felt the shift.',
    src: '/works/figures/elliptical-fig2.png',
    alt: 'The upper-left approach arc highlighted on the elliptical model.',
    number: 'Figure 2',
    caption: 'The Approach. Sessions that close out within this upper-left arc remain net positive.',
  },
  {
    after: 'active dopamine debt.',
    src: '/works/figures/elliptical-fig3.png',
    alt: 'The full elliptical trajectory with the lower crash arc highlighted.',
    number: 'Figure 3',
    caption: 'The full trajectory. The dashed arc marks the path most users follow into the lower half.',
  },
  {
    after: 'remain within it for an hour without entering the descent.',
    src: '/works/figures/elliptical-fig4.png',
    alt: 'A tall narrow ellipse beside a wide shallow ellipse, comparing short-form and long-form media.',
    number: 'Figure 4a-b',
    caption: 'Short-form video creates a brief optimal zone and sharp crash; long-form media creates an extended optimal zone and gradual decline.',
  },
  {
    after: 'What changes is where on the page the ellipse is drawn.',
    src: '/works/figures/elliptical-fig5.png',
    alt: 'Three overlapping ellipses drifting forward and downward across successive sessions.',
    number: 'Figure 5',
    caption: 'Cumulative drift across sessions. Each new ellipse begins further along P and lower on Q.',
  },
]

function getRenderedHtml(writing) {
  let html = writing.html.replaceAll('href="works/', 'href="/works/')

  if (writing.slug !== 'study-elliptical') return html

  STUDY_FIGURES.forEach((figure) => {
    const marker = `${figure.after}</p>`
    const figureHtml = `
      <figure class="study-figure">
        <img src="${figure.src}" alt="${figure.alt}" width="1148" height="600" loading="lazy" decoding="async">
        <figcaption><span>${figure.number}</span>${figure.caption}</figcaption>
      </figure>`

    html = html.replace(marker, `${marker}${figureHtml}`)
  })

  return html
}

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
  const renderedHtml = getRenderedHtml(writing)
  const backgroundImage = `/assets/writing/${writing.slug}.png`

  return (
    <div
      className={`writing-detail sky-page writing-detail--${categoryClass} ${titleClass}`}
      style={{ '--writing-detail-background': `url("${backgroundImage}")` }}
    >
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
            dangerouslySetInnerHTML={{ __html: renderedHtml }}
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
