import Link from 'next/link'

export function Cta() {
  return (
    <section className="py-20 sm:py-32 border-t border-zinc-800/50">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
          Ready to try it?
        </h2>
        <p className="mt-4 text-sm text-zinc-400 sm:text-base max-w-lg mx-auto">
          Drop it into your existing PayloadCMS project. No migration, no infrastructure changes.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="#install"
            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-8 py-3 text-sm font-medium transition-colors hover:bg-indigo-500 min-h-[44px]"
          >
            Get started
          </Link>
          <a
            href="https://github.com/payloadcms/ai-assistant"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg border border-zinc-700 px-8 py-3 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-600 hover:text-zinc-100 min-h-[44px]"
          >
            Read the docs
          </a>
        </div>
      </div>
    </section>
  )
}
