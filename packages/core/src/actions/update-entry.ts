import type { Intent } from '../types/intent'

export type UpdateEntryInput = {
  collection: string
  id: string
  data: Record<string, unknown>
}

export function validateUpdateEntry(input: unknown): input is UpdateEntryInput {
  if (typeof input !== 'object' || input === null) return false
  const obj = input as Record<string, unknown>
  return (
    typeof obj.collection === 'string' &&
    typeof obj.id === 'string' &&
    typeof obj.data === 'object' &&
    obj.data !== null
  )
}

export function updateEntryIntent(input: UpdateEntryInput): Intent {
  return {
    action: 'update-entry',
    payload: input as unknown as Record<string, unknown>,
  }
}
