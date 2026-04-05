const BENEFITS = [
  {
    icon: '📄',
    title: 'Create pages & posts',
    description: 'Describe what you need. Your developer builds it in seconds.',
  },
  {
    icon: '✏️',
    title: 'Update existing content',
    description: "Point at what's wrong. It's fixed before you finish your coffee.",
  },
  {
    icon: '📁',
    title: 'Upload & organize media',
    description: "Drop your files. They're optimized, named, and in the right place.",
  },
  {
    icon: '🔍',
    title: 'Query & find anything',
    description: 'Ask for what you need. No filters, no search syntax.',
  },
]

export function Benefits() {
  return (
    <section className="py-20 sm:py-32 border-t border-zinc-800/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            Everything a developer does. Without the wait.
          </h2>
        </div>

        <div className="mt-12 sm:mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6"
            >
              <div className="text-2xl" aria-hidden="true">{item.icon}</div>
              <h3 className="mt-3 text-base font-semibold sm:text-lg">{item.title}</h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
