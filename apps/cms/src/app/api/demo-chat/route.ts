import { streamText, stepCountIs } from 'ai'
import { openai, createOpenAI } from '@ai-sdk/openai'
import { z } from 'zod'
import { DEMO_CONTEXT, DEMO_FIXTURES } from '@/lib/demo-fixtures'
import { NextRequest } from 'next/server'

const RATE_LIMIT_MAP = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_MAX = 10
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000

function getClientIP(req: NextRequest): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = RATE_LIMIT_MAP.get(ip)

  if (!entry || now > entry.resetAt) {
    RATE_LIMIT_MAP.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return true
  }

  if (entry.count >= RATE_LIMIT_MAX) return false
  entry.count++
  return true
}

const demoTools = {
  listContent: {
    description: 'List documents from a collection',
    inputSchema: z.object({
      collection: z.enum(['pages', 'posts', 'team', 'media']).describe('Collection to list'),
      limit: z.number().min(1).max(10).default(5),
    }),
    execute: async ({ collection, limit }: { collection: 'pages' | 'posts' | 'team' | 'media'; limit: number }) => {
      const data = DEMO_FIXTURES[collection as keyof typeof DEMO_FIXTURES] ?? []
      return {
        docs: (data as unknown[]).slice(0, limit),
        totalDocs: (data as unknown[]).length,
        note: 'This is demo data — not a real PayloadCMS instance',
      }
    },
  },
  getStats: {
    description: 'Get document counts per collection',
    inputSchema: z.object({ _unused: z.string().optional() }),
    execute: async () => ({
      pages: DEMO_FIXTURES.pages.length,
      posts: DEMO_FIXTURES.posts.length,
      team: DEMO_FIXTURES.team.length,
      media: 12,
      note: 'Demo data',
    }),
  },
}

export async function POST(req: NextRequest) {
  const ip = getClientIP(req)

  if (!checkRateLimit(ip)) {
    return new Response('Rate limit exceeded. Try again later.', { status: 429 })
  }

  let body: { messages?: unknown }
  try {
    body = await req.json() as { messages?: unknown }
  } catch {
    return new Response('Invalid JSON', { status: 400 })
  }

  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    return new Response('"messages" is required', { status: 400 })
  }

  const messages = body.messages as Array<{ role: 'user' | 'assistant'; content: string }>

  const apiKey = process.env.OPENAI_API_KEY
  const provider = apiKey ? createOpenAI({ apiKey }) : openai

  const result = streamText({
    model: provider('gpt-4o-mini'),
    system: DEMO_CONTEXT,
    messages,
    tools: demoTools,
    stopWhen: stepCountIs(3),
  })

  return result.toTextStreamResponse()
}
