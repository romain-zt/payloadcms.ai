'use client'

import { useState, useRef, useCallback } from 'react'

export type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export function useChatStream() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const abortRef = useRef<AbortController | null>(null)

  const send = useCallback(async (text: string) => {
    const userMsg: Message = { id: `u-${Date.now()}`, role: 'user', content: text }
    const assistantMsg: Message = { id: `a-${Date.now()}`, role: 'assistant', content: '' }

    const updated = [...messages, userMsg]
    setMessages([...updated, assistantMsg])
    setIsLoading(true)

    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          messages: updated.map((m) => ({ role: m.role, content: m.content })),
        }),
      })

      if (!res.ok) {
        const errText = await res.text()
        setMessages([...updated, { ...assistantMsg, content: `Error: ${errText || res.statusText}` }])
        setIsLoading(false)
        return
      }

      const reader = res.body?.getReader()
      if (!reader) {
        setMessages([...updated, { ...assistantMsg, content: 'Error: no response stream' }])
        setIsLoading(false)
        return
      }

      const decoder = new TextDecoder()
      let content = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        content += decoder.decode(value, { stream: true })
        setMessages([...updated, { ...assistantMsg, content }])
      }

      setMessages([...updated, { ...assistantMsg, content }])
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        setMessages([
          ...updated,
          { ...assistantMsg, content: `Error: ${(err as Error).message}` },
        ])
      }
    } finally {
      setIsLoading(false)
    }
  }, [messages])

  const clear = useCallback(() => {
    abortRef.current?.abort()
    setMessages([])
    setIsLoading(false)
  }, [])

  return { messages, isLoading, send, clear }
}
