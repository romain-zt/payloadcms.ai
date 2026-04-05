const BEFORE = [
  {
    label: 'Open 5 menus just to create a page',
  },
  {
    label: 'Copy-paste IDs to build REST queries',
  },
  {
    label: 'Context-switch between code and admin',
  },
  {
    label: 'Ask a developer to run a one-off query',
  },
  {
    label: 'Forget the field name, go check the schema',
  },
  {
    label: 'Upload media, rename it, link it manually',
  },
]

export function Benefits() {
  return (
    <section className="py-20 sm:py-32 border-t border-zinc-800/50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">Before</p>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl text-zinc-300">
            Managing content is more work than it should be.
          </h2>
          <p className="mt-4 text-sm text-zinc-500 sm:text-base max-w-xl mx-auto">
            PayloadCMS is powerful. But the admin UI was built for developers — not for the people who update content every day.
          </p>
        </div>

        <div className="mt-12 sm:mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {BEFORE.map((item) => (
            <div
              key={item.label}
              className="flex items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-900/30 px-5 py-4"
            >
              <span className="mt-0.5 shrink-0 text-red-500/60" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </span>
              <span className="text-sm text-zinc-400 leading-relaxed">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
