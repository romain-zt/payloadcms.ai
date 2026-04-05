import Link from 'next/link'

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          payload<span className="text-indigo-400">.ai</span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/pricing"
            className="px-3 py-2 text-sm text-zinc-400 transition-colors hover:text-zinc-100"
          >
            Pricing
          </Link>
          <Link
            href="/checkout"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium transition-colors hover:bg-indigo-500 min-h-[44px] flex items-center"
          >
            Get your developer
          </Link>
        </div>
      </nav>
    </header>
  )
}
