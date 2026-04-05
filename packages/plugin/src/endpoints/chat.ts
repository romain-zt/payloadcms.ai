import { streamText, stepCountIs } from 'ai'
import { openai, createOpenAI } from '@ai-sdk/openai'
import type { Endpoint, PayloadHandler } from 'payload'
import { buildCMSTools } from '../tools/cms-tools'
import type { AIAssistantOptions } from '../types'

const DEFAULT_SYSTEM_PROMPT = `You are an AI assistant embedded in the PayloadCMS admin panel.

## What you can do
- Answer questions about the admin panel
- List, read, create, and update content in collections
- Read and update global settings

## Guidelines
- Be concise and direct
- Use markdown links to admin sections: [text](/admin/path)
- After creating/updating content, provide a link to the document
- Always confirm before making changes if the action seems destructive`

function isEnabled(options: AIAssistantOptions): boolean {
  if (options.enabled === false) return false
  if (process.env.AI_ENABLED === 'false') return false
  return true
}

export function createChatHeadEndpoint(options: AIAssistantOptions = {}): Endpoint {
  const handler: PayloadHandler = async (_req) => {
    if (!isEnabled(options)) {
      return new Response(null, { status: 403 })
    }
    return new Response(null, { status: 200 })
  }

  return {
    path: '/ai/chat',
    method: 'get',
    handler,
  }
}

export function createChatPostEndpoint(options: AIAssistantOptions = {}): Endpoint {
  const handler: PayloadHandler = async (req) => {
    if (!isEnabled(options)) {
      return new Response('AI assistant is disabled', { status: 403 })
    }

    if (!req.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    let body: { messages?: unknown }
    try {
      const webReq = req as unknown as Request
      body = (await webReq.json()) as { messages?: unknown }
    } catch {
      return new Response('Invalid JSON body', { status: 400 })
    }

    if (!Array.isArray(body.messages) || body.messages.length === 0) {
      return new Response('"messages" array is required', { status: 400 })
    }

    const messages = body.messages as Array<{ role: string; content: string }>

    const apiKey = options.openaiApiKey ?? process.env.OPENAI_API_KEY
    const provider = apiKey ? createOpenAI({ apiKey }) : openai
    const model = options.model ?? process.env.AI_MODEL ?? 'gpt-4o'
    const systemPrompt = options.systemPrompt ?? DEFAULT_SYSTEM_PROMPT

    const tools = buildCMSTools(
      req.payload as Parameters<typeof buildCMSTools>[0],
      {
        readableCollections: options.collections,
        writableCollections: options.collections,
        readableGlobals: options.globals,
        writableGlobals: options.globals,
      },
    )

    type Message = { role: 'user' | 'assistant' | 'system'; content: string }
    const typedMessages = messages as Message[]

    const result = streamText({
      model: provider(model),
      system: systemPrompt,
      messages: typedMessages,
      tools,
      stopWhen: stepCountIs(5),
    })

    return result.toTextStreamResponse()
  }

  return {
    path: '/ai/chat',
    method: 'post',
    handler,
  }
}
