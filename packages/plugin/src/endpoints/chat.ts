import { streamText, stepCountIs } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'
import type { Endpoint, PayloadHandler } from 'payload'
import { buildCMSTools } from '../tools/cms-tools'
import type { AIAssistantOptions } from '../types'
import type { PageContext } from '../components/types'

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

const CONTEXT_DATA_LIMIT = 4000

function buildContextBlock(ctx: PageContext): string {
  const lines: string[] = ['## Current context']

  if (ctx.collection) {
    lines.push(`- Collection: ${ctx.collection}`)
    if (ctx.documentId) lines.push(`- Document ID: ${ctx.documentId}`)
  } else if (ctx.global) {
    lines.push(`- Global: ${ctx.global}`)
  }

  if (ctx.documentData !== undefined) {
    let json = JSON.stringify(ctx.documentData, null, 2)
    if (json.length > CONTEXT_DATA_LIMIT) {
      json = json.slice(0, CONTEXT_DATA_LIMIT) + '\n... [truncated]'
    }
    lines.push('- Current data:')
    lines.push(json)
  }

  return lines.join('\n')
}

/** Runtime env read — avoids Next/webpack inlining `process.env.OPENAI_API_KEY` at build time. */
function getOpenAiApiKey(options: AIAssistantOptions): string | undefined {
  const fromOptions = options.openaiApiKey?.trim()
  if (fromOptions) return fromOptions
  const fromEnv = process.env['OPENAI_API_KEY']?.trim()
  return fromEnv || undefined
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
    method: 'head',
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

    let body: { messages?: unknown; context?: unknown }
    try {
      const webReq = req as unknown as Request
      body = (await webReq.json()) as { messages?: unknown; context?: unknown }
    } catch {
      return new Response('Invalid JSON body', { status: 400 })
    }

    if (!Array.isArray(body.messages) || body.messages.length === 0) {
      return new Response('"messages" array is required', { status: 400 })
    }

    const messages = body.messages as Array<{ role: string; content: string }>
    const pageContext =
      body.context !== null &&
      typeof body.context === 'object' &&
      !Array.isArray(body.context)
        ? (body.context as PageContext)
        : undefined

    const apiKey = getOpenAiApiKey(options)
    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error:
            'OPENAI_API_KEY is missing. Set it in apps/cms/.env (or pass openaiApiKey in the plugin config).',
        }),
        { status: 503, headers: { 'Content-Type': 'application/json' } },
      )
    }

    const provider = createOpenAI({ apiKey })
    const model = options.model ?? process.env['AI_MODEL'] ?? 'gpt-4o'
    const basePrompt = options.systemPrompt ?? DEFAULT_SYSTEM_PROMPT
    const systemPrompt = pageContext
      ? `${basePrompt}\n\n${buildContextBlock(pageContext)}`
      : basePrompt

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
