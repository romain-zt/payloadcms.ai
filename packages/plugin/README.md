# @payloadcms/ai-assistant

AI assistant plugin for [PayloadCMS](https://payloadcms.com). Adds a floating chat widget to your admin panel — ask questions, create content, and manage your CMS by typing.

## Install

```bash
npm install @payloadcms/ai-assistant
# or
pnpm add @payloadcms/ai-assistant
```

## Usage

```ts
// payload.config.ts
import { buildConfig } from 'payload'
import { createAIAssistantPlugin } from '@payloadcms/ai-assistant'

export default buildConfig({
  plugins: [
    createAIAssistantPlugin({
      model: 'gpt-4o',          // optional, default: gpt-4o
      openaiApiKey: 'sk-...',   // optional, falls back to OPENAI_API_KEY env
      collections: ['posts', 'pages', 'media'],
      globals: ['site-config'],
    }),
  ],
  // ... rest of config
})
```

Set environment variables:

```bash
OPENAI_API_KEY=sk-...
AI_ENABLED=true   # set to 'false' to disable the plugin
```

## What it does

- Adds an `ai-conversations` collection to store chat history
- Registers a `/api/ai/chat` endpoint for streaming responses
- Injects the `AIChatProvider` into the admin panel (floating chat FAB)

### Admin import map (Next.js App Router)

Do **not** import `@payloadcms/ai-assistant/client` directly from `importMap.ts` — Next.js will treat the prebuilt bundle as a Server Component. Add a one-line client wrapper in your app:

```tsx
// components/payload-ai/AIChatProvider.tsx
'use client'
export { AIChatProvider } from '@payloadcms/ai-assistant/client'
```

```ts
// app/(payload)/admin/importMap.ts
import { AIChatProvider } from '@/components/payload-ai/AIChatProvider'

export const importMap = {
  '@payloadcms/ai-assistant/client#AIChatProvider': AIChatProvider,
}
```

The main package (`payload.config.ts`) stays server-only — no React hooks there.

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `model` | `string` | `'gpt-4o'` | OpenAI model |
| `openaiApiKey` | `string` | `OPENAI_API_KEY` env | API key |
| `enabled` | `boolean` | `true` | Toggle plugin |
| `collections` | `string[]` | `[]` | Collections the AI can access |
| `globals` | `string[]` | `[]` | Globals the AI can access |
| `systemPrompt` | `string` | built-in | Override system prompt |

## Only PayloadCMS is supported

This plugin works exclusively with PayloadCMS 3.x. Requires Node.js 18+.
