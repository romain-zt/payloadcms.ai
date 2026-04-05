export function Footer() {
  return (
    <footer className="border-t border-zinc-800/50 py-10 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <p className="text-sm font-semibold text-zinc-400">
              payloadcms<span className="text-indigo-400">.ai</span>
            </p>
            <p className="text-xs text-zinc-700 max-w-xs text-center sm:text-left">
              Not affiliated with Payload CMS. Built independently by developers who use Payload every day.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="/privacy"
              className="text-xs text-zinc-600 transition-colors hover:text-zinc-400"
            >
              Privacy
            </a>
            <a
              href="mailto:hello@payloadcms.ai"
              className="text-xs text-zinc-600 transition-colors hover:text-zinc-400"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
