---
name: writing-plans
description: Guides how to write plans, the working documents that define what to do, step by step, to reach a goal. Use when creating, editing, or reviewing an implementation plan, or when turning a discussion or grilling session into a plan.
---

# Writing plans

A plan defines what to do, and in which order, to reach a goal. A spec defines how things should be and why. A plan is used up once the work is done, so anything that should outlast it (rules, decisions and their reasons) goes into a spec, never only into the plan.

## Scope and lifecycle

- One shippable change per plan, such as one pull request. Split larger work into several plans that each leave the system working.
- Self-contained: someone who missed the discussion can carry it out from the plan and the documents it links.
- The plan is the working document. Tick a step off when its check passes. When a step turns out to be wrong, correct the remaining steps before continuing.

## Structure

```md
# <What the plan achieves>

## Goal
One to three sentences: what is true when this plan is done.

## Context
How the affected parts work today, links to the specs involved, how the work is committed, and any rule that applies to every step.

## Steps

### 1. <Imperative title>
Files: <files the step touches>
Depends on: step N      (only if it builds on an earlier step)

- <Decision>
- [ ] Done when: <command and expected result, or observable behavior>

## Out of scope      (only what a reader would otherwise expect here)
## Open questions    (only while any exist)
```

## Steps

- Cut the work into vertical slices: each step works end to end and leaves the system in a working state. Size a step to fit one fresh agent session and to carry its own check.
- Put a refactor that makes the change easier in its own step, before the steps that build on it.
- A mechanical change across the whole codebase (renaming a column, retyping a shared symbol) cannot be a vertical slice. Add the new form beside the old, move the callers over in batches, then delete the old form.
- Fix what the implementer cannot decide alone: files, names, signatures, exact values, test cases. Leave code bodies to them, unless those decisions do not determine the result. A plan longer than the code it describes has written the code.
- Name the cases, rules, and values. "Handle edge cases", "add validation", and "TBD" are not steps. Test cases cover the errors and edge cases the goal implies, not only the happy path, and each names input, action, and expected result.
- Use a name or signature identically in every step. Steps without a `Depends on` line are independent and can run in parallel.
- Add a short `Why:` where the approach is not obvious. Name a rejected alternative only where the implementer might be tempted by it. Mark a choice the user has not confirmed as `Assumption:`.
- Mark a check only the user can do as `Done when (manual)`. The implementer stops there and asks the user.
- Flag a step that cannot simply be undone (data migration, deleting data, calls to external systems), and state what must be true before it runs and how to get back.

## Other content

- Specs: link to the specs involved instead of restating them. When the change alters what a spec defines, updating the spec can be one of the steps.
- Commits: state how the work is committed (per step, at the end, or left to the user), as agreed when the plan was made.
- Unknowns: turn what the implementer can find out into an investigation step that says what to check and what to do for each outcome. Put what only the user can decide under "Open questions" and name the steps it blocks. Never fill a gap with a guess.
- Visuals: use a structure diff, a file or call tree, pseudocode, or a Mermaid diagram where it explains a step or the current state better than prose.
- Before finishing, check that every part of the goal and the linked specs is covered by a step, and that no step goes beyond the goal.
- Style: write for a human reader, concise, precise, and easy to scan. Follow the `plain-language` skill.

## Example

```md
# Add paging to the order list

## Goal
Clients can page through a customer's orders as defined in [order-paging.md](../specs/order-paging.md).

## Context
- `GET /customers/:id/orders` returns all orders in one response. The query is `listOrders(customerId)` in `src/orders/query.ts`, called from `src/orders/routes.ts`.
- Commit after each step once its check passes.

## Steps

### 1. Limit the page size
Files: `src/orders/query.ts`, `src/orders/routes.ts`, and their test files

- `listOrders(customerId, { limit })` returns at most `limit` orders, ordered by (`created_at`, `id`) descending.
- The route reads `limit` from the query string, defaults to 25, and rejects values outside 1 to 100 with status 400.
- Tests: default limit, limit 0 and 101 rejected, ordering.
- [ ] Done when: `npm test orders` passes and `GET /customers/1/orders?limit=2` returns the two newest orders.

### 2. Continue from a cursor
Files: same as step 1
Depends on: step 1

- `listOrders(customerId, { limit, after })` returns `{ items, nextCursor }`, and the route passes both through. `nextCursor` is absent on the last page.
- Assumption: the cursor is the base64 of `created_at|id` of the last order on the page.
- Fetch `limit + 1` rows to detect the last page. Why: it avoids a second count query.
- Tests: second page via `after`, last page without cursor, malformed cursor rejected with status 400.
- [ ] Done when: `npm test orders` passes and following `nextCursor` from the first page returns the next orders without repeats.

### 3. Check a cursor whose order was deleted
Depends on: step 2

- Delete the order a cursor points to, then request the next page with that cursor.
- If the page continues after the deleted position, add the case as a test. If it fails or repeats orders, stop and report.
- [ ] Done when: the outcome is covered by a test or reported.
```
