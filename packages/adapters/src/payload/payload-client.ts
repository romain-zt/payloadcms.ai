import type { Intent, ActionResult } from '@payloadcms-ai/core'

export type PayloadConfig = {
  apiUrl: string
  apiKey?: string
}

export class PayloadClient {
  private config: PayloadConfig

  constructor(config: PayloadConfig) {
    this.config = config
  }

  async execute(intent: Intent): Promise<ActionResult> {
    const handlers: Record<string, (payload: Record<string, unknown>) => Promise<ActionResult>> = {
      'create-entry': (p) => this.createEntry(p),
      'update-entry': (p) => this.updateEntry(p),
      'upload-file': (p) => this.uploadFile(p),
      'find-entries': (p) => this.findEntries(p),
    }

    const handler = handlers[intent.action]
    if (!handler) {
      return { success: false, error: `Unknown action: ${intent.action}` }
    }

    return handler(intent.payload)
  }

  private async createEntry(payload: Record<string, unknown>): Promise<ActionResult> {
    try {
      const response = await fetch(`${this.config.apiUrl}/api/${payload.collection}`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(payload.data),
      })
      const data = await response.json()
      return { success: response.ok, data }
    } catch (error) {
      return { success: false, error: String(error) }
    }
  }

  private async updateEntry(payload: Record<string, unknown>): Promise<ActionResult> {
    try {
      const response = await fetch(`${this.config.apiUrl}/api/${payload.collection}/${payload.id}`, {
        method: 'PATCH',
        headers: this.getHeaders(),
        body: JSON.stringify(payload.data),
      })
      const data = await response.json()
      return { success: response.ok, data }
    } catch (error) {
      return { success: false, error: String(error) }
    }
  }

  private async uploadFile(payload: Record<string, unknown>): Promise<ActionResult> {
    try {
      const response = await fetch(`${this.config.apiUrl}/api/${payload.collection}`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(payload),
      })
      const data = await response.json()
      return { success: response.ok, data }
    } catch (error) {
      return { success: false, error: String(error) }
    }
  }

  private async findEntries(payload: Record<string, unknown>): Promise<ActionResult> {
    try {
      const params = new URLSearchParams()
      if (payload.limit) params.set('limit', String(payload.limit))
      if (payload.page) params.set('page', String(payload.page))
      if (payload.sort) params.set('sort', String(payload.sort))
      if (payload.where) params.set('where', JSON.stringify(payload.where))

      const response = await fetch(
        `${this.config.apiUrl}/api/${payload.collection}?${params.toString()}`,
        { headers: this.getHeaders() }
      )
      const data = await response.json()
      return { success: response.ok, data }
    } catch (error) {
      return { success: false, error: String(error) }
    }
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' }
    if (this.config.apiKey) {
      headers['Authorization'] = `Bearer ${this.config.apiKey}`
    }
    return headers
  }
}
