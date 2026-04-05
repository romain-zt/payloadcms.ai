import Stripe from 'stripe'

export class StripeService {
  private stripe: Stripe

  constructor(secretKey: string) {
    this.stripe = new Stripe(secretKey, {
      apiVersion: '2026-01-28.clover' as Stripe.StripeConfig['apiVersion'],
    })
  }

  async createCheckoutSession(params: {
    customerEmail?: string
    successUrl: string
    cancelUrl: string
  }): Promise<Stripe.Checkout.Session> {
    return this.stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'payloadcms.ai — Pro Access',
              description: 'Your CMS developer, available 24/7.',
            },
            unit_amount: 2900,
          },
          quantity: 1,
        },
      ],
      customer_email: params.customerEmail,
      success_url: params.successUrl,
      cancel_url: params.cancelUrl,
      payment_intent_data: {
        metadata: { product: 'pro-access' },
      },
    })
  }

  async createCustomer(email: string, name?: string): Promise<Stripe.Customer> {
    return this.stripe.customers.create({ email, name })
  }

  constructWebhookEvent(body: string | Buffer, signature: string, secret: string): Stripe.Event {
    return this.stripe.webhooks.constructEvent(body, signature, secret)
  }
}
