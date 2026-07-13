export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-transparent border-t border-white/35">
      <div className="max-w-[1340px] mx-auto px-[15px] py-9 md-tablet:py-[30px] md-tablet:px-[18px] mobile:py-6 mobile:px-[18px]">
        <div className="flex items-center justify-between gap-6">
          <p className="text-xs leading-3 tracking-[-0.08px] font-medium uppercase text-white/80">
            © {currentYear} Lucas Haines. All rights reserved.
          </p>
          <div className="flex gap-6 md-tablet:gap-4">
            <a
              href="mailto:lucas@haines.nyc"
              className="text-xs leading-3 tracking-[-0.08px] font-medium uppercase text-white/80 hover:text-white transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
