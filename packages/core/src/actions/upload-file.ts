import type { Intent } from '../types/intent'

export type UploadFileInput = {
  collection: string
  file: {
    name: string
    mimeType: string
    size: number
    url?: string
  }
  data?: Record<string, unknown>
}

export function validateUploadFile(input: unknown): input is UploadFileInput {
  if (typeof input !== 'object' || input === null) return false
  const obj = input as Record<string, unknown>
  if (typeof obj.collection !== 'string') return false
  if (typeof obj.file !== 'object' || obj.file === null) return false
  const file = obj.file as Record<string, unknown>
  return typeof file.name === 'string' && typeof file.mimeType === 'string' && typeof file.size === 'number'
}

export function uploadFileIntent(input: UploadFileInput): Intent {
  return {
    action: 'upload-file',
    payload: input as unknown as Record<string, unknown>,
  }
}
