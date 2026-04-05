import type { Intent } from '@payloadcms-ai/core'

const VALID_ACTIONS = ['create-entry', 'update-entry', 'upload-file', 'find-entries'] as const

export type ValidAction = (typeof VALID_ACTIONS)[number]

export function isValidAction(action: string): action is ValidAction {
  return (VALID_ACTIONS as readonly string[]).includes(action)
}

export function resolveIntent(raw: string): Intent | null {
  try {
    const parsed = JSON.parse(raw)
    if (!parsed.action || !isValidAction(parsed.action)) return null
    if (!parsed.payload || typeof parsed.payload !== 'object') return null
    return { action: parsed.action, payload: parsed.payload }
  } catch {
    return null
  }
}
