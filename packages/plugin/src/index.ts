/** Server-safe entry — safe to import from payload.config.ts (no React hooks). */
export type { AIAssistantOptions } from './types'
export { createAIAssistantPlugin } from './plugin'
export { aiConversationsCollection } from './collections/ai-conversations'
export { buildCMSTools } from './tools'
export type { CMSToolsOptions } from './tools'
