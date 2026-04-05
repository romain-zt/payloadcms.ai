export type SubscriptionPlan = {
  id: string
  name: string
  price: number
  limits: Record<string, number>
}

export type UserSubscription = {
  userId: string
  stripeCustomerId: string
  status: 'active' | 'canceled' | 'past_due' | 'trialing'
}
