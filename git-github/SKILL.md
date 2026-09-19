---
name: git-github
description: >
  Guide for Git and GitHub work: commits, branches, pushes, pull requests,
  merge conflicts, and CLI usage. Use for commit requests, branch creation,
  PR creation, pushes, or general Git/GitHub questions.
---

# Git & GitHub

Do not create or switch branches, stage, commit,
push, change GitHub resources, or run destructive operations unless the user asked.
When in doubt, ask first.

Use `git` for local repository work and `gh` for GitHub operations.
Confirm the repository, branch, and remote before making changes.
Follow repository instructions and preserve unrelated work, including staged changes.

## Branches

Use `al/<kebab-case-name>`. Keep it short and descriptive.

## Commits

Load [commit-message](../commit-message/SKILL.md) for the message format.

Before committing:

- inspect `git status` and staged/unstaged diffs
- stage only intended changes and review the final staged diff
- run relevant repository checks
- never commit secrets or unrelated work

## Pull Requests

Before opening a PR:

- determine the correct base branch
- inspect the full diff from base to `HEAD` and all included commits
- check for an existing PR and push the branch if needed
- load [pull-request-description](../pull-request-description/SKILL.md) for the body

Verify the result and return the PR URL.

## Merge Conflicts

Load [resolving-merge-conflicts](../resolving-merge-conflicts/SKILL.md).

A request to resolve conflicts authorizes editing and staging only.
Stop after staging; do not run `git commit`, `git merge --continue`, or `git rebase --continue`.

## Safety

- never modify Git config
- never skip hooks unless explicitly requested
- never use interactive Git or GitHub CLI commands
- never force-push to `main` or `master`
- discard changes, amend, or rewrite history only with explicit approval
- if a commit or hook fails, diagnose and fix it, then retry a normal commit; do not amend
- verify mutations and report checks honestly, including failures or checks not run
