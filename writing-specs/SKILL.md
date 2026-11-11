---
name: writing-specs
description: Guides how to write specs, the living documents that define how an application or one aspect of it should be and why. Use when creating, editing, or reviewing a spec, or when turning a discussion or grilling session into a spec.
---

# Writing specs

A spec defines how something should be and why: behavior, a workflow, a data contract, or a technical aspect such as architecture or service setup. A plan defines what to do to get there. Steps, order of work, migration, and progress belong in a plan, never in a spec.

## Always

- Describe the target state, whether or not it is built yet.
- Edit in place and rewrite to the new state, so the spec reads as if it had always been this way. No changelog, dates, status fields, or "previously" wording. Git holds the history.
- Each fact has one home. Link to the spec that owns it instead of repeating it.
- Include only what someone has to agree to. If a detail could change without anyone needing to agree, leave it out. This usually excludes file paths, function names, and implementation code, but not a structure or name that the spec itself defines.
- State rules as present-tense facts that someone can check ("Sessions end after 30 minutes"). Words such as "fast" or "robust" need a number or a condition. Use "should" only for a recommendation, and name the exception.
- Never fill a gap with a guess. List undecided points under "Open questions", with your proposed answer where you have one, and remove each one when it is resolved.
- Write for a human reader: concise, precise, and easy to scan. Follow the `plain-language` skill. Use one term per concept and explain project-specific terms on first use.
- Before finishing, check that someone could plan and build from the spec without asking the author, that it is no longer than that requires, and that it contradicts neither itself nor another spec.

## Default shape

```md
# <Topic>

One to three sentences: what this topic is and what the spec covers.

## <Topic section>
...

## Out of scope      (only what a reader would otherwise expect here)
## Open questions    (only while any exist)
```

This is a starting point. Choose the sections and the form that fit the topic: plain sentences with rules as bullet lists by default, a table where the content is tabular. One topic per file is the default; split a spec when its parts change for different reasons. Where the repository has its own conventions for specs, they win.

## Use where it fits

- Exact definitions where other parts depend on them (schemas, API shapes, events, config keys), as tables or short blocks.
- What happens when things go wrong: invalid input, missing data, failures, limits reached.
- What must never happen, and the constraints that apply: who may do something, privacy rules, performance limits, compatibility.
- A short `Why:` next to a rule or decision that is not obvious. Mention a rejected alternative only where someone might bring it back.
- A concrete example where a rule can be misread, for instance at boundary values or with ordering.
- A Mermaid diagram or a few lines of pseudocode where they explain an interaction, flow, or rule better than prose.

## Examples

Two possible shapes, not templates. A behavior spec:

```md
# Order paging

How clients page through a customer's orders. Covers the ordering, the request parameters, and the limits.

## Paging

Orders are returned newest first. Lists are paged by keyset on (`created_at`, `id`), not by offset.

Why: offset paging skips or repeats rows while new orders are being written.

| Parameter | Type    | Rule                                         |
| --------- | ------- | -------------------------------------------- |
| `limit`   | integer | 1 to 100, default 25                         |
| `after`   | string  | Cursor of the last item on the previous page |

- A `limit` outside 1 to 100 is rejected with a validation error.
- The last page returns no cursor.
- A page never contains another customer's orders.

Example: with 30 orders and `limit` 25, the second page holds 5 orders and no cursor.

## Out of scope

Filtering and search are defined in [order-filters.md](order-filters.md).

## Open questions

- Does a cursor stay valid after the order it points to is deleted? Proposed: yes, paging continues after the deleted position.
```

A technical spec:

```md
# Database access

How the service reads and writes its database. Covers the access layer and schema changes.

## Access layer

All queries go through the repository modules in `src/db/`. No other code imports the database client.

Why: customer scoping is enforced in one place.

## Schema changes

Schema changes are forward-only SQL migrations, applied automatically on deploy. A column is dropped at the earliest one release after the code stops using it.
```
