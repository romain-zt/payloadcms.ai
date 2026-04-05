export type ValidationResult = {
  valid: boolean
  errors: string[]
}

export function validate(
  input: unknown,
  rules: Record<string, (value: unknown) => string | null>
): ValidationResult {
  if (typeof input !== 'object' || input === null) {
    return { valid: false, errors: ['Input must be an object'] }
  }

  const obj = input as Record<string, unknown>
  const errors: string[] = []

  for (const [field, rule] of Object.entries(rules)) {
    const error = rule(obj[field])
    if (error) errors.push(`${field}: ${error}`)
  }

  return { valid: errors.length === 0, errors }
}

export function required(value: unknown): string | null {
  return value === undefined || value === null || value === '' ? 'is required' : null
}

export function isString(value: unknown): string | null {
  return typeof value === 'string' ? null : 'must be a string'
}

export function isNumber(value: unknown): string | null {
  return typeof value === 'number' && !isNaN(value) ? null : 'must be a number'
}
