'use client'

import { useEffect, useRef } from 'react'
import { renderMarkdown } from './markdown'

export type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export function MessageList({ messages, isLoading }: { messages: Message[]; isLoading: boolean }) {
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-3xl space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-4xl sm:text-5xl font-bold tracking-tight">
              payload<span className="text-indigo-400">.ai</span>
            </div>
            <p className="mt-3 text-sm text-zinc-500 sm:text-base">
              Tell your developer what you need. It handles the CMS.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {[
                'Create a new blog post',
                'List all pages',
                'Update the homepage title',
                'Upload an image',
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  className="rounded-lg border border-zinc-700 bg-zinc-900/50 px-3 py-2 text-xs text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-300"
                  type="button"
                  data-suggestion={suggestion}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div key={message.id} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
            {message.role === 'assistant' && (
              <div className="h-8 w-8 shrink-0 rounded-full bg-emerald-600/20 flex items-center justify-center text-xs text-emerald-400">
                Dev
              </div>
            )}
            <div
              className={`rounded-lg px-4 py-2.5 text-sm max-w-[80%] ${
                message.role === 'user'
                  ? 'bg-indigo-600/20 text-zinc-200'
                  : 'bg-zinc-800/50 text-zinc-300'
              }`}
            >
              {message.role === 'assistant' ? (
                <div className="flex flex-col text-sm leading-relaxed">
                  {message.content ? renderMarkdown(message.content) : null}
                </div>
              ) : (
                <span>{message.content}</span>
              )}
            </div>
            {message.role === 'user' && (
              <div className="h-8 w-8 shrink-0 rounded-full bg-indigo-600/20 flex items-center justify-center text-xs text-indigo-400">
                You
              </div>
            )}
          </div>
        ))}

        {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
          <div className="flex gap-3">
            <div className="h-8 w-8 shrink-0 rounded-full bg-emerald-600/20 flex items-center justify-center text-xs text-emerald-400">
              Dev
            </div>
            <div className="rounded-lg bg-zinc-800/50 px-4 py-2.5 text-sm text-zinc-500">
              <span className="inline-flex gap-1">
                <span className="animate-pulse">.</span>
                <span className="animate-pulse" style={{ animationDelay: '0.2s' }}>.</span>
                <span className="animate-pulse" style={{ animationDelay: '0.4s' }}>.</span>
              </span>
            </div>
          </div>
        )}

        <div ref={endRef} />
      </div>
    </div>
  )
}
