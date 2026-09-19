---
name: code-visual-clarity
description: Use whenever creating or changing JavaScript or TypeScript code. Keeps code easy to scan through clear spacing and statement grouping.
---

# Code Visual Clarity

## Goal

Make code easy to scan, not merely easy to understand one expression at a time. Separate structural units, not every statement. Visually dense code warrants whitespace-only edits even when names, expressions, and behavior are already clear.

Read [EXAMPLES.md](EXAMPLES.md) before editing. Its positive examples define the intended spacing, not optional inspiration.

## Scope and safety

- Establish the requested scope and inspect the worktree before editing. Preserve existing and unrelated changes; do not turn a local polish task into repository-wide cleanup.
- Preserve behavior, evaluation order, side effects, error handling, and public contracts. Do not reorder statements to make grouping easier.
- Follow explicit repository instructions and enforced formatter/linter rules. Existing dense code alone is not a convention that overrides this skill. Report conflicts rather than changing formatting configuration.
- This skill concerns visual structure, not renaming, documentation, or architectural refactoring. Do not add helpers, temporary variables, comments, or section banners merely to create visual breaks.

## Spacing rules

Use exactly one blank line between neighboring visual units. Apply these rules inside callbacks and nested blocks as well as top-level function bodies.

### Guards and control-flow blocks

- Separate each guard clause from preceding and following sibling statements, including a declaration it validates and other guards. Consecutive guards are separate visual units even when they all perform validation.
- Separate complete `if`, loop, `switch`, and `try` statements from neighboring sibling statements. A completed block and the next operation must not run together visually.
- Keep attached syntax together: no blank line between `}` and its `else`, `catch`, `finally`, or the `while` of a `do` statement.
- In TypeScript/JavaScript, use braces and multiline bodies for conditional returns, throws, assignments, and side effects, even for one statement, unless explicit repository rules require otherwise.

### Declarations and multiline units

- Keep a small group of tightly related one-line declarations together, such as range endpoints or summary metrics. Split declarations when they represent different steps, even if each is short.
- Give a multiline declaration or standalone call its own visual block: a blank line before and after it when sibling statements exist. This includes object/array initializers, multiline call arguments, chains, and callbacks.
- Separate local helper definitions from surrounding work. A declaration's multiline shape is itself a spacing boundary; do not require a change of phase as well.
- These rules apply around whole statements, not between every object property, array element, call argument, or chain link. Do not scatter blank lines through a single expression.

### Final returns

- In a short body, keep a final `return` beside one short declaration that directly prepares its value.
- Separate a final `return` after a completed control-flow block, a standalone effect such as saving or notifying, a multiline statement, or a longer preparation phase.
- Keep return-only bodies compact. Do not add blank lines immediately inside opening or closing braces, including around a guard's only statement.
- Keep `return` and its expression together; never introduce a line break that changes JavaScript automatic semicolon insertion behavior.

### Actions and phases

- Keep tightly related short mutations together when they form one small operation, such as setting a status and its timestamp.
- Separate distinct operations: preparation, persistence, notification, cleanup, and result construction. Related business intent does not make an entire sequence one visual unit.
- Do not mechanically separate every assignment, call, or `await`. Short calls that jointly perform one small operation can stay grouped; distinct effects such as saving and notifying should be separated.
- In tests, separate setup, action, and checks when each phase exists. Keep related setup statements together and related checks together; do not add comments only to label the phases.
- In React components, keep related state and derived values together. Separate effects, local event handlers, and returned JSX when they form distinct parts of the component.

## Required workflow

1. Read each in-scope function or block in full. Identify guards, multiline units, action groups, and final returns.
2. Make a dedicated vertical-spacing sweep, even if another readability pass already simplified expressions or branching. Ternary removal and formatter success do not satisfy this step.
3. Apply the rules directly. Do not stop at suggestions, and do not skip spacing-only improvements to minimize the diff. Leave code alone when it already meets the standard; there is no edit quota.
4. Run relevant available formatting and checks without rewriting unrelated files. Reread the final code after formatting, not only the diff hunks.
5. Before declaring completion, check every in-scope body for:
   - Guards separated from declarations, other guards, and the normal path.
   - Multiline statements separated from neighboring statements.
   - Final returns kept with one short preparing declaration, or separated after blocks, effects, multiline statements, and longer preparation.
   - Distinct actions separated, with tightly related short statements still grouped.
   - No gratuitous internal padding or behavior changes.
6. Summarize meaningful spacing improvements and observed check results. If no changes are needed, say so only after the spacing sweep. Report any rule that could not be applied and why.
