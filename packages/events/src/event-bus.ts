export type EventHandler<T = unknown> = (payload: T) => void | Promise<void>

export type EventMap = Record<string, unknown>

export class EventBus<E extends EventMap = EventMap> {
  private handlers = new Map<keyof E, Set<EventHandler<any>>>()

  on<K extends keyof E>(event: K, handler: EventHandler<E[K]>): () => void {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, new Set())
    }
    this.handlers.get(event)!.add(handler)

    return () => {
      this.handlers.get(event)?.delete(handler)
    }
  }

  async emit<K extends keyof E>(event: K, payload: E[K]): Promise<void> {
    const handlers = this.handlers.get(event)
    if (!handlers) return

    const promises = Array.from(handlers).map((handler) => handler(payload))
    await Promise.all(promises)
  }

  off<K extends keyof E>(event: K, handler?: EventHandler<E[K]>): void {
    if (handler) {
      this.handlers.get(event)?.delete(handler)
    } else {
      this.handlers.delete(event)
    }
  }

  clear(): void {
    this.handlers.clear()
  }
}
