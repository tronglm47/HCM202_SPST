import { Link } from 'react-router-dom'

const navLinks = [
  { label: 'Trang chủ', path: '/' },
  { label: 'Trắc nghiệm nhanh', path: '/quiz' },
  { label: 'Thử thách 1 tuần', path: '/challenge' },
  { label: 'Bảng xếp hạng', path: '/ranking' },
  { label: 'Tham khảo', path: '/references' },
]

export function Navbar() {
  return (
    <header className="sticky top-4 z-30 mb-6 flex justify-center px-4">
      <nav className="flex w-full max-w-5xl items-center justify-between rounded-full border border-bamboo/30 bg-white/80 px-6 py-3 shadow-lg shadow-bamboo/20 backdrop-blur">
        <Link to="/" className="flex flex-col hover:opacity-80 transition">
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-pine/60">
            Lối sống Hồ Chí Minh
          </span>
          <span className="font-serif text-xl text-pine">
            Tinh thần giản dị
          </span>
        </Link>
        <div className="flex flex-wrap justify-end gap-3 text-sm font-medium text-ink/70">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="rounded-full border border-transparent px-4 py-1.5 transition hover:border-lotus/40 hover:text-lotus"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}
