'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/components/layout/header'

export default function CheckoutPage() {
  const [status, setStatus] = useState<'loading' | 'redirecting' | 'error'>('loading')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function createCheckout() {
      try {
        setStatus('redirecting')
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'}/billing/checkout`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({}),
          }
        )

        const data = await res.json()

        if (data.url) {
          window.location.href = data.url
        } else {
          setStatus('error')
          setError('Could not create checkout session.')
        }
      } catch {
        setStatus('error')
        setError('Connection error. Is the API running?')
      }
    }

    createCheckout()
  }, [])

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center px-4 pt-16">
        {status === 'loading' && (
          <p className="text-zinc-400">Preparing checkout...</p>
        )}
        {status === 'redirecting' && (
          <p className="text-zinc-400">Redirecting to payment...</p>
        )}
        {status === 'error' && (
          <div className="text-center">
            <p className="text-red-400">{error}</p>
            <a href="/" className="mt-4 inline-block text-sm text-indigo-400 hover:text-indigo-300">
              Back to home
            </a>
          </div>
        )}
      </main>
    </>
  )
}
