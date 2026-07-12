import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const NAV_ITEMS = [
  { id: 1, label: 'Essays', path: '/essays' },
  { id: 2, label: 'Poems', path: '/poems' },
  { id: 3, label: 'Short Stories', path: '/short-stories' },
  { id: 4, label: 'Photography', path: '/photography' },
  { id: 5, label: 'Research', path: '/research' },
  { id: 6, label: 'About', path: '/about' },
]

export default function Navbar() {
  const [clock, setClock] = useState('')

  useEffect(() => {
    const updateClock = () => {
      const now = new Date()
      const time = new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(now)
      setClock(`CUP ${time}`)
    }

    updateClock()
    const interval = setInterval(updateClock, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-black/80 backdrop-blur-sm">
      <nav className="max-w-[1340px] mx-auto px-[15px] py-9 md-tablet:py-[30px] md-tablet:px-[18px] mobile:py-6 mobile:px-[18px]">
        <div className="flex items-center justify-between flex-wrap gap-6">
          {/* Navigation */}
          <div className="flex gap-8 md-tablet:gap-4 mobile:gap-4 flex-wrap">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className="nav-link-underline group flex items-baseline gap-2"
              >
                <span className="text-[8px] leading-3 tracking-[-0.08px] font-medium uppercase text-white/60">
                  {String(item.id).padStart(2, '0')}
                </span>
                <span className="text-xs leading-4 tracking-[-0.12px] font-medium uppercase text-white">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Right Side: Email + Clock */}
          <div className="flex gap-8 md-tablet:gap-6 mobile:gap-4 ml-auto">
            <a
              href="mailto:lucas@haines.nyc"
              className="nav-link-underline text-xs leading-4 tracking-[-0.12px] font-medium uppercase"
            >
              lucas@haines.nyc
            </a>
            <div className="text-xs leading-4 tracking-[-0.12px] font-medium uppercase text-white/60">
              {clock}
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
