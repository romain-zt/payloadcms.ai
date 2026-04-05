import type Stripe from 'stripe'
import { subscriptionStore } from './subscription.store'

export type WebhookHandlerCallbacks = {
  onCheckoutCompleted?: (session: Stripe.Checkout.Session) => Promise<void>
  onSubscriptionUpdated?: (subscription: Stripe.Subscription) => Promise<void>
  onPaymentSucceeded?: (intent: Stripe.PaymentIntent) => Promise<void>
  onPaymentFailed?: (intent: Stripe.PaymentIntent) => Promise<void>
}

export class WebhookHandler {
  constructor(private callbacks: WebhookHandlerCallbacks) {}

  async handle(event: Stripe.Event): Promise<void> {
    if (subscriptionStore.hasProcessed(event.id)) {
      return
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        if (session.customer && typeof session.customer === 'string') {
          subscriptionStore.setStatus(session.customer, 'active')
        }
        await this.callbacks.onCheckoutCompleted?.(session)
        break
      }

      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription
        const customerId = typeof sub.customer === 'string' ? sub.customer : sub.customer.id
        const status = sub.status === 'active' ? 'active'
          : sub.status === 'past_due' ? 'past_due'
          : 'inactive'
        subscriptionStore.setStatus(customerId, status)
        await this.callbacks.onSubscriptionUpdated?.(sub)
        break
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription
        const customerId = typeof sub.customer === 'string' ? sub.customer : sub.customer.id
        subscriptionStore.setStatus(customerId, 'inactive')
        await this.callbacks.onSubscriptionUpdated?.(sub)
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        const customerId = typeof invoice.customer === 'string' ? invoice.customer : invoice.customer?.id
        if (customerId) subscriptionStore.setStatus(customerId, 'active')
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        const customerId = typeof invoice.customer === 'string' ? invoice.customer : invoice.customer?.id
        if (customerId) subscriptionStore.setStatus(customerId, 'past_due')
        break
      }

      case 'payment_intent.succeeded':
        await this.callbacks.onPaymentSucceeded?.(event.data.object as Stripe.PaymentIntent)
        break

      case 'payment_intent.payment_failed':
        await this.callbacks.onPaymentFailed?.(event.data.object as Stripe.PaymentIntent)
        break
    }

    subscriptionStore.markProcessed(event.id)
  }
}
