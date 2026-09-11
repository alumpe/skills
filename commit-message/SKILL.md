---
name: commit-message
# Keep message rules in sync with agent.commit_message_instructions in
# ~/dotfiles/private_dot_config/zed/private_settings.json (chezmoi source).
description: >
  Writes clear, concise, single-line Conventional Commit messages from a diff.
  Use when drafting or choosing a commit message, committing changes, or when
  the user says "commit message", "write a commit", "generate commit", or "/commit".
---

# Commit Message

## Input

Use the supplied diff or inspect the changes intended for the commit. For a
staged commit, use `git diff --cached`; do not describe unstaged changes as part
of it. If the intended changes are unclear, ask rather than guess.

## Message Rules

Write one commit subject from the diff:

`<type>: <imperative description>`

No scope. Start the description with a lowercase verb (e.g. `update`, not
`Update`); preserve proper names and acronyms elsewhere.

Choose the best-fitting type: `feat`, `fix`, `refactor`, `perf`, `docs`, `test`,
`chore`, `build`, `ci`, `style`, or `revert`.

Describe the main change concretely. Name the affected app or component when
needed to make the subject understandable on its own; use the changed paths
and diff to identify it.

Keep the subject concise and easy to scan, but do not sacrifice useful context
to meet a character count. No trailing period, filler, first-person language,
emojis, or AI attribution.

Output only the subject, on one line, without quotes, Markdown formatting,
a body, or extra text.

## Examples

- `fix: preserve employee filters when navigating back to HR Manager`
- `refactor: share GitHub authentication between CLI commands`
- `docs: clarify local development setup`

## Boundaries

This skill defines the message, not permission to stage, commit, or amend.
When executing a Git workflow, use this subject as the commit message and
follow the workflow's reporting requirements; the subject-only output rule
applies to message generation, not the entire workflow response.
