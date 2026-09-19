---
name: resolving-merge-conflicts
description: >
  Resolves conflicts in an in-progress Git merge or rebase and stages the resolved files for the user.
  Use when resolving merge or rebase conflicts.
metadata:
  source: https://github.com/mattpocock/skills/blob/3cca18b368ae95cdbdebbff572ccafa662551015/skills/engineering/resolving-merge-conflicts/SKILL.md
---

1. **See the current state** of the merge/rebase. Check git history, and the conflicting files.

2. **Find the primary sources** for each conflict. Understand deeply why each change was made, and what the original intent was. Read the commit messages, check the PRs, check original issues/tickets.

3. **Resolve each hunk.** Preserve both intents where possible. Where incompatible, pick the one matching the merge's stated goal and note the trade-off. Do **not** invent new behaviour. Always resolve; never `--abort`.

4. Discover the project's **automated checks** and run them, typically typecheck, then tests, then format. Fix anything the merge broke.

5. **Stage the resolutions and stop.** Stage each resolved file explicitly and use `git status` to confirm no unmerged paths remain.
   Preserve unrelated changes; never use blanket staging commands such as `git add .` or `git add -A`.

   A request to resolve conflicts authorizes editing and staging only.
   Do not run `git commit`, `git merge --continue`, or `git rebase --continue`; leave completion to the user.

6. **Report back.** Summarize the resolutions and check results.
   Confirm that the resolved files are staged and no commit was created.
