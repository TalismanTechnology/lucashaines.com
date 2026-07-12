import { Link, Navigate, useParams } from 'react-router-dom'
import { getWriting } from '../data/writings'

export default function WritingDetail() {
  const { slug } = useParams()
  const writing = getWriting(slug)

  if (!writing) return <Navigate to="/writing" replace />

  return (
    <div className="min-h-screen bg-[#f3f0e9] text-[#171717] pt-32 pb-24 px-6 mobile:pt-24 mobile:px-[18px]">
      <article className="max-w-[720px] mx-auto">
        <Link to="/writing" className="inline-block mb-16 text-xs uppercase tracking-[0.16em] text-black/50 hover:text-black">
          ← All writing
        </Link>
        <header className="mb-14">
          <p className="text-xs uppercase tracking-[0.18em] text-black/45 mb-5">{writing.category}</p>
          <h1 className="text-[54px] mobile:text-[38px] leading-[1.02] tracking-[-0.035em] font-medium">
            {writing.title}
          </h1>
        </header>
        <div
          className={`writing-body ${writing.category === 'Poem' ? 'writing-body--poem' : ''}`}
          dangerouslySetInnerHTML={{ __html: writing.html.replaceAll('href="works/', 'href="/works/') }}
        />
      </article>
    </div>
  )
}
