import { Injectable } from '@nestjs/common'
import { StripeService, WebhookHandler } from '@payloadcms-ai/billing'

@Injectable()
export class CheckoutService {
  private stripeService: StripeService
  private webhookHandler: WebhookHandler

  constructor() {
    const secretKey = process.env.STRIPE_SECRET_KEY
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

    if (!secretKey) throw new Error('STRIPE_SECRET_KEY environment variable is required')
    if (!webhookSecret) throw new Error('STRIPE_WEBHOOK_SECRET environment variable is required')

    this.stripeService = new StripeService(secretKey, webhookSecret)
    this.webhookHandler = new WebhookHandler({
      onCheckoutCompleted: async (session) => {
        console.log('Checkout completed:', session.id, 'customer:', session.customer)
      },
      onSubscriptionUpdated: async (subscription) => {
        console.log('Subscription updated:', subscription.id, 'status:', subscription.status)
      },
      onPaymentSucceeded: async (intent) => {
        console.log('Payment succeeded:', intent.id)
      },
      onPaymentFailed: async (intent) => {
        console.log('Payment failed:', intent.id)
      },
    })
  }

  async createSession(params: { email?: string }) {
    const session = await this.stripeService.createCheckoutSession({
      customerEmail: params.email,
      successUrl: `${process.env.WEB_URL ?? 'http://localhost:3000'}/app?checkout=success`,
      cancelUrl: `${process.env.WEB_URL ?? 'http://localhost:3000'}/pricing?checkout=canceled`,
    })
    return { url: session.url }
  }

  async handleWebhook(rawBody: Buffer, signature: string): Promise<void> {
    const event = this.stripeService.constructWebhookEvent(rawBody, signature)
    await this.webhookHandler.handle(event)
  }

  isSubscriptionActive(customerId: string): boolean {
    return this.stripeService.isActive(customerId)
  }
}
