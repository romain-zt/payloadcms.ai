'use client'

import { useState } from 'react'

export function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 900))
    setStatus('success')
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-3 py-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400" aria-hidden="true">
            <path d="M20 6 9 17l-5-5"/>
          </svg>
        </div>
        <p className="text-base font-semibold text-zinc-100">You&apos;re on the list.</p>
        <p className="text-sm text-zinc-500 text-center max-w-xs">
          We&apos;ll reach out when your spot is ready. Expect something real.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-3">
      <div>
        <label htmlFor="waitlist-email" className="mb-1.5 block text-xs font-medium text-zinc-400">
          Work email
        </label>
        <input
          id="waitlist-email"
          type="email"
          required
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
        />
      </div>

      <div>
        <label htmlFor="waitlist-company" className="mb-1.5 block text-xs font-medium text-zinc-400">
          Company{' '}
          <span className="text-zinc-600 font-normal">(optional)</span>
        </label>
        <input
          id="waitlist-company"
          type="text"
          placeholder="Acme Inc."
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="block w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading' || !email}
        className="flex w-full min-h-[48px] items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-indigo-900/30 transition-all hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === 'loading' ? (
          <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" aria-label="Loading">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
        ) : (
          'Get early access'
        )}
      </button>

      <p className="text-center text-[11px] text-zinc-600">
        No spam. No commitments. We&apos;ll only contact you when your spot opens.
      </p>
    </form>
  )
}
