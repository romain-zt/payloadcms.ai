import { DemoButton } from '@/components/landing/demo-button'

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4 pt-20 pb-12 text-center overflow-hidden">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-zinc-950" />
        <div className="absolute left-1/2 top-1/4 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute left-1/3 bottom-0 h-[400px] w-[400px] rounded-full bg-violet-600/8 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-4xl">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-medium text-indigo-300">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-indigo-400" />
          </span>
          Private beta — accepting early teams now
        </div>

        {/* Headline */}
        <h1 className="text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl md:text-6xl lg:text-7xl">
          The AI layer for{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-300 bg-clip-text text-transparent">
            Payload CMS
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base text-zinc-400 sm:text-lg md:text-xl leading-relaxed">
          Query, generate, and automate your content — directly inside Payload.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href="#waitlist"
            className="inline-flex min-h-[44px] w-full items-center justify-center rounded-lg bg-indigo-600 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-indigo-900/30 transition-all hover:bg-indigo-500 hover:shadow-indigo-900/50 sm:w-auto"
          >
            Join the waitlist
          </a>
          <DemoButton />
          <a
            href="#waitlist"
            className="text-sm text-zinc-500 underline-offset-4 transition-colors hover:text-zinc-300 hover:underline"
          >
            Request early access →
          </a>
        </div>
      </div>

      {/* UI Mockup */}
      <div className="mx-auto mt-16 w-full max-w-5xl px-0 sm:px-4">
        <div className="relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/60 shadow-2xl shadow-black/60 backdrop-blur-sm">
          {/* Window chrome */}
          <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900/80 px-4 py-3">
            <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
            <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
            <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
            <div className="ml-3 flex-1 overflow-hidden rounded-md border border-zinc-700/50 bg-zinc-800/50 px-3 py-1 text-center text-xs text-zinc-500">
              admin.yoursite.com/payload-ai
            </div>
          </div>

          <div className="flex min-h-[360px] sm:min-h-[440px]">
            {/* Left: CMS panel */}
            <div className="hidden w-56 shrink-0 border-r border-zinc-800 bg-zinc-900/40 p-4 sm:block">
              <div className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">Collections</div>
              {['Posts', 'Pages', 'Media', 'Products', 'Authors'].map((item, i) => (
                <div
                  key={item}
                  className={`mb-1 flex items-center gap-2 rounded-md px-2.5 py-2 text-xs ${i === 0 ? 'bg-indigo-600/20 text-indigo-300' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                  <div className={`h-1.5 w-1.5 rounded-full ${i === 0 ? 'bg-indigo-400' : 'bg-zinc-700'}`} />
                  {item}
                </div>
              ))}

              <div className="mt-6 mb-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">Globals</div>
              {['Settings', 'Navigation'].map((item) => (
                <div key={item} className="mb-1 flex items-center gap-2 rounded-md px-2.5 py-2 text-xs text-zinc-500">
                  <div className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
                  {item}
                </div>
              ))}

              <div className="mt-6 flex items-center gap-2 rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-2.5">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400 shrink-0" aria-hidden="true">
                  <path d="M12 2a7 7 0 0 1 7 7c0 3-1.5 5-3 6.5V18a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2.5C6.5 14 5 12 5 9a7 7 0 0 1 7-7z"/>
                  <path d="M9 22h6"/>
                </svg>
                <span className="text-[11px] font-medium text-indigo-300">AI Assistant</span>
              </div>
            </div>

            {/* Right: Chat + suggestions */}
            <div className="flex flex-1 flex-col">
              {/* Chat messages */}
              <div className="flex-1 space-y-4 overflow-hidden p-4 sm:p-6">
                {/* AI message */}
                <div className="flex items-start gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-600/20 border border-indigo-500/30">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400" aria-hidden="true">
                      <path d="M12 2a7 7 0 0 1 7 7c0 3-1.5 5-3 6.5V18a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2.5C6.5 14 5 12 5 9a7 7 0 0 1 7-7z"/>
                    </svg>
                  </div>
                  <div className="rounded-xl rounded-tl-sm bg-zinc-800/60 border border-zinc-700/50 px-4 py-3 text-xs sm:text-sm text-zinc-300 max-w-sm">
                    Hi! I have access to your Payload collections. What would you like to do?
                  </div>
                </div>

                {/* User message */}
                <div className="flex items-start justify-end gap-3">
                  <div className="rounded-xl rounded-tr-sm bg-indigo-600/20 border border-indigo-500/30 px-4 py-3 text-xs sm:text-sm text-zinc-200 max-w-xs">
                    Find all published posts about React from the last 30 days
                  </div>
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-800 border border-zinc-700 text-[10px] text-zinc-400 font-medium">
                    Y
                  </div>
                </div>

                {/* AI response with content suggestions */}
                <div className="flex items-start gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-600/20 border border-indigo-500/30">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400" aria-hidden="true">
                      <path d="M12 2a7 7 0 0 1 7 7c0 3-1.5 5-3 6.5V18a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2.5C6.5 14 5 12 5 9a7 7 0 0 1 7-7z"/>
                    </svg>
                  </div>
                  <div className="flex-1 max-w-md space-y-2">
                    <div className="rounded-xl rounded-tl-sm bg-zinc-800/60 border border-zinc-700/50 px-4 py-3 text-xs sm:text-sm text-zinc-300">
                      Found <span className="text-indigo-300 font-medium">4 posts</span> matching your query:
                    </div>
                    {[
                      { title: 'React Server Components in 2025', date: '2 days ago', status: 'published' },
                      { title: 'useOptimistic: A Practical Guide', date: '11 days ago', status: 'published' },
                      { title: 'React 19 Migration Checklist', date: '18 days ago', status: 'published' },
                    ].map((post) => (
                      <div key={post.title} className="flex items-center justify-between rounded-lg border border-zinc-700/60 bg-zinc-800/40 px-3 py-2.5 gap-3">
                        <span className="text-xs text-zinc-300 truncate">{post.title}</span>
                        <div className="flex shrink-0 items-center gap-2">
                          <span className="text-[10px] text-zinc-600">{post.date}</span>
                          <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                            {post.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Chat input */}
              <div className="border-t border-zinc-800 p-3 sm:p-4">
                <div className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800/50 px-4 py-2.5">
                  <span className="flex-1 text-xs sm:text-sm text-zinc-600">Ask anything about your content…</span>
                  <button className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white transition-colors hover:bg-indigo-500" aria-label="Send message">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle reflection */}
        <div className="pointer-events-none mt-1 h-24 w-full rounded-b-2xl bg-gradient-to-b from-zinc-900/20 to-transparent opacity-40" />
      </div>
    </section>
  )
}
