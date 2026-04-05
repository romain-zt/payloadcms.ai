import { Injectable } from '@nestjs/common'
import { StripeService, WebhookHandler } from '@payloadcms-ai/billing'

@Injectable()
export class CheckoutService {
  private stripeService: StripeService
  private webhookHandler: WebhookHandler

  constructor() {
    this.stripeService = new StripeService(process.env.STRIPE_SECRET_KEY ?? '')
    this.webhookHandler = new WebhookHandler({
      onCheckoutCompleted: async (session) => {
        console.log('Checkout completed:', session.id, 'email:', session.customer_email)
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

  async handleWebhook(rawBody: Buffer, signature: string) {
    const event = this.stripeService.constructWebhookEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET ?? ''
    )
    await this.webhookHandler.handle(event)
  }
}
