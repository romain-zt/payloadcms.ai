---
name: spec-create
description: >-
  Create a new spec file in /packages/specs. Use when the user says /spec,
  "create a spec", "new task", or "plan a feature". Produces a YAML spec
  with goal, constraints, inputs, outputs, definition_of_done, deps, and status.
---

# Create Spec

## Steps

1. **Find next ID**: Glob `packages/specs/SPEC-*.yaml`, extract highest number, increment.
2. **Determine deps**: Read `packages/specs/SPEC-DAG.md` to understand current graph. Ask user if unclear.
3. **Set status**: `ready` if deps list is empty or all deps are `done`. Otherwise `pending`.
4. **Write file**: `packages/specs/SPEC-{NNN}-{slug}.yaml`

## Template

```yaml
id: SPEC-{NNN}
goal: {one sentence}
constraints:
  - {constraint}
inputs:
  - {input or dep reference}
outputs:
  - {file or artifact}
definition_of_done:
  - {testable criterion}
status: {ready|pending}
deps: [{SPEC-IDs}]
priority: {critical|high|medium|low}
```

## Validation

Before writing, check:
- [ ] Goal is a single sentence, one concern
- [ ] definition_of_done items are testable (not vague)
- [ ] Deps reference existing spec IDs
- [ ] If >3 definition_of_done items or >1 package → suggest splitting

## After Creation

1. Update `packages/specs/SPEC-DAG.md` — add node + edges
2. Report: spec ID, status, deps, next action
