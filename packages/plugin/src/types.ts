export interface AIAssistantOptions {
  /** OpenAI model to use. Defaults to 'gpt-4o' */
  model?: string
  /** OpenAI API key. Falls back to OPENAI_API_KEY env var */
  openaiApiKey?: string
  /** Whether the plugin is active. Defaults to true (respects AI_ENABLED env var) */
  enabled?: boolean
  /** Additional collection slugs that should be readable by the AI */
  collections?: string[]
  /** Additional global slugs that should be readable by the AI */
  globals?: string[]
  /** Override the system prompt */
  systemPrompt?: string
}
