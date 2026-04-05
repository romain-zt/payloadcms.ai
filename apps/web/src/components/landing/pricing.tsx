import Link from 'next/link'

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Try your new developer',
    price: 0,
    period: 'forever',
    features: ['50 content updates/month', '1 project', 'Community support'],
    cta: 'Start free',
    featured: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Your full-time CMS developer',
    price: 29,
    period: '/month',
    features: [
      'Unlimited updates',
      'Unlimited projects',
      'Priority support',
      'Advanced queries',
      'Team access',
    ],
    cta: 'Get Pro',
    featured: true,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-20 sm:py-32 border-t border-zinc-800/50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            Simple, honest pricing
          </h2>
          <p className="mt-4 text-sm text-zinc-400 sm:text-base">
            Cheaper than a freelancer. Faster than your team.
          </p>
        </div>

        <div className="mt-12 sm:mt-16 grid gap-6 sm:grid-cols-2 max-w-2xl mx-auto">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-xl border p-6 sm:p-8 flex flex-col ${
                plan.featured
                  ? 'border-indigo-500/50 bg-indigo-950/20 ring-1 ring-indigo-500/20'
                  : 'border-zinc-800 bg-zinc-900/30'
              }`}
            >
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <p className="mt-1 text-sm text-zinc-400">{plan.description}</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-bold sm:text-4xl">
                  &euro;{plan.price}
                </span>
                <span className="text-sm text-zinc-500">{plan.period}</span>
              </div>
              <ul className="mt-6 flex-1 space-y-3 text-sm text-zinc-400">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="mt-0.5 text-indigo-400">&#10003;</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href={plan.featured ? '/checkout' : '/chat'}
                className={`mt-8 rounded-lg px-4 py-3 text-center text-sm font-medium transition-colors min-h-[44px] flex items-center justify-center ${
                  plan.featured
                    ? 'bg-indigo-600 hover:bg-indigo-500'
                    : 'border border-zinc-700 text-zinc-300 hover:border-zinc-600 hover:text-zinc-100'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
