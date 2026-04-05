import Link from 'next/link'

export function Cta() {
  return (
    <section className="py-20 sm:py-32 border-t border-zinc-800/50">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
          Stop waiting for content updates.
        </h2>
        <p className="mt-4 text-sm text-zinc-400 sm:text-base max-w-lg mx-auto">
          Your developer is ready. Set up in 2 minutes. No migration needed.
        </p>
        <div className="mt-8">
          <Link
            href="/checkout"
            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-8 py-3 text-sm font-medium transition-colors hover:bg-indigo-500 min-h-[44px]"
          >
            Get your developer
          </Link>
        </div>
      </div>
    </section>
  )
}
