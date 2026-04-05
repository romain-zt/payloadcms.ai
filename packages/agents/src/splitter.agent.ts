import type { Task, TaskStatus } from '@payloadcms-ai/core'

export class SplitterAgent {
  async split(task: Task): Promise<Task[]> {
    const parts = task.definitionOfDone.split(/[,;]/).map((s) => s.trim()).filter(Boolean)

    if (parts.length <= 1) return [task]

    return parts.map((part, index) => ({
      id: `${task.id}-${index}`,
      parent: task.id,
      deps: index > 0 ? [`${task.id}-${index - 1}`] : task.deps,
      status: 0 as TaskStatus,
      definitionOfDone: part,
    }))
  }

  isAtomic(task: Task): boolean {
    const concerns = task.definitionOfDone.split(/[,;]/).filter(Boolean)
    return concerns.length <= 1
  }
}
