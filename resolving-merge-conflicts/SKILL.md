---
name: resolving-merge-conflicts
description: "Use when you need to resolve an in-progress git merge/rebase conflict."
metadata:
  source: https://github.com/mattpocock/skills/blob/3cca18b368ae95cdbdebbff572ccafa662551015/skills/engineering/resolving-merge-conflicts/SKILL.md
---

1. **See the current state** of the merge/rebase. Check git history, and the conflicting files.

2. **Find the primary sources** for each conflict. Understand deeply why each change was made, and what the original intent was. Read the commit messages, check the PRs, check original issues/tickets.

3. **Resolve each hunk.** Preserve both intents where possible. Where incompatible, pick the one matching the merge's stated goal and note the trade-off. Do **not** invent new behaviour. Always resolve; never `--abort`.

4. Discover the project's **automated checks** and run them, typically typecheck, then tests, then format. Fix anything the merge broke.

5. **Finish the merge/rebase.** Stage everything but do **not** commit — leave that to the user. If rebasing, continue the rebase process (`git rebase --continue`) until all commits are rebased, unless the final commit would be created by the rebase itself; in that case, ask the user before proceeding.

6. **Report back.** Summarize at a high level: straightforward resolutions in one line each, details only for conflicts where intent clashed or trade-offs were made, plus the outcome of the automated checks.
