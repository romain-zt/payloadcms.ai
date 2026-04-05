import { createOpenAI } from '@ai-sdk/openai'
import { createAnthropic } from '@ai-sdk/anthropic'
import type { LanguageModel } from 'ai'

export function getModel(modelName?: string): LanguageModel {
  const name = modelName || process.env.AI_MODEL || 'gpt-4o'

  if (name.startsWith('claude')) {
    const anthropic = createAnthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    })
    return anthropic(name)
  }

  const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })
  return openai(name)
}
