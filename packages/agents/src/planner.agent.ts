import type { Plan, Task, TaskStatus } from '@payloadcms-ai/core'

export type Spec = {
  id: string
  goal: string
  inputs: string[]
  outputs: string[]
  constraints: string[]
  definitionOfDone: string[]
}

export class PlannerAgent {
  async plan(spec: Spec): Promise<Plan> {
    const tasks: Task[] = spec.definitionOfDone.map((dod, index) => ({
      id: `task-${spec.id}-${index}`,
      deps: index > 0 ? [`task-${spec.id}-${index - 1}`] : [],
      status: index === 0 ? (1 as TaskStatus) : (0 as TaskStatus),
      definitionOfDone: dod,
    }))

    return {
      id: `plan-${spec.id}`,
      tasks,
      cursor: tasks.filter((t) => t.status === 1).map((t) => t.id),
    }
  }
}
