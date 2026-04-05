import type { SubscriptionPlan } from '@payloadcms-ai/core'

export const PLANS: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    limits: {
      actionsPerMonth: 50,
      collections: 3,
    },
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 29,
    limits: {
      actionsPerMonth: 1000,
      collections: 25,
    },
  },
  {
    id: 'team',
    name: 'Team',
    price: 79,
    limits: {
      actionsPerMonth: 10000,
      collections: -1,
    },
  },
]

export function getPlanById(id: string): SubscriptionPlan | undefined {
  return PLANS.find((p) => p.id === id)
}
