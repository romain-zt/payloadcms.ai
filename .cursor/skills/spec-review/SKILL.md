---
name: spec-review
description: >-
  Review and validate completed specs. Use when the user says /review,
  "check this", "validate", or after a spec is marked done.
  Validates code against definition_of_done.
---

# Review Spec

## Model: composer-2 (fast)
Checklist validation. Escalate to planner (opus) only for architectural issues.

## Steps

1. **Read the spec** and its `definition_of_done`
2. **Read the outputs** — the implemented files
3. **Check each DoD criterion**:
   - Does the code satisfy it?
   - Run `tsc --noEmit` if TypeScript
   - Check lint errors via ReadLints
4. **Check safety** (if applicable):
   - No direct DB from LLM
   - No unsanitized outputs
   - No secrets in code
5. **Verdict**: `passed` or `failed`

## On Pass

1. Confirm spec `status: done`
2. Check: all children of parent done? → mark parent `done`
3. Check: any blocked specs now unblocked? → mark `ready`
4. Update `packages/specs/SPEC-DAG.md`

## On Fail

1. Set spec `status: failed`
2. Add `failure_reason` with specific issues
3. Recommend: retry (minor fix), split (scope issue), or escalate (architecture)

## Escalation

If the failure is architectural (wrong patterns, hexagonal violation, wrong deps):
→ Escalate to Planner Agent (opus) for re-planning.
Never throw more executor runs at a structural problem.
