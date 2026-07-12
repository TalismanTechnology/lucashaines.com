import { NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { label: 'Writing', path: '/writing' },
  { label: 'Photography', path: '/photography' },
]

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-black/80 backdrop-blur-sm">
      <nav className="max-w-[1340px] mx-auto px-[15px] py-9 md-tablet:py-[30px] md-tablet:px-[18px] mobile:py-6 mobile:px-[18px]">
        <div className="flex items-center justify-end gap-8 mobile:gap-5">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `nav-link-underline text-xs leading-4 tracking-[-0.12px] font-medium uppercase ${
                    isActive ? 'text-white' : 'text-white/70 hover:text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
        </div>
      </nav>
    </header>
  )
}
