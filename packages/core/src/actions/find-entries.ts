import type { Intent } from '../types/intent'

export type FindEntriesInput = {
  collection: string
  where?: Record<string, unknown>
  limit?: number
  page?: number
  sort?: string
}

export function validateFindEntries(input: unknown): input is FindEntriesInput {
  if (typeof input !== 'object' || input === null) return false
  const obj = input as Record<string, unknown>
  return typeof obj.collection === 'string'
}

export function findEntriesIntent(input: FindEntriesInput): Intent {
  return {
    action: 'find-entries',
    payload: input as unknown as Record<string, unknown>,
  }
}
