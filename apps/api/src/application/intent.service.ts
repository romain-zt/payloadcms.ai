import { Injectable } from '@nestjs/common'
import type { Intent, ActionResult } from '@payloadcms-ai/core'
import { PayloadClient } from '@payloadcms-ai/adapters'

@Injectable()
export class IntentService {
  private client: PayloadClient

  constructor() {
    this.client = new PayloadClient({
      apiUrl: process.env.PAYLOAD_API_URL ?? 'http://localhost:3000',
      apiKey: process.env.PAYLOAD_API_KEY,
    })
  }

  async process(intent: Intent): Promise<ActionResult> {
    if (!intent.action || !intent.payload) {
      return { success: false, error: 'Invalid intent: missing action or payload' }
    }
    return this.client.execute(intent)
  }
}
