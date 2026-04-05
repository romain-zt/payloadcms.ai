export type Spec = {
  id: string
  goal: string
  inputs: string[]
  outputs: string[]
  constraints: string[]
  definitionOfDone: string[]
}

export function createSpec(partial: Omit<Spec, 'id'> & { id?: string }): Spec {
  return {
    id: partial.id ?? `spec-${Date.now()}`,
    goal: partial.goal,
    inputs: partial.inputs,
    outputs: partial.outputs,
    constraints: partial.constraints,
    definitionOfDone: partial.definitionOfDone,
  }
}

export function validateSpec(spec: unknown): spec is Spec {
  if (typeof spec !== 'object' || spec === null) return false
  const s = spec as Record<string, unknown>
  return (
    typeof s.id === 'string' &&
    typeof s.goal === 'string' &&
    Array.isArray(s.inputs) &&
    Array.isArray(s.outputs) &&
    Array.isArray(s.constraints) &&
    Array.isArray(s.definitionOfDone) &&
    s.definitionOfDone.length > 0
  )
}
