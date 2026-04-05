const LOGOS = [
  { name: 'Vercel', width: 80 },
  { name: 'Netlify', width: 72 },
  { name: 'Supabase', width: 92 },
  { name: 'Railway', width: 76 },
  { name: 'PlanetScale', width: 98 },
]

const TESTIMONIALS = [
  {
    quote: 'Finally feels like Payload was built for AI from day one.',
    author: 'Alex R.',
    role: 'Lead Engineer, SaaS startup',
    initials: 'AR',
  },
  {
    quote: 'This is what we expected from modern CMS + AI. No friction, no workarounds.',
    author: 'Maya T.',
    role: 'CTO, Digital agency',
    initials: 'MT',
  },
  {
    quote: "Our content team can now query and update without opening a single menu. It's genuinely faster.",
    author: 'Jordan K.',
    role: 'Product Manager, Media co.',
    initials: 'JK',
  },
]

function LogoPlaceholder({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-center px-6 py-3 opacity-40 grayscale transition-all hover:opacity-60">
      <span className="text-sm font-semibold tracking-tight text-zinc-300">{name}</span>
    </div>
  )
}

export function SocialProof() {
  return (
    <section className="border-t border-zinc-800/50 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Logo strip */}
        <p className="mb-8 text-center text-xs font-medium uppercase tracking-widest text-zinc-600">
          Trusted by teams building on Payload
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          {LOGOS.map((logo) => (
            <LogoPlaceholder key={logo.name} name={logo.name} />
          ))}
        </div>

        {/* Testimonials */}
        <div className="mt-16 grid gap-4 sm:grid-cols-3 sm:mt-20">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.author}
              className="flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6"
            >
              {/* Stars */}
              <div className="flex gap-0.5" aria-label="5 stars">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="text-indigo-400" aria-hidden="true">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>

              <blockquote className="flex-1 text-sm text-zinc-300 leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <figcaption className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/20 text-[11px] font-semibold text-indigo-300">
                  {t.initials}
                </div>
                <div>
                  <div className="text-xs font-medium text-zinc-200">{t.author}</div>
                  <div className="text-[11px] text-zinc-600">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
