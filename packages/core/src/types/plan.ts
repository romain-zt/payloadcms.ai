import type { Task } from './task'

export type Plan = {
  id: string
  tasks: Task[]
  cursor: string[]
}
