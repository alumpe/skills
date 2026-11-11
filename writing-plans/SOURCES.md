# Sources for writing-plans

Frameworks and documents that were reviewed when this skill was written, and what it took from each. Reviewed on 2026-11-11; the linked files may have changed since.

The core definitions (a plan is an action plan for one change, is used up afterwards, and leaves anything durable to a spec) are the author's own and were worked out in a grilling session. The sources below shaped individual rules.

## Adopted from

### Superpowers

- [writing-plans skill](https://raw.githubusercontent.com/obra/superpowers/main/skills/writing-plans/SKILL.md)
- [brainstorming skill](https://raw.githubusercontent.com/obra/superpowers/main/skills/brainstorming/SKILL.md)
- A plan is written for someone who has seen neither the codebase nor the discussion.
- "A plan is the set of decisions the implementer cannot make alone", and "a plan longer than the code it describes has written the code instead".
- Lines that decide nothing ("TBD", "handle edge cases", "add appropriate validation") are not steps.
- Names and signatures stay identical across tasks.
- The self-review that checks the plan against the spec, which became the goal coverage check.
- Marking the writer's own calls, which became `Assumption:`.

### Matt Pocock's skills

- [to-tickets skill](https://raw.githubusercontent.com/mattpocock/skills/main/skills/engineering/to-tickets/SKILL.md)
- Tracer-bullet vertical slices that can be verified on their own.
- A slice is sized to fit a single fresh context window.
- Prefactoring first: "Make the change easy, then make the easy change."
- Expand and contract for wide mechanical refactors.

### Compound Engineering

- [ce-plan guide](https://raw.githubusercontent.com/EveryInc/compound-engineering-plugin/main/docs/guides/ce-plan.md)
- Test scenarios cover edge cases and error handling, not only the happy path.
- "The plan says what must be true when a unit is done; the implementer makes it true."
- Attention to data migrations and deployment order, which fed into flagging steps that cannot be undone.
- Not building what the request did not ask for, which fed into "no step goes beyond the goal".

### HumanLayer

- [create_plan command](https://raw.githubusercontent.com/humanlayer/claudelayer/main/.claude/commands/create_plan.md)
- [Research, Plan, Implement tutorial](https://goose-docs.ai/docs/tutorials/rpi/), which describes the same workflow
- Splitting success criteria into "Automated Verification" and "Manual Verification", with a pause for the human after manual checks. This became `Done when (manual)`.
- Checkboxes on the success criteria.

### Spec Kit

- [Plan template](https://raw.githubusercontent.com/github/spec-kit/main/templates/plan-template.md)
- [Tasks template](https://raw.githubusercontent.com/github/spec-kit/main/templates/tasks-template.md)
- Marking tasks that can run in parallel.
- A checkpoint after each group of tasks, which supported the check per step.

### Local skills

- `plain-language` for writing style.
- `show-me` (from [humanlayer/skills](https://github.com/humanlayer/skills)) for the visual forms: structure diffs, file and call trees, pseudocode and Mermaid diagrams.

## Reviewed but not adopted

- Test-first sub-steps spelled out in every task (Superpowers).
- Complete code inside plan steps.
- A fixed richer template with approach, constraints and risk sections (Spec Kit, HumanLayer).
- An interfaces block per task that repeats what it consumes and produces (Superpowers).
- A target file layout before the tasks (Superpowers).
- No open questions allowed in a finished plan (HumanLayer).
- Numbered task IDs, phases by user story and a constitution check (Spec Kit).
- Publishing each slice as a ticket in an issue tracker (Matt Pocock).

## Overview articles

- [OpenSpec vs Superpowers vs Spec Kit (Oct 2026)](https://felipefontoura.com/articles/spec-driven-development-tools-compared/)
- [Superpowers, GSD, and GSTACK (Pulumi)](https://www.pulumi.com/blog/claude-code-orchestration-frameworks/)
- [GSD vs Spec Kit vs OpenSpec vs Taskmaster AI](https://medium.com/@richardhightower/agentic-coding-gsd-vs-spec-kit-vs-openspec-vs-taskmaster-ai-where-sdd-tools-diverge-0414dcb97e46)
