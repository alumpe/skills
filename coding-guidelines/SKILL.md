---
name: coding-guidelines
description: >
  Default baseline for planning, implementing, refactoring, debugging, and
  reviewing code. Focus on clear naming, purposeful comments,
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

## Comments and Documentation

Load [code-comments](../code-comments/SKILL.md) and its linked examples when
writing, modifying, or reviewing code, including deciding whether comments or
documentation are needed. It owns the rules for when to comment, what comments
should carry, and doc comment brevity. Apply it within the task's scope; a
review-only task remains read-only.

Document exported functions, modules, and non-trivial named helpers briefly;
skip trivial inline code and obvious local helpers.

## Visual Structure and Control Flow

Load [code-visual-clarity](../code-visual-clarity/SKILL.md) and its linked examples
when writing, modifying, or reviewing code. It owns the rules for vertical
spacing, statement grouping, and conditional block layout. Apply it within the
task's scope; a review-only task remains read-only.

- Replace dense ternaries with explicit branches when both outcomes contain meaningful behavior or are difficult to scan.
- Preserve concise expressions when their intent is immediately clear.

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
