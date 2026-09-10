---
name: code-comments
description: >
  Guides when and how to write purposeful code comments that explain intent,
  constraints, or non-obvious logic flow, plus brief doc
  comments on exported functions and modules. Use when writing, modifying, or
  reviewing code, deciding whether something needs a comment, or tempted to
  explain vague code with a comment instead of renaming it.
---

# Code Comments

## Goal

Use clear code and purposeful comments together. Comments carry intent,
constraints, contracts, and orientation through non-obvious logic; they should
help readers without paraphrasing individual statements.

Read [EXAMPLES.md](EXAMPLES.md) before adding comments. Its examples define
the standard of comments worth writing, not optional inspiration.

## The decision test

Add a comment only when the answer to all of these is yes:

1. Does it add useful intent, a contract, a constraint, reasoning, or an
   overview of non-obvious logic flow?
2. Does it help beyond what the names, types, and structure make immediately
   clear, rather than merely paraphrasing a statement or signature?
3. Would it still add value after reasonable naming or structural improvements?

If not, omit the comment or improve the code within the task's scope. Brief
JSDoc summaries and algorithm overviews are welcome when they orient readers;
comments do not have to explain only **why**.

## Inline comments

- Keep comments purposeful and proportionate to the logic. Do not add one to
  every statement or function.
- Explain the phases of a non-obvious algorithm when an overview helps readers
  follow the flow; do not narrate obvious operations line by line.
- Ground claims in the implementation, verified documentation, or user-provided
  requirements. Do not invent rationale, guarantees, or ticket references.
  Ask when a consequential contract is unknown.
- Explain constraints the code cannot express: invariants, external contract
  requirements, performance rationale, links to bugs or specs, why an
  alternative was rejected.
- Do not narrate straightforward code. Restating the next line in prose is
  noise, not documentation.
- Do not use comments as a patch for vague names or muddled control flow.
  Rename unclear code before adding comments to explain it.
- Keep comment content current with the code. A stale, wrong comment is worse
  than none; when changing behavior, update or remove affected comments.
- Do not add TODO comments unprompted. Only write one when the user asks for
  it, and then name the why and, ideally, the condition to revisit.

## Doc comments

Document exported functions, modules, and non-trivial named helpers with short
`/** ... */` comments.

- State what the code does and include only context a reader would not infer
  from the name and signature.
- Document contract details the signature cannot show: units, nullability,
  error modes, side effects, ordering constraints, when the call is valid.
- Do not default to verbose JSDoc tags or boilerplate API docs. Omit `@param`
  and `@returns` lines that restate the type and parameter name.
- Skip documentation for trivial inline code and obvious local helpers.
- Prefer a precise name over a doc comment that explains the name.

## Reviewing

When reviewing code, flag comments that merely narrate obvious statements,
patch for vague names, or
duplicate the signature, and missing doc comments on exported surfaces whose
contracts are not inferable from names and types. Suggest renames or
restructures before new comments.
