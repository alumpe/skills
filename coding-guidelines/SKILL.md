---
name: coding-guidelines
description: >
  Default baseline for planning, implementing, refactoring, debugging, and
  reviewing code. Focus on clear naming, sparse intentional comments,
  lightweight documentation, and modular code with clear responsibilities.
---

# Coding Guidelines

## Purpose

Use this as the default baseline for planning, implementing, refactoring,
debugging, and reviewing code.

Keep the guidance compact. Favor clear code over explanatory prose.

## Naming

Choose names that communicate intent.

Prefer domain terms over technical filler.

Keep names specific enough to remove ambiguity, but do not pack in incidental
implementation detail.

Prefer names that explain what a module, function, or variable means in the
problem space, not just what it does mechanically.

Rename unclear code before adding comments to explain it.

## Comments

Prefer structure and naming over comments.

Keep comments rare and intentional. Add them only when they explain intent,
constraints, or non-obvious reasoning that the code itself cannot carry cleanly.

Do not narrate straightforward code.

Do not use comments as a patch for vague names or muddled control flow.

## Documentation

Document exported functions, modules, and non-trivial named helpers with short
`/** ... */` comments.

Keep documentation brief. State what the code does and include only context a
reader would not infer from the name and signature.

Do not default to verbose JSDoc tags or boilerplate API docs.

Skip documentation for trivial inline code and obvious local helpers.

## Modularity

Keep modules and functions focused on one clear responsibility.

Split code when distinct concerns start competing for attention. Do not split
code to satisfy arbitrary size limits alone.

Keep related logic together when separation would add indirection without
clarity.

Extract helpers and modules when doing so makes the main flow easier to read,
changes easier to reason about, or responsibilities easier to own.

Avoid speculative abstractions. Introduce shared structure only when the code
has a real shared concept or repeated pressure that justifies it.
