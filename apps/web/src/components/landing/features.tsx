const FEATURES = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/>
        <path d="M7 7h.01"/>
      </svg>
    ),
    title: 'Native Payload Integration',
    description: 'Built specifically for Payload CMS. No hacks, no connectors. Reads your schema, respects your access control.',
    detail: 'Works with Payload v2 and v3',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.35-4.35"/>
        <path d="M11 8v6M8 11h6"/>
      </svg>
    ),
    title: 'RAG-Powered Content Search',
    description: 'Instantly query your content using embeddings and semantic search. Find exactly what you need, no matter how you phrase it.',
    detail: 'OpenAI & local embedding support',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2a7 7 0 0 1 7 7c0 3-1.5 5-3 6.5V18a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2.5C6.5 14 5 12 5 9a7 7 0 0 1 7-7z"/>
        <path d="M9 22h6"/>
      </svg>
    ),
    title: 'AI Content Generation',
    description: 'Draft, rewrite, and structure content directly from your CMS data. Context-aware generation that knows your existing content.',
    detail: 'GPT-4o, Claude 3.5, and more',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    title: 'Automation Workflows',
    description: 'Trigger actions based on content updates, user behavior, or API events. Build once, run automatically.',
    detail: 'Webhook-compatible, fully auditable',
  },
]

export function Features() {
  return (
    <section className="border-t border-zinc-800/50 py-20 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-indigo-400">
            What it does
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-50 sm:text-3xl md:text-4xl">
            Everything your Payload team needs
          </h2>
          <p className="mt-4 text-sm text-zinc-500 sm:text-base leading-relaxed">
            Not a generic AI wrapper. Purpose-built for Payload — from schema awareness to collection-level access control.
          </p>
        </div>

        {/* Feature grid */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 sm:mt-16 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 transition-all hover:border-zinc-700 hover:bg-zinc-900/70"
            >
              {/* Subtle hover glow */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-indigo-600/0 to-indigo-600/0 opacity-0 transition-opacity group-hover:from-indigo-600/5 group-hover:opacity-100" />

              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-400">
                {feature.icon}
              </div>

              <div>
                <h3 className="text-sm font-semibold text-zinc-100 sm:text-base">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              <div className="mt-auto pt-2">
                <span className="inline-flex items-center gap-1.5 text-[11px] text-zinc-600">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                  {feature.detail}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
