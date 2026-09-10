---
name: bug-fixes
description: Guides bug fixes through a reproduce–fix–reproduce-again loop, with regression tests and evidence of corrected behavior. Use when investigating or fixing bugs, regressions, unexpected behavior, or failing tests.
---

# Bug Fixes

## Reproduce → Fix → Reproduce Again

1. **Reproduce.** Establish expected versus actual behavior. Read relevant code
   and project test instructions, then run the smallest reliable reproduction
   before changing production code. Prefer a regression test; a focused script
   or manual procedure is also useful. Confirm it fails for the reported reason,
   not because of a broken environment or test setup.
2. **Fix.** Use the failure to investigate the root cause. Make the smallest
   coherent change that corrects the behavior, following existing patterns.
   Avoid unrelated cleanup, symptom-masking workarounds, and weakening tests
   merely to make them pass.
3. **Reproduce again.** Rerun the same test or procedure after the fix and verify
   the expected behavior now occurs. Keep an automated regression test when
   practical, then run relevant existing tests and check nearby edge cases.
   If you edit further, rerun the affected checks on the final version.

## Evidence and Limits

- If reproduction is blocked or intermittent, state the limitation. Gather
  logs, inputs, and environment details rather than treating a guess—or one
  passing run—as proof of a fix.
- When an attempt fails, use the new evidence to revise the hypothesis before
  trying again. If progress stalls, report the blocker and what is needed next.
- Finish with a brief account of the cause, change, and verification: what
  failed before, what passed afterward, and what remains unverified.

## Example

A parser drops the final record when input has no trailing newline: add a test
for that input, observe the missing record, fix end-of-input handling, rerun the
same test, then check empty input and input with a trailing newline.
