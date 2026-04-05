'use client'

import { useEffect, useRef, useState } from 'react'

type Message = {
  role: 'user' | 'assistant'
  content: string
  results?: { title: string; status: string; date: string }[]
}

const DEMO_FLOWS: Record<string, Message[]> = {
  'show me all draft posts': [
    {
      role: 'assistant',
      content: 'Found **3 draft posts** in your Posts collection:',
      results: [
        { title: 'Getting Started with Payload v3', status: 'draft', date: '1 hour ago' },
        { title: 'Advanced Hooks Patterns', status: 'draft', date: 'Yesterday' },
        { title: 'Deploying Payload to Railway', status: 'draft', date: '3 days ago' },
      ],
    },
  ],
  'write a meta description for the homepage': [
    {
      role: 'assistant',
      content:
        'Here\'s a meta description based on your homepage content:\n\n**"Build and manage your content with Payload — the TypeScript-first headless CMS built for developers. Open source, self-hosted, and infinitely flexible."**\n\n158 characters. Want me to adjust the tone or length?',
    },
  ],
  'how many posts were published this month': [
    {
      role: 'assistant',
      content:
        'In the current month (April 2025), **12 posts** were published across your collections:\n\n• Posts: 8\n• Pages: 3\n• Case Studies: 1\n\nThat\'s up 33% compared to March.',
    },
  ],
}

const SUGGESTIONS = [
  'Show me all draft posts',
  'Write a meta description for the homepage',
  'How many posts were published this month',
]

type DemoModalProps = {
  open: boolean
  onClose: () => void
}

export function DemoModal({ open, onClose }: DemoModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        'Hi! I\'m connected to a demo Payload instance with Posts, Pages, and Media collections. Try one of the suggestions below or ask anything.',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return
    const userMsg: Message = { role: 'user', content: text }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    await new Promise((r) => setTimeout(r, 800))

    const key = text.toLowerCase().trim()
    const matched = Object.entries(DEMO_FLOWS).find(([k]) => key.includes(k.split(' ').slice(0, 3).join(' ').toLowerCase()))

    const reply: Message = matched
      ? matched[1][0]
      : {
          role: 'assistant',
          content:
            "I can help with that! In the full version I'd query your actual Payload collections. Want to join the waitlist to try it on your own CMS?",
        }

    setMessages((prev) => [...prev, reply])
    setLoading(false)
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Live demo"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative flex w-full flex-col overflow-hidden rounded-t-2xl sm:rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black sm:max-w-xl sm:h-[560px]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3 sm:px-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600/20 border border-indigo-500/30">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400" aria-hidden="true">
                <path d="M12 2a7 7 0 0 1 7 7c0 3-1.5 5-3 6.5V18a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2.5C6.5 14 5 12 5 9a7 7 0 0 1 7-7z"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-100">Payload AI Assistant</p>
              <p className="text-[11px] text-zinc-600">Demo instance · read-only</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-300"
            aria-label="Close demo"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 px-4 py-4 sm:px-5">
          {messages.map((msg, i) => (
            <div key={i} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
              {msg.role === 'assistant' && (
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-600/20 border border-indigo-500/30">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400" aria-hidden="true">
                    <path d="M12 2a7 7 0 0 1 7 7c0 3-1.5 5-3 6.5V18a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2.5C6.5 14 5 12 5 9a7 7 0 0 1 7-7z"/>
                  </svg>
                </div>
              )}
              <div className={`flex flex-col gap-2 max-w-[85%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div
                  className={`rounded-xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'rounded-tr-sm bg-indigo-600/20 border border-indigo-500/30 text-zinc-200'
                      : 'rounded-tl-sm bg-zinc-800/60 border border-zinc-700/50 text-zinc-300'
                  }`}
                >
                  {msg.content.split('\n').map((line, j) => {
                    const bold = line.replace(/\*\*(.+?)\*\*/g, '<strong class="text-zinc-100">$1</strong>')
                    return (
                      <span key={j}>
                        <span dangerouslySetInnerHTML={{ __html: bold }} />
                        {j < msg.content.split('\n').length - 1 && <br />}
                      </span>
                    )
                  })}
                </div>
                {msg.results && (
                  <div className="w-full space-y-1.5">
                    {msg.results.map((r) => (
                      <div
                        key={r.title}
                        className="flex items-center justify-between gap-3 rounded-lg border border-zinc-700/60 bg-zinc-800/40 px-3 py-2"
                      >
                        <span className="text-xs text-zinc-300 truncate">{r.title}</span>
                        <div className="flex shrink-0 items-center gap-2">
                          <span className="text-[10px] text-zinc-600">{r.date}</span>
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${r.status === 'draft' ? 'bg-amber-500/15 text-amber-400' : 'bg-emerald-500/15 text-emerald-400'}`}>
                            {r.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {msg.role === 'user' && (
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-800 border border-zinc-700 text-[10px] font-medium text-zinc-400">
                  Y
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-600/20 border border-indigo-500/30">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400" aria-hidden="true">
                  <path d="M12 2a7 7 0 0 1 7 7c0 3-1.5 5-3 6.5V18a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2.5C6.5 14 5 12 5 9a7 7 0 0 1 7-7z"/>
                </svg>
              </div>
              <div className="rounded-xl rounded-tl-sm bg-zinc-800/60 border border-zinc-700/50 px-4 py-3">
                <div className="flex gap-1 items-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-zinc-500 animate-bounce [animation-delay:-0.3s]" />
                  <div className="h-1.5 w-1.5 rounded-full bg-zinc-500 animate-bounce [animation-delay:-0.15s]" />
                  <div className="h-1.5 w-1.5 rounded-full bg-zinc-500 animate-bounce" />
                </div>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Suggestions */}
        {messages.length <= 2 && (
          <div className="px-4 pb-2 sm:px-5">
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="rounded-full border border-zinc-700/60 bg-zinc-800/40 px-3 py-1.5 text-xs text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-200"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="border-t border-zinc-800 p-3 sm:p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              sendMessage(input)
            }}
            className="flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about your content…"
              className="flex-1 rounded-xl border border-zinc-700 bg-zinc-800/50 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white transition-colors hover:bg-indigo-500 disabled:opacity-40"
              aria-label="Send"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
