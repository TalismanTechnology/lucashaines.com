import { NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { number: '01', label: 'Writing', path: '/writing' },
  { number: '02', label: 'Photography', path: '/photography' },
]

export default function Navbar() {
  return (
    <header className="site-header fixed top-0 left-0 right-0 z-10">
      <nav className="relative z-[1] max-w-[1340px] mx-auto px-[15px] pt-5 pb-14 md-tablet:px-[18px] mobile:px-[12px] mobile:pt-3 mobile:pb-10">
        <div className="flex items-center justify-end gap-7 mobile:gap-5">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `editorial-nav-link ${
                    isActive ? 'editorial-nav-link--active' : ''
                  }`
                }
              >
                <span className="editorial-nav-index">{item.number}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
        </div>
      </nav>
    </header>
  )
}
