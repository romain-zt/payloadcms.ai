const CONFIG_SNIPPET = `import { buildConfig } from 'payload'
import { createAIAssistantPlugin } from '@payloadcms/ai-assistant'

export default buildConfig({
  plugins: [
    createAIAssistantPlugin({
      model: 'gpt-4o',
      collections: ['posts', 'pages', 'media'],
    }),
  ],
  // ...rest of your config
})`

const STEPS = [
  {
    number: '01',
    title: 'Install the plugin',
    description: 'One command. No config required yet.',
    code: 'pnpm add @payloadcms/ai-assistant',
    language: 'bash',
  },
  {
    number: '02',
    title: 'Update payload.config.ts',
    description: 'Add the plugin and point it at your collections.',
    code: CONFIG_SNIPPET,
    language: 'typescript',
  },
  {
    number: '03',
    title: 'Open your admin panel',
    description: "The AI widget appears in the corner. That's it.",
    code: null,
    language: null,
  },
]

export function HowItWorks() {
  return (
    <section id="install" className="py-20 sm:py-32 border-t border-zinc-800/50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">Setup</p>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            Three steps. Done.
          </h2>
          <p className="mt-4 text-sm text-zinc-400 sm:text-base max-w-xl mx-auto">
            No migration. No new infrastructure. Drops into your existing PayloadCMS project.
          </p>
        </div>

        <div className="mt-12 sm:mt-16 flex flex-col gap-6">
          {STEPS.map((step) => (
            <div key={step.number} className="flex flex-col sm:flex-row gap-5">
              <div className="shrink-0 flex sm:flex-col items-center gap-3 sm:gap-0 sm:w-16">
                <div className="text-3xl sm:text-4xl font-bold text-indigo-400/30 sm:text-center w-10 sm:w-auto">
                  {step.number}
                </div>
                <div className="hidden sm:block w-px flex-1 bg-zinc-800 mt-3 mx-auto" />
              </div>

              <div className="flex-1 pb-2">
                <h3 className="text-base font-semibold sm:text-lg">{step.title}</h3>
                <p className="mt-1 text-sm text-zinc-400">{step.description}</p>

                {step.code && (
                  <div className="mt-4 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/70">
                    <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-2.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                      <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                      <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                      <span className="ml-2 text-xs text-zinc-500 font-mono">
                        {step.language === 'bash' ? 'terminal' : 'payload.config.ts'}
                      </span>
                    </div>
                    <pre className="overflow-x-auto p-4 text-xs sm:text-sm leading-relaxed text-zinc-300 font-mono">
                      <code>{step.code}</code>
                    </pre>
                  </div>
                )}

                {!step.code && (
                  <div className="mt-4 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/70">
                    <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-2.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                      <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                      <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                      <span className="ml-2 text-xs text-zinc-500 font-mono">Payload Admin</span>
                    </div>
                    <div className="relative p-4 min-h-[80px] flex items-center justify-end">
                      <p className="text-xs text-zinc-600 italic mr-24">Your admin panel...</p>
                      <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-600/10 px-3 py-1.5 text-xs text-indigo-400 font-medium shadow-lg shadow-indigo-900/20">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M12 2a7 7 0 0 1 7 7c0 3-1.5 5-3 6.5V18a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2.5C6.5 14 5 12 5 9a7 7 0 0 1 7-7z" />
                          <path d="M9 22h6" />
                        </svg>
                        AI Assistant
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
