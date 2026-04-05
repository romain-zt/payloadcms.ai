const STEPS = [
  {
    step: '01',
    title: 'Connect',
    description: 'Link your Payload CMS project. Takes 2 minutes.',
  },
  {
    step: '02',
    title: 'Describe',
    description: 'Tell your developer what you need. Plain language.',
  },
  {
    step: '03',
    title: 'Done',
    description: 'Content is created, validated, and published.',
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 sm:py-32 border-t border-zinc-800/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            How it works
          </h2>
        </div>

        <div className="mt-12 sm:mt-16 grid gap-8 sm:grid-cols-3">
          {STEPS.map((item) => (
            <div key={item.step} className="text-center sm:text-left">
              <div className="text-3xl sm:text-4xl font-bold text-indigo-400/30">
                {item.step}
              </div>
              <h3 className="mt-3 text-lg font-semibold sm:text-xl">{item.title}</h3>
              <p className="mt-2 text-sm text-zinc-400">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
