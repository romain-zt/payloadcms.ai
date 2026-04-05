export type TaskStatus = 0 | 1 | 2 | 3

export const TASK_STATUS = {
  PENDING: 0 as const,
  READY: 1 as const,
  DONE: 2 as const,
  FAILED: 3 as const,
}

export type Task = {
  id: string
  parent?: string
  deps: string[]
  status: TaskStatus
  definitionOfDone: string
}
