export type SubscriptionStatus = 'active' | 'inactive' | 'past_due'

class SubscriptionStore {
  private store = new Map<string, SubscriptionStatus>()
  private processedEvents = new Set<string>()

  setStatus(customerId: string, status: SubscriptionStatus): void {
    this.store.set(customerId, status)
  }

  getStatus(customerId: string): SubscriptionStatus {
    return this.store.get(customerId) ?? 'inactive'
  }

  isActive(customerId: string): boolean {
    return this.getStatus(customerId) === 'active'
  }

  hasProcessed(eventId: string): boolean {
    return this.processedEvents.has(eventId)
  }

  markProcessed(eventId: string): void {
    this.processedEvents.add(eventId)
    // Prune old event IDs to prevent unbounded growth (keep last 10k)
    if (this.processedEvents.size > 10000) {
      const [first] = this.processedEvents
      if (first) this.processedEvents.delete(first)
    }
  }
}

export const subscriptionStore = new SubscriptionStore()
