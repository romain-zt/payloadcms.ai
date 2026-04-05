import type { Task, ActionResult } from '@payloadcms-ai/core'
import { TASK_STATUS } from '@payloadcms-ai/core'

export type ExecutionContext = {
  execute: (task: Task) => Promise<ActionResult>
}

export class ExecutorAgent {
  constructor(private context: ExecutionContext) {}

  async execute(task: Task): Promise<Task> {
    if (task.status !== 1) {
      return task
    }

    try {
      const result = await this.context.execute(task)
      return {
        ...task,
        status: result.success ? TASK_STATUS.DONE : TASK_STATUS.FAILED,
      }
    } catch {
      return {
        ...task,
        status: TASK_STATUS.FAILED,
      }
    }
  }
}
