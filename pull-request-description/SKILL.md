---
name: pull-request-description
description: >
  Writes concise pull request descriptions from the full set of changes.
  Use when drafting, creating, or updating a PR description or pull request body.
---

# Pull Request Description

Review the full diff against the intended base and all included commits,
not just the latest commit. Follow repository-specific PR instructions or templates;
otherwise use these defaults:

- no heading
- start with short bullet points summarizing the key changes
- add diagrams or collapsible detail only when they help
- report verification honestly; do not invent checks or results

## Example

- Preserve employee filters when navigating back to HR Manager
- Add regression coverage for back navigation
- Verification: targeted navigation tests passed; full suite not run

## Boundaries

Drafting a description does not authorize publishing it or creating a PR.
