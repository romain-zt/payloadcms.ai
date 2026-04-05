import { Injectable } from '@nestjs/common'
import type { Intent } from '@payloadcms-ai/core'
import { isValidAction } from '../domain/intent-resolver'

export type ParseResult =
  | { success: true; intent: Intent }
  | { success: false; error: string }

@Injectable()
export class IntentParserService {
  async parse(message: string): Promise<ParseResult> {
    if (!message || message.trim().length === 0) {
      return { success: false, error: 'Empty message' }
    }

    const intent = this.extractIntent(message)

    if (!intent) {
      return { success: false, error: `Could not parse intent from message: "${message}"` }
    }

    if (!isValidAction(intent.action)) {
      return { success: false, error: `Unknown action: ${intent.action}` }
    }

    const validation = this.validatePayload(intent)
    if (!validation.valid) {
      return { success: false, error: validation.error }
    }

    return { success: true, intent }
  }

  private extractIntent(message: string): Intent | null {
    const lower = message.toLowerCase()

    if (lower.includes('create') || lower.includes('new') || lower.includes('write')) {
      const collection = this.extractCollection(message) ?? 'posts'
      return {
        action: 'create-entry',
        payload: { collection, data: { title: message, status: 'draft' } },
      }
    }

    if (lower.includes('update') || lower.includes('edit') || lower.includes('change')) {
      const collection = this.extractCollection(message) ?? 'posts'
      return {
        action: 'update-entry',
        payload: { collection, id: 'latest', data: { title: message } },
      }
    }

    if (lower.includes('upload') || lower.includes('image') || lower.includes('file')) {
      return {
        action: 'upload-file',
        payload: { collection: 'media', file: message },
      }
    }

    if (lower.includes('find') || lower.includes('search') || lower.includes('list') || lower.includes('show')) {
      const collection = this.extractCollection(message) ?? 'posts'
      return {
        action: 'find-entries',
        payload: { collection, limit: 10 },
      }
    }

    return null
  }

  private extractCollection(message: string): string | null {
    const collections = ['posts', 'pages', 'media', 'users', 'categories']
    const lower = message.toLowerCase()
    return collections.find((c) => lower.includes(c)) ?? null
  }

  private validatePayload(intent: Intent): { valid: boolean; error: string } {
    if (!intent.payload || typeof intent.payload !== 'object') {
      return { valid: false, error: 'Missing payload' }
    }

    switch (intent.action) {
      case 'create-entry':
      case 'update-entry':
        if (!intent.payload.collection) {
          return { valid: false, error: 'Missing collection in payload' }
        }
        break
      case 'find-entries':
        if (!intent.payload.collection) {
          return { valid: false, error: 'Missing collection in payload' }
        }
        break
    }

    return { valid: true, error: '' }
  }
}
