---
name: spec-run
description: >-
  Execute ready specs. Use when the user says /run, "execute", "implement",
  "build this", or "start". Finds READY specs and implements them.
  With a spec ID: runs that spec. Without: runs all ready specs.
---

# Run Spec

## Model: composer-2 (fast)
Atomic specs = tight scope. Fast model is sufficient and cost-effective.

## Steps

### With specific ID: `/run SPEC-{ID}`
1. Read `packages/specs/SPEC-{ID}-*.yaml`
2. Verify `status: ready`
3. Verify all deps have `status: done`
4. Execute (see below)

### Without ID: `/run`
1. Glob all `packages/specs/SPEC-*.yaml`
2. Find all with `status: ready`
3. Execute in parallel (no shared files between them)

## Execution

1. Read spec `inputs` — load dep outputs, existing code
2. Read spec `constraints` — apply architecture/frontend/billing rules
3. Implement code targeting spec `outputs`
4. Check each `definition_of_done` criterion
5. If all pass → update spec `status: done`
6. If any fail → update spec `status: failed`, add `failure_reason`

## After Execution

1. Scan all specs: any `pending` spec whose deps are now all `done`? → set `status: ready`
2. Update `packages/specs/SPEC-DAG.md`
3. Report: what was done, what's now ready, what's still blocked

## Failure Handling

- If failure is scope-related → suggest `/split`
- If failure is a bug → fix and retry once
- If repeated failure → mark failed, escalate
