import type { Task, Plan } from '@payloadcms-ai/core'
import { TASK_STATUS } from '@payloadcms-ai/core'

export type ReviewResult = {
  taskId: string
  passed: boolean
  reason?: string
}

export class ReviewerAgent {
  async review(task: Task): Promise<ReviewResult> {
    const passed = task.status === TASK_STATUS.DONE

    return {
      taskId: task.id,
      passed,
      reason: passed ? undefined : `Task status is ${task.status}, expected ${TASK_STATUS.DONE}`,
    }
  }

  isPlanComplete(plan: Plan): boolean {
    return plan.tasks.every((t) => t.status === TASK_STATUS.DONE)
  }

  getNextReady(plan: Plan): Task[] {
    return plan.tasks.filter((task) => {
      if (task.status !== 0) return false
      return task.deps.every((depId) => {
        const dep = plan.tasks.find((t) => t.id === depId)
        return dep?.status === TASK_STATUS.DONE
      })
    })
  }
}
