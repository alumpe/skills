---
name: writing-plans
description: Guides how to write plans, the working documents that define what to do, step by step, to reach a goal. Use when creating, editing, or reviewing an implementation plan, or when turning a discussion or grilling session into a plan.
---

# Writing plans

A plan defines what to do, and in which order, to reach a goal. A spec defines how things should be and why (see [writing-specs](../writing-specs/SKILL.md)). A plan is used up once the work is done, so anything that should outlast it (rules, decisions and their reasons) goes into a spec, never only into the plan.

## Always

- Self-contained: someone who missed the discussion can carry it out from the plan and the documents it links. State the goal and how the affected parts work today, and link the specs involved instead of restating them. When the change alters what a spec defines, updating the spec can be one of the steps.
- Every step leaves the system working and ends with a check: a command and its expected result, or a behavior that can be observed. Mark a check only the user can do as `Done when (manual)`; the implementer stops there and asks the user.
- Decide what the implementer would otherwise have to guess or would likely get wrong, and leave the rest to them. How much detail that takes depends on the risk of the change and on who carries it out. A plan longer than the code it describes has written the code.
- Name the cases, rules, and values. "Handle edge cases", "add validation", and "TBD" are not steps. Use a name or signature identically in every step.
- Never fill a gap with a guess. Turn what the implementer can find out into an investigation step that says what to check and what to do for each outcome. Put what only the user can decide under "Open questions" and name the steps it blocks. Mark a choice the user has not confirmed as `Assumption:`. When too much is undecided to write the plan, run a [grilling](../grilling/SKILL.md) session first.
- The plan is the working document. Tick a step off when its check passes. When a step turns out to be wrong, correct the remaining steps before continuing.
- Write for a human reader: concise, precise, and easy to scan. Follow [plain-language](../plain-language/SKILL.md).
- Before finishing, check that every part of the goal and the linked specs is covered by a step, and that no step goes beyond the goal.

## Default structure

```md
# <What the plan achieves>

## Goal
One to three sentences: what is true when this plan is done.

## Context
How the affected parts work today, links to the specs involved, and anything that applies to every step, such as how the work is committed if that was agreed.

## Steps
### 1. <Imperative title>
- <What to do and what is decided>
- [ ] Done when: <check>

## Out of scope      (only what a reader would otherwise expect here)
## Open questions    (only while any exist)
```

This is a starting point. Add, drop, or rename sections and step lines to fit the work. Steps run in the order written, unless a step is marked as independent of the others. A plan usually covers one shippable change, such as one pull request; split larger work into plans or phases that each leave the system working. Where the repository has its own conventions for plans, they win.

## Use where it fits

- Vertical slices for feature work: each step delivers a small piece end to end, sized to fit one fresh agent session. A refactor that makes the change easier comes first, as its own step.
- Expand and contract for a mechanical change across the whole codebase: add the new form beside the old, move the callers over in batches, then delete the old form.
- Per step, the files it touches, signatures, exact values, and test cases, where the implementer could not get them right alone. Design new module interfaces with [codebase-design](../codebase-design/SKILL.md). Choose test cases with [testing](../testing/SKILL.md), so they cover the errors and edge cases that matter, not only the happy path.
- A short `Why:` where the approach is not obvious. Name a rejected alternative only where the implementer might be tempted by it.
- For a bug fix, steps that follow [bug-fixes](../bug-fixes/SKILL.md): reproduce, fix, reproduce again.
- A flag on a step that cannot simply be undone (data migration, deleting data, calls to external systems), with what must be true before it runs and how to get back.
- A structure diff, a file or call tree, pseudocode, or a Mermaid diagram, in the forms shown in [show-me](../show-me/SKILL.md), where it explains a step or the current state better than prose.

## Examples

Two examples, not templates. A feature plan:

```md
# Add paging to the order list

## Goal
Clients can page through a customer's orders as defined in [order-paging.md](../specs/order-paging.md).

## Context
`GET /customers/:id/orders` returns all orders in one response. The query is `listOrders(customerId)` in `src/orders/query.ts`, called from `src/orders/routes.ts`. Commit after each step.

## Steps
### 1. Limit the page size
- `listOrders(customerId, { limit })` returns at most `limit` orders, ordered by (`created_at`, `id`) descending.
- The route reads `limit` from the query string, defaults to 25, and rejects values outside 1 to 100 with status 400. Tests: default limit, limit 0 and 101.
- [ ] Done when: `npm test orders` passes and `GET /customers/1/orders?limit=2` returns the two newest orders.

### 2. Continue from a cursor
- `listOrders(customerId, { limit, after })` returns `{ items, nextCursor }`, and the route passes both through.
- Assumption: the cursor is the base64 of `created_at|id` of the last order on the page.
- Fetch `limit + 1` rows to detect the last page. Why: it avoids a second count query.
- Tests: second page via `after`, last page without cursor, malformed cursor rejected with status 400.
- [ ] Done when: `npm test orders` passes and following `nextCursor` returns the next orders without repeats.
```

A data fix:

```md
# Delete orders of closed test accounts

## Goal
The production database holds no orders that belong to closed test accounts.

## Context
About 4,000 such orders exist and nothing reads them. A deletion can only be reverted from the nightly backup.

## Steps
### 1. Export the affected orders
- Select the orders whose account has `is_test = true` and `closed_at` set, and export them to a CSV file.
- [ ] Done when (manual): the user has looked at the export and confirmed the selection.

### 2. Delete the orders
- Cannot be undone. Run the deletion only after step 1 is confirmed and last night's backup is verified. Use the same selection, in one transaction.
- [ ] Done when: the selection from step 1 returns no rows.
```
