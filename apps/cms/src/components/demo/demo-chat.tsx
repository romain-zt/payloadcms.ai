'use client'

import { useState, useRef, useEffect, type FormEvent, type KeyboardEvent } from 'react'

type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
}

const SUGGESTIONS = [
  'List all blog posts',
  'How many team members are there?',
  'Show me all draft pages',
  'Who is the CEO?',
]

const MAX_MESSAGES = 5

export function DemoChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [hitLimit, setHitLimit] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const abortRef = useRef<AbortController | null>(null)
  const userMessageCount = messages.filter((m) => m.role === 'user').length

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages])

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100)
  }, [])

  const sendMessage = async (text: string) => {
    if (userMessageCount >= MAX_MESSAGES) {
      setHitLimit(true)
      return
    }

    const userMsg: Message = { id: crypto.randomUUID(), role: 'user', content: text }
    const assistantMsg: Message = { id: crypto.randomUUID(), role: 'assistant', content: '' }
    const newMessages = [...messages, userMsg]
    setMessages([...newMessages, assistantMsg])
    setIsLoading(true)

    if (userMessageCount + 1 >= MAX_MESSAGES) setHitLimit(true)

    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    try {
      const res = await fetch('/api/demo-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      })

      if (!res.ok) {
        const errText = await res.text()
        setMessages([...newMessages, { ...assistantMsg, content: `Error: ${errText || res.statusText}` }])
        setIsLoading(false)
        return
      }

      const reader = res.body?.getReader()
      if (!reader) {
        setMessages([...newMessages, { ...assistantMsg, content: 'Error: no stream' }])
        setIsLoading(false)
        return
      }

      const decoder = new TextDecoder()
      let content = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        content += decoder.decode(value, { stream: true })
        setMessages([...newMessages, { ...assistantMsg, content }])
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        setMessages([...newMessages, { ...assistantMsg, content: `Error: ${(err as Error).message}` }])
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const text = input.trim()
    if (!text || isLoading) return
    setInput('')
    void sendMessage(text)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="flex flex-col h-[500px] border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">

      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 bg-gray-50">
        <div className="w-2 h-2 rounded-full bg-green-500" />
        <span className="text-sm font-medium text-gray-700">Acme Corp CMS — AI Assistant</span>
        <span className="ml-auto text-xs text-gray-400 bg-amber-50 border border-amber-200 text-amber-700 px-2 py-0.5 rounded font-medium">Demo</span>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center flex-1 text-center gap-4 py-8">
            <p className="text-sm font-medium text-gray-700">Try asking something</p>
            <div className="flex flex-col gap-2 w-full max-w-xs">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => { setInput(''); void sendMessage(s) }}
                  className="text-left text-sm px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-600"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={msg.role === 'user'
              ? 'self-end max-w-[85%] px-4 py-2 rounded-2xl rounded-br-sm bg-gray-100 text-sm text-gray-900'
              : 'self-start max-w-[90%] px-4 py-2 rounded-2xl rounded-bl-sm border border-gray-100 bg-white text-sm text-gray-800 leading-relaxed whitespace-pre-wrap'}
          >
            {msg.role === 'assistant' && !msg.content ? (
              <span className="flex gap-1">
                {[0, 150, 300].map((d) => (
                  <span key={d} className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: `${d}ms` }} />
                ))}
              </span>
            ) : msg.content}
          </div>
        ))}
      </div>

      {/* Limit notice */}
      {hitLimit && (
        <div className="mx-4 mb-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-center">
          <p className="text-sm font-medium text-amber-800">You've reached the demo limit.</p>
          <a href="/#waitlist" className="mt-1 block text-sm text-amber-700 underline underline-offset-2">
            Join the waitlist to get full access →
          </a>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex items-end gap-2 px-4 py-3 border-t border-gray-100 bg-gray-50">
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask something about Acme Corp CMS…"
          rows={1}
          disabled={isLoading || hitLimit}
          className="flex-1 resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400 disabled:opacity-50 max-h-24 bg-white"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading || hitLimit}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-white transition-opacity disabled:opacity-40"
          aria-label="Send"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 2 11 13" /><path d="M22 2 15 22 11 13 2 9z" />
          </svg>
        </button>
      </form>
    </div>
  )
}
