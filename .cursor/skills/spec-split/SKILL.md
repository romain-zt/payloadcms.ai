---
name: spec-split
description: >-
  Split a spec into smaller atomic specs. Use when the user says /split,
  "break this down", "too big", or when a spec has multiple concerns.
  Decomposes one spec into children with deps.
---

# Split Spec

## Model: composer-2 (fast)
Splitting is mechanical pattern-matching. No deep reasoning needed.

## Steps

1. **Read the spec** from `packages/specs/SPEC-{ID}-*.yaml`
2. **Check splitting signals**:
   - Goal contains "and" joining different concerns → split by concern
   - definition_of_done has >3 items → split by deliverable
   - Touches >1 package → split by package
   - Estimated >100 LOC → split by layer (API/UI/DB)
3. **Create children**: `SPEC-{ID}a`, `SPEC-{ID}b`, etc.
4. **Set deps between children** — minimize, maximize parallelism
5. **Update parent**: `status: split`, add `children: [...]`
6. **Update DAG**: `packages/specs/SPEC-DAG.md`

## Child Spec Rules

- Each child: ONE concern, ONE package, completable in one pass
- Each child inherits parent `constraints`
- Each child has its own `definition_of_done` (single testable criterion preferred)
- Add `parent: SPEC-{ID}` field to each child

## Recursion

If a child still triggers splitting signals → split again.
Max depth: 4 levels. If still too large at depth 4 → flag for human review.

## Output

Report: parent ID, number of children, which are `ready`, parallelism window.
