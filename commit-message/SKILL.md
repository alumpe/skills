---
name: commit-message
# Keep message rules in sync with agent.commit_message_instructions in the
# chezmoi source files ~/dotfiles/zed-settings.work.json and zed-settings.private.json.
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

Format:
- Allowed types: `feat`, `fix`, `refactor`, `perf`, `docs`, `test`, `chore`, `build`, `ci`, `style`, `revert`.
- No scope.
- Write the entire subject in lowercase, including proper nouns and acronyms (e.g. `feat: add api client for github`, not `feat: add API client for GitHub`).
- No trailing punctuation, emojis, first-person language, AI attribution (including `Co-Authored-By` trailers), or vague filler (e.g. "update files", "misc changes").

Content:
- Summarize the main intent concretely from the diff; if several files changed, focus on the primary purpose rather than listing files.
- Name the affected app, module, or component when needed for the subject to stand on its own; use the changed paths and diff to identify it.
- Aim for 50–72 characters, preferring clarity over strict truncation.

Output only the single subject line: no body, trailers, quotes, Markdown, or commentary.

## Examples

- `fix: preserve employee filters when navigating back to hr-manager`
- `refactor: share github authentication between cli commands`
- `docs: clarify local development setup`

## Boundaries

This skill defines the message, not permission to stage, commit, or amend.
When executing a Git workflow, use this subject as the commit message and
follow the workflow's reporting requirements; the subject-only output rule
applies to message generation, not the entire workflow response.
