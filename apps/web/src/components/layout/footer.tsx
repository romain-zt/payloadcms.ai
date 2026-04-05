export function Footer() {
  return (
    <footer className="border-t border-zinc-800/50 py-8 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-sm text-zinc-500">
            payload<span className="text-indigo-400">.ai</span>
          </p>
          <p className="text-xs text-zinc-600">
            Built for Payload CMS
          </p>
        </div>
      </div>
    </footer>
  )
}
