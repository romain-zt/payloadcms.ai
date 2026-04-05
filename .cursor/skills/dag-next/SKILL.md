---
name: dag-next
description: >-
  Auto-determine and execute the best next action. Use when the user says
  /next, "what should I do", "continue", or "keep going".
  Analyzes DAG state and acts.
---

# Next Action

## Model: composer-2 (fast)
Decision tree, not reasoning. Read state → pick action → do it.

## Decision Tree

1. **Glob specs** → parse all statuses
2. **If any `ready` specs exist**:
   - Find all ready specs with no lock conflicts
   - Execute them via `spec-run` skill (parallel if possible)
   - Report what was executed
3. **If any `failed` specs exist**:
   - Read failure_reason
   - If scope issue → run `spec-split` skill
   - If minor bug → fix and retry via `spec-run`
   - Report what was fixed/split
4. **If specs need splitting** (non-atomic pending specs):
   - Pick highest priority
   - Run `spec-split` skill
   - Report new children
5. **If all specs `done`**:
   - Run `spec-review` on any unreviewed
   - If all reviewed → report completion
6. **If everything blocked**:
   - Identify the blocking chain
   - Report the critical path
   - Suggest manual intervention

## Rules

- Always prefer executing over planning
- Always prefer parallel over sequential
- Never block for perfection
- Report what was done + what's next
