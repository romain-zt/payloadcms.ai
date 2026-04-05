import type { Intent } from '../types/intent'

export type CreateEntryInput = {
  collection: string
  data: Record<string, unknown>
}

export function validateCreateEntry(input: unknown): input is CreateEntryInput {
  if (typeof input !== 'object' || input === null) return false
  const obj = input as Record<string, unknown>
  return typeof obj.collection === 'string' && typeof obj.data === 'object' && obj.data !== null
}

export function createEntryIntent(input: CreateEntryInput): Intent {
  return {
    action: 'create-entry',
    payload: input as unknown as Record<string, unknown>,
  }
}
