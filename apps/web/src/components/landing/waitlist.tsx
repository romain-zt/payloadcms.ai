import { WaitlistForm } from '@/components/landing/waitlist-form'

export function Waitlist() {
  return (
    <section id="waitlist" className="border-t border-zinc-800/50 py-20 sm:py-32">
      <div className="relative mx-auto max-w-2xl px-4 sm:px-6">
        {/* Background glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/8 blur-[100px]" />

        <div className="relative text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/8 px-4 py-1.5 text-xs font-medium text-amber-400">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Early access is limited
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-zinc-50 sm:text-3xl md:text-4xl">
            We&apos;re onboarding a small group of Payload teams
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-zinc-500 sm:text-base leading-relaxed">
            Each team gets direct access and a dedicated setup session. We work closely until it&apos;s right.
          </p>
        </div>

        {/* Stats */}
        <div className="relative mt-10 flex items-center justify-center gap-8 sm:gap-12">
          <div className="text-center">
            <div className="text-2xl font-bold text-zinc-100 sm:text-3xl">47</div>
            <div className="mt-0.5 text-xs text-zinc-600">teams on waitlist</div>
          </div>
          <div className="h-8 w-px bg-zinc-800" />
          <div className="text-center">
            <div className="text-2xl font-bold text-zinc-100 sm:text-3xl">3</div>
            <div className="mt-0.5 text-xs text-zinc-600">spots left this week</div>
          </div>
          <div className="h-8 w-px bg-zinc-800" />
          <div className="text-center">
            <div className="text-2xl font-bold text-zinc-100 sm:text-3xl">Free</div>
            <div className="mt-0.5 text-xs text-zinc-600">during beta</div>
          </div>
        </div>

        <div className="relative mt-10 flex justify-center">
          <WaitlistForm />
        </div>
      </div>
    </section>
  )
}
