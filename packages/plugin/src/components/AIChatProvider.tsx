'use client'

import React, { useState, useEffect } from 'react'
import { AIChatWidget } from './AIChatWidget'

type AIChatProviderProps = {
  children: React.ReactNode
}

export function AIChatProvider({ children }: AIChatProviderProps) {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        const headRes = await fetch('/api/ai/chat', {
          method: 'HEAD',
          credentials: 'include',
        })
        if (headRes.status === 403) return
        if (!headRes.ok) return
        setEnabled(true)
      } catch { /* disabled */ }
    })()
  }, [])

  return (
    <>
      {children}
      {enabled && <AIChatWidget />}
    </>
  )
}
