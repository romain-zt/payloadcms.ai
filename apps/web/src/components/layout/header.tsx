import Link from 'next/link'

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-base font-semibold tracking-tight text-zinc-100">
            payloadcms<span className="text-indigo-400">.ai</span>
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="#waitlist"
            className="hidden sm:inline-flex px-3 py-2 text-sm text-zinc-400 transition-colors hover:text-zinc-100"
          >
            Early access
          </a>
          <a
            href="#waitlist"
            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500 min-h-[44px]"
          >
            Join the waitlist
          </a>
        </div>
      </nav>
    </header>
  )
}
