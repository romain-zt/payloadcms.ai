import type Stripe from 'stripe'

export type WebhookHandlerCallbacks = {
  onCheckoutCompleted?: (session: Stripe.Checkout.Session) => Promise<void>
  onPaymentSucceeded?: (intent: Stripe.PaymentIntent) => Promise<void>
  onPaymentFailed?: (intent: Stripe.PaymentIntent) => Promise<void>
}

export class WebhookHandler {
  constructor(private callbacks: WebhookHandlerCallbacks) {}

  async handle(event: Stripe.Event): Promise<void> {
    switch (event.type) {
      case 'checkout.session.completed':
        await this.callbacks.onCheckoutCompleted?.(event.data.object as Stripe.Checkout.Session)
        break
      case 'payment_intent.succeeded':
        await this.callbacks.onPaymentSucceeded?.(event.data.object as Stripe.PaymentIntent)
        break
      case 'payment_intent.payment_failed':
        await this.callbacks.onPaymentFailed?.(event.data.object as Stripe.PaymentIntent)
        break
    }
  }
}
