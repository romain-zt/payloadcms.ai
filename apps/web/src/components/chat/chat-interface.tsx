'use client'

import { useCallback } from 'react'
import { useChatStream } from '@/lib/ai/use-chat-stream'
import { MessageList } from './message-list'
import { ChatInput } from './chat-input'

export function ChatInterface() {
  const { messages, isLoading, send, clear } = useChatStream()

  const handleSuggestionClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement
    const suggestion = target.closest('[data-suggestion]')?.getAttribute('data-suggestion')
    if (suggestion) send(suggestion)
  }, [send])

  return (
    <div className="flex flex-1 flex-col" onClick={handleSuggestionClick}>
      <div className="flex items-center justify-between px-4 py-2 sm:px-6">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between">
          <span className="text-xs text-zinc-500">
            {messages.length > 0 ? `${messages.length} messages` : ''}
          </span>
          {messages.length > 0 && (
            <button
              onClick={clear}
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
              type="button"
            >
              New chat
            </button>
          )}
        </div>
      </div>
      <MessageList messages={messages} isLoading={isLoading} />
      <ChatInput onSend={send} disabled={isLoading} />
    </div>
  )
}
