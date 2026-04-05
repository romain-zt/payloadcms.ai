import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4 pt-16 text-center">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-zinc-950 to-zinc-950" />

      <div className="mx-auto max-w-3xl">
        <div className="mb-6 inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-1.5 text-xs sm:text-sm text-zinc-400">
          PayloadCMS plugin — open source
        </div>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Add an AI assistant{' '}
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            to your CMS.
          </span>
        </h1>

        <p className="mt-6 text-base text-zinc-400 sm:text-lg md:text-xl max-w-2xl mx-auto">
          One plugin. Three steps. Your team can create, update, and query content by just asking for it.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="#install"
            className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium transition-colors hover:bg-indigo-500 min-h-[44px] flex items-center justify-center"
          >
            Get started in 3 steps
          </Link>
          <a
            href="https://github.com/payloadcms/ai-assistant"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-600 hover:text-zinc-100 min-h-[44px] flex items-center justify-center"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
