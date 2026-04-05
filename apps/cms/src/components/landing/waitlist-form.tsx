'use client'

import { useState, type FormEvent } from 'react'

export function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setState('loading')
    setError('')

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), source: 'landing' }),
      })

      if (res.ok) {
        setState('success')
        setEmail('')
      } else if (res.status === 409) {
        setError("You're already on the list.")
        setState('error')
      } else {
        setError('Something went wrong. Try again.')
        setState('error')
      }
    } catch {
      setError('Network error. Try again.')
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 px-6 py-4 text-center">
        <p className="font-medium text-green-800">You're on the list.</p>
        <p className="mt-1 text-sm text-green-600">We'll reach out when early access is ready.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        disabled={state === 'loading'}
        className="flex-1 rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-400 disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={state === 'loading' || !email.trim()}
        className="rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-700 disabled:opacity-50"
      >
        {state === 'loading' ? 'Joining…' : 'Join waitlist'}
      </button>
      {state === 'error' && (
        <p className="w-full text-sm text-red-600">{error}</p>
      )}
    </form>
  )
}
