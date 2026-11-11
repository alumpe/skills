# Sources for writing-specs

Frameworks and documents that were reviewed when this skill was written, and what it took from each. Reviewed on 2026-11-11; the linked files may have changed since.

The core definitions (a spec is living, describes the target state, and covers technical aspects as well as behavior) are the author's own and were worked out in a grilling session. The sources below shaped individual rules.

## Adopted from

### OpenSpec

- [Concepts](https://raw.githubusercontent.com/Fission-AI/OpenSpec/main/docs/concepts.md)
- Specs as the standing source of truth for how a system should be.
- The quick test "if implementation can change without changing externally visible behavior, it does not belong in the spec", widened here to "if a detail could change without anyone needing to agree".
- Error conditions and external constraints (security, privacy, reliability, compatibility) as spec content.

### Spec Kit

- [Spec template](https://raw.githubusercontent.com/github/spec-kit/main/templates/spec-template.md)
- [Checklist command](https://raw.githubusercontent.com/github/spec-kit/main/templates/commands/checklist.md)
- Edge cases as their own concern in a spec.
- `[NEEDS CLARIFICATION]` markers, turned here into the "Open questions" section.
- "Unit tests for English": checking a spec for clarity, completeness and consistency, which became the final check against contradictions.

### Superpowers

- [brainstorming skill](https://raw.githubusercontent.com/obra/superpowers/main/skills/brainstorming/SKILL.md)
- The builder check: a builder could plan from the document without going back to the author.
- Marking the writer's own calls, turned here into proposed answers on open questions.
- Non-goals and anti-goals, which fed into "what must never happen" and "Out of scope".

### BMAD Method

- [Choose a Planning Path](https://docs.bmad-method.org/plan/choose-a-planning-path/)
- A well-defined intent is "complete enough that someone else could build it without guessing, and no longer than that".
- Stating what must not change.

### Matt Pocock's skills

- [to-spec skill](https://raw.githubusercontent.com/mattpocock/skills/main/skills/engineering/to-spec/SKILL.md)
- No file paths or code snippets in a spec, because they go stale.
- An "Out of scope" section.
- A shared project vocabulary, which fed into "one term per concept".

### Compound Engineering

- [ce-brainstorm guide](https://raw.githubusercontent.com/EveryInc/compound-engineering-plugin/main/docs/guides/ce-brainstorm.md)
- Requirements describe behavior, not libraries or file layouts, unless the topic itself is a technical decision.

### Local skills

- `plain-language` for writing style.
- `show-me` (from [humanlayer/skills](https://github.com/humanlayer/skills)) for the visual forms. Only Mermaid diagrams and pseudocode were taken over for specs.

## Reviewed but not adopted

- Requirement and scenario blocks with SHALL/MUST and Given/When/Then (OpenSpec).
- User stories with acceptance criteria and priorities (Spec Kit, Matt Pocock).
- EARS statements (Kiro).
- Change deltas kept in a separate folder until merged (OpenSpec).
- Numbered requirement IDs for tracing (Spec Kit, Compound Engineering).
- Per-change specs that are not maintained afterwards (Spec Kit, Matt Pocock, Superpowers).
- Status and metadata fields in the document.

## Overview articles

- [OpenSpec vs Superpowers vs Spec Kit (Oct 2026)](https://felipefontoura.com/articles/spec-driven-development-tools-compared/)
- [Superpowers, GSD, and GSTACK (Pulumi)](https://www.pulumi.com/blog/claude-code-orchestration-frameworks/)
- [GSD vs Spec Kit vs OpenSpec vs Taskmaster AI](https://medium.com/@richardhightower/agentic-coding-gsd-vs-spec-kit-vs-openspec-vs-taskmaster-ai-where-sdd-tools-diverge-0414dcb97e46)
