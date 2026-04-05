import type { Config } from 'payload'
import { aiConversationsCollection } from './collections/ai-conversations'
import { createChatHeadEndpoint, createChatPostEndpoint } from './endpoints/chat'
import type { AIAssistantOptions } from './types'

export function createAIAssistantPlugin(options: AIAssistantOptions = {}) {
  return (incomingConfig: Config): Config => {
    const isEnabled = options.enabled !== false && process.env.AI_ENABLED !== 'false'

    if (!isEnabled) {
      return incomingConfig
    }

    const headEndpoint = createChatHeadEndpoint(options)
    const postEndpoint = createChatPostEndpoint(options)

    const config: Config = {
      ...incomingConfig,
      collections: [
        ...(incomingConfig.collections ?? []),
        aiConversationsCollection,
      ],
      endpoints: [
        ...(incomingConfig.endpoints ?? []),
        headEndpoint,
        postEndpoint,
      ],
      admin: {
        ...incomingConfig.admin,
        components: {
          ...incomingConfig.admin?.components,
          providers: [
            ...(incomingConfig.admin?.components?.providers ?? []),
            '@payloadcms/ai-assistant/client#AIChatProvider',
          ],
        },
      },
    }

    return config
  }
}
