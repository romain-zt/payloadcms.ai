export function Demo() {
  return (
    <section id="demo" className="py-20 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            Watch your developer work
          </h2>
          <p className="mt-4 text-sm text-zinc-400 sm:text-base max-w-xl mx-auto">
            Tell it what you need. It handles the CMS.
          </p>
        </div>

        <div className="mt-12 sm:mt-16 mx-auto max-w-3xl">
          <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50">
            <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-zinc-700" />
              <div className="h-3 w-3 rounded-full bg-zinc-700" />
              <div className="h-3 w-3 rounded-full bg-zinc-700" />
              <span className="ml-2 text-xs text-zinc-500">payload.ai</span>
            </div>
            <div className="p-4 sm:p-6 space-y-4">
              <div className="flex gap-3">
                <div className="h-8 w-8 shrink-0 rounded-full bg-indigo-600/20 flex items-center justify-center text-xs text-indigo-400">
                  You
                </div>
                <div className="rounded-lg bg-zinc-800/50 px-4 py-2.5 text-sm text-zinc-300">
                  Create a blog post about Next.js 15 features with a hero image
                </div>
              </div>
              <div className="flex gap-3">
                <div className="h-8 w-8 shrink-0 rounded-full bg-emerald-600/20 flex items-center justify-center text-xs text-emerald-400">
                  Dev
                </div>
                <div className="rounded-lg bg-zinc-800/50 px-4 py-2.5 text-sm text-zinc-300 space-y-2">
                  <p>Done. Created &quot;Next.js 15: What&apos;s New&quot; in your Posts collection.</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="rounded bg-emerald-900/30 px-2 py-0.5 text-emerald-400">entry created</span>
                    <span className="rounded bg-emerald-900/30 px-2 py-0.5 text-emerald-400">image uploaded</span>
                    <span className="rounded bg-emerald-900/30 px-2 py-0.5 text-emerald-400">published</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
