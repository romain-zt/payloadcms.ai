---
name: dag-status
description: >-
  Show current DAG execution state. Use when the user says /status,
  "what's the progress", "where are we", or "show tasks".
  Reads all specs and outputs a summary.
---

# DAG Status

## Model: composer-2 (fast)
Pure read + format. No reasoning needed.

## Steps

1. Glob all `packages/specs/SPEC-*.yaml` (exclude SPEC-DAG.md)
2. Parse each: extract `id`, `status`, `deps`, `priority`, `parent`
3. Count by status
4. Identify: ready (can start now), blocked (waiting on deps), active

## Output Format

```
PROGRESS:    ████░░░░░░ 4/10

  done:        4
  in_progress: 1
  ready:       2
  pending:     2
  failed:      1

ACTIVE:
  → SPEC-003a: hero section

READY (can start now):
  → SPEC-003b: pricing section
  → SPEC-003c: demo section

BLOCKED:
  → SPEC-003e: page assembly (needs: 003a, 003b, 003c, 003d)
  → SPEC-005: stripe checkout (needs: 002, 004)

FAILED:
  → SPEC-004: nestjs api — "missing dependency"

NEXT PARALLEL WINDOW:
  → 003b + 003c can run simultaneously
```

## After Status

Suggest the best next action:
- If specs are `ready` → suggest `/run`
- If specs are `failed` → suggest `/split` or retry
- If all done → celebrate
