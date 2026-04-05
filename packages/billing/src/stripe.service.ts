import Stripe from 'stripe'
import { subscriptionStore } from './subscription.store'
import type { SubscriptionStatus } from './subscription.store'

export class StripeService {
  private stripe: Stripe
  private webhookSecret: string

  constructor(secretKey: string, webhookSecret: string) {
    if (!secretKey) throw new Error('STRIPE_SECRET_KEY is required')
    if (!webhookSecret) throw new Error('STRIPE_WEBHOOK_SECRET is required')
    this.stripe = new Stripe(secretKey, {
      apiVersion: '2026-01-28.clover' as Stripe.StripeConfig['apiVersion'],
    })
    this.webhookSecret = webhookSecret
  }

  async createCheckoutSession(params: {
    customerEmail?: string
    successUrl: string
    cancelUrl: string
    priceId?: string
  }): Promise<Stripe.Checkout.Session> {
    return this.stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: params.priceId
        ? [{ price: params.priceId, quantity: 1 }]
        : [
            {
              price_data: {
                currency: 'usd',
                product_data: {
                  name: 'payloadcms.ai — Pro',
                  description: 'AI assistant for your PayloadCMS admin',
                },
                unit_amount: 4900,
                recurring: { interval: 'month' },
              },
              quantity: 1,
            },
          ],
      customer_email: params.customerEmail,
      success_url: params.successUrl,
      cancel_url: params.cancelUrl,
    })
  }

  async createCustomer(email: string, name?: string): Promise<Stripe.Customer> {
    return this.stripe.customers.create({ email, name })
  }

  async syncSubscription(customerId: string): Promise<SubscriptionStatus> {
    const subscriptions = await this.stripe.subscriptions.list({
      customer: customerId,
      limit: 1,
      status: 'all',
    })

    const sub = subscriptions.data[0]
    if (!sub) {
      subscriptionStore.setStatus(customerId, 'inactive')
      return 'inactive'
    }

    const status: SubscriptionStatus = sub.status === 'active' ? 'active'
      : sub.status === 'past_due' ? 'past_due'
      : 'inactive'

    subscriptionStore.setStatus(customerId, status)
    return status
  }

  isActive(customerId: string): boolean {
    return subscriptionStore.isActive(customerId)
  }

  constructWebhookEvent(body: string | Buffer, signature: string): Stripe.Event {
    return this.stripe.webhooks.constructEvent(body, signature, this.webhookSecret)
  }
}
