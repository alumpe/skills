---
name: writing-specs
description: Guides how to write specs, the living documents that define how an application or one aspect of it should be and why. Use when creating, editing, or reviewing a spec, or when turning a discussion or grilling session into a spec.
---

# Writing specs

A spec defines how something should be and why: behavior, a workflow, a data contract, or a technical aspect such as architecture or service setup. A plan defines what to do to get there. Steps, order of work, migration, and progress belong in a plan, never in a spec.

## Lifecycle

- One topic per file. Split a spec when its parts change for different reasons.
- Describe the target state, whether or not it is built yet.
- Edit in place and rewrite to the new state, so the spec reads as if it had always been this way. No changelog, dates, status fields, or "previously" wording. Git holds the history.
- Each fact has one home. Link to the spec that owns it instead of repeating it.

## Structure

```md
# <Topic>

One to three sentences: what this topic is and what the spec covers.

## <Topic section>
...

## Out of scope      (only what a reader would otherwise expect here)
## Open questions    (only while any exist)
```

## Content

- Write structured prose: plain sentences, with rules as bullet lists. State rules as present-tense facts ("Sessions end after 30 minutes"). Use "should" only for a recommendation, and name the exception.
- Make every statement checkable. Words such as "fast" or "robust" need a number or a condition.
- Give exact definitions where other parts depend on them: schemas, API shapes, events, config keys. Use tables or short blocks.
- Define what happens when things go wrong, not only the normal case: invalid input, missing data, failures, limits reached.
- State what must never happen and the constraints that apply: who may do something, privacy rules, performance limits, compatibility.
- Leave out internals: file paths, function and class names, implementation code. If a detail could change without anyone needing to agree to it, it does not belong in the spec.
- Add a short `Why:` next to a rule or decision that is not obvious. Mention a rejected alternative only where someone might bring it back.
- Add a concrete example only where a rule can be misread, for instance at boundary values or with ordering.
- Use a Mermaid diagram or a few lines of pseudocode where they explain an interaction, flow, or rule better than prose.
- List undecided points under "Open questions", with your proposed answer where you have one, and remove each one when it is resolved. Never fill a gap with a guess.
- Before finishing, check that someone could plan and build from the spec without asking the author, that it is no longer than that requires, and that it contradicts neither itself nor another spec.

## Style

Write for a human reader: concise, precise, and easy to scan. Follow the `plain-language` skill. Use one term per concept and explain project-specific terms on first use.

## Example

```md
# Order paging

How clients page through a customer's orders. Covers the ordering, the request parameters, and the limits.

## Ordering

Orders are returned newest first, ordered by `created_at`, then `id`.

## Paging

Lists are paged by keyset on (`created_at`, `id`), not by offset.

Why: offset paging skips or repeats rows while new orders are being written.

| Parameter | Type    | Rule                                         |
| --------- | ------- | -------------------------------------------- |
| `limit`   | integer | 1 to 100, default 25                         |
| `after`   | string  | Cursor of the last item on the previous page |

- A request without `after` returns the first page.
- A `limit` outside 1 to 100 is rejected with a validation error.
- The last page returns no cursor.
- A page never contains another customer's orders.

Example: with 30 orders and `limit` 25, the second page holds 5 orders and no cursor.

## Out of scope

Filtering and search are defined in [order-filters.md](order-filters.md).

## Open questions

- Does a cursor stay valid after the order it points to is deleted? Proposed: yes, paging continues after the deleted position.
```
