const AFTER = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    label: 'Ask to create a page in plain language',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    label: 'Update any field just by describing the change',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    label: 'Find documents without knowing the query syntax',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    label: 'Upload and organize media with a single message',
  },
]

const CHAT = [
  {
    role: 'user' as const,
    text: 'Create a blog post about the v3 launch. Title it "PayloadCMS v3 is here". Set status to draft.',
  },
  {
    role: 'assistant' as const,
    text: 'Done. Created "PayloadCMS v3 is here" in your Posts collection — saved as draft.',
    tags: ['post created', 'status: draft'],
  },
  {
    role: 'user' as const,
    text: 'Now publish it.',
  },
  {
    role: 'assistant' as const,
    text: 'Published.',
    tags: ['status: published'],
  },
]

export function Demo() {
  return (
    <section id="demo" className="py-20 sm:py-32 border-t border-zinc-800/50">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">After</p>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            Your team just asks for what they need.
          </h2>
          <p className="mt-4 text-sm text-zinc-400 sm:text-base max-w-xl mx-auto">
            No training required. If you can describe it, the assistant can do it.
          </p>
        </div>

        <div className="mt-12 sm:mt-16 grid gap-8 sm:grid-cols-2 items-start">
          <div className="flex flex-col gap-3">
            {AFTER.map((item) => (
              <div key={item.label} className="flex items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-900/30 px-5 py-4">
                <span className="mt-0.5 shrink-0 text-emerald-500" aria-hidden="true">
                  {item.icon}
                </span>
                <span className="text-sm text-zinc-300 leading-relaxed">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50">
            <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-zinc-700" />
              <div className="h-3 w-3 rounded-full bg-zinc-700" />
              <div className="h-3 w-3 rounded-full bg-zinc-700" />
              <span className="ml-2 text-xs text-zinc-500 font-mono">AI Assistant</span>
            </div>
            <div className="p-4 sm:p-5 space-y-4">
              {CHAT.map((msg, i) => (
                <div key={i} className="flex gap-3">
                  <div
                    className={`h-7 w-7 shrink-0 rounded-full flex items-center justify-center text-xs font-medium ${
                      msg.role === 'user'
                        ? 'bg-indigo-600/20 text-indigo-400'
                        : 'bg-zinc-700/50 text-zinc-400'
                    }`}
                  >
                    {msg.role === 'user' ? 'You' : 'AI'}
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="rounded-lg bg-zinc-800/50 px-3.5 py-2.5 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      {msg.text}
                    </div>
                    {msg.tags && (
                      <div className="flex flex-wrap gap-1.5">
                        {msg.tags.map((tag) => (
                          <span key={tag} className="rounded bg-emerald-900/30 px-2 py-0.5 text-xs text-emerald-400">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
