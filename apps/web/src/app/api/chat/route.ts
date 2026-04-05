import { streamText, stepCountIs } from 'ai'
import { getModel } from '@/lib/ai/provider'
import { SYSTEM_PROMPT } from '@/lib/ai/system-prompt'
import { cmsTools } from '@/lib/ai/tools'

export async function POST(req: Request) {
  const { messages, model } = await req.json() as {
    messages: Array<{ role: 'user' | 'assistant'; content: string }>
    model?: string
  }

  const result = streamText({
    model: getModel(model),
    system: SYSTEM_PROMPT,
    messages,
    tools: cmsTools,
    stopWhen: stepCountIs(5),
  })

  return result.toTextStreamResponse()
}
