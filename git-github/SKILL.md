---
name: git-github
description: >
  Guide for git and GitHub work: commits, branches, pushes, pull requests, and
  `gh` operations. Use for repo workflows and GitHub CLI tasks. Triggers on:
  commit requests, branch creation, PR creation, pushes, or general git/GitHub
  questions.
---

# Git & GitHub

Git/GitHub work is opt-in.

Do not create or switch branches, stage files, commit, push, open PRs, or run destructive git operations unless the user asked.

When in doubt, ask first.

## Branches

When creating a branch, use `al/<kebab-case-name>`.

Keep it short and descriptive.

## Commits

Use Conventional Commits.

Prefer a single-line subject:

`type: imperative summary`

Common types:

- `feat`
- `fix`
- `refactor`
- `docs`
- `test`
- `chore`
- `perf`
- `style`

Before committing:

- inspect `git status`
- inspect staged and unstaged diff
- check recent commit style if useful
- never commit secrets

## Pull Requests

Before opening a PR:

- determine the correct base branch if the user did not specify it
- inspect the full diff from base to `HEAD`
- inspect all commits included in the PR, not just the latest one
- push the branch if needed

PR body:

- no heading
- start with short bullet points summarizing the key changes
- add diagrams or collapsible detail only when they help

## Safety

- never modify git config
- never skip hooks unless explicitly requested
- never force-push to `main` or `master`
- never use interactive git commands
- amend only when the user explicitly asked, or when a commit succeeded and hooks changed files that must be included
- if a commit failed or a hook rejected it, fix the issue and create a new commit instead of amending
