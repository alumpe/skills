---
name: skill-fixer
description: >
  Analyzes the current conversation to identify where a named skill caused
  friction (re-prompts, corrections, wrong defaults, missing steps), then
  proposes targeted before/after improvements to that skill's SKILL.md.
  Invoke manually at the end of a conversation where a skill underperformed.
  Edits the skill in the dedicated skills repository after user approval.
---

# Skill Fixer

Use this skill at the end of a conversation where another skill was active but
something didn't go completely right — you had to re-prompt, correct the agent,
clarify something mid-task, or were otherwise unsatisfied with how the skill
guided the agent's behavior.

---

## Step 1 — Identify the skill to improve

Ask the user: **"Which skill should I improve?"**

Once you have the skill name:

1. Read the current skill definition from the agent's skills directory, e.g.
   `~/.agents/skills/<name>/SKILL.md` (or the equivalent location the current
   agent loads skills from).

2. If a `references/` subfolder exists, read all files inside it:
   `~/.agents/skills/<name>/references/`

Understand the skill's current intent, structure, rules, and examples before
proceeding.

---

## Step 2 — Analyze the full conversation for friction signals

Review the entire conversation (not just the most recent messages) and look for
every signal that the skill fell short. Friction signals include:

- **Re-prompts** — the user asked the agent to redo something ("try again",
  "do it differently", "that's not what I meant")
- **Explicit corrections** — the user said something was wrong, incomplete, or
  not what they wanted ("no, actually…", "that's wrong", "you missed…")
- **Mid-task clarifications** — the user had to supply context or constraints
  mid-conversation that the skill should have made the agent ask for upfront
- **Guesswork by the agent** — the agent had to infer something the skill
  should have prescribed (default values, output format, confirmation flow)
- **Wrong defaults or output format** — the agent produced something in a
  format or style the user didn't want
- **Missing guardrails** — the agent did something it shouldn't have, or skipped
  a step it should always do
- **Absent examples** — the agent produced output in the wrong style because
  no examples existed in the skill to guide it

Compile a list of specific friction points with the exact moment in the
conversation where each occurred.

---

## Step 3 — Map each friction point to a root cause in the skill

For each friction point, identify the specific gap in the current SKILL.md that
caused it:

| Friction signal | Likely root cause |
|---|---|
| Agent guessed a default wrong | Default not stated explicitly in skill |
| Agent skipped a required step | Step not listed or buried in prose |
| Agent used wrong output format | No format example or template in skill |
| Agent did something it shouldn't | Missing guardrail or "never do X" rule |
| User had to clarify upfront context | Skill doesn't tell agent what to ask for |
| Agent misunderstood intent | Instruction is ambiguous or too vague |
| Re-prompt was needed | Example didn't cover that case |

Document the root cause for each friction point — this is what you'll fix.

---

## Step 4 — Draft improvements

Propose changes to address every identified root cause. Any type of change is
valid:

- **Add** — new rules, examples, guardrails, clarifying questions, defaults
- **Rewrite** — vague or ambiguous instructions rewritten to be precise
- **Restructure** — reorganize sections so critical rules are more prominent
- **Remove** — redundant, contradictory, or misleading content

Present each proposed change as a numbered before/after diff block with a
one-line rationale:

---

**Change 1** — _rationale: one sentence explaining why this change addresses the friction_

**Before:**
```
[exact current text from the skill, or "(nothing — this is a new addition)"]
```

**After:**
```
[proposed replacement or new text]
```

---

Repeat for every change. Be specific — quote exact lines from the skill where
possible, not paraphrases.

---

## Step 5 — Wait for a single approval

After presenting all proposed changes, ask:

> "Apply all X changes to the skill? (yes / no, or tell me which to skip)"

Do **not** touch any files until you receive explicit confirmation.

If the user asks to skip specific changes or requests adjustments, update the
proposal accordingly before asking for confirmation again.

---

## Step 6 — Apply approved changes

Write all approved changes to the **dedicated skills repository**:

```
~/Private/skills/<name>/SKILL.md
```

If any changes affect reference files, write those to:

```
~/Private/skills/<name>/references/<filename>
```

Do **not** write to the live skills directory (e.g. `~/.agents/skills/`)
directly unless the user has explicitly set up that path to mirror the
dedicated repository.

---

## Step 7 — Remind the user where changes were saved

After writing the files, always end with:

> "Changes saved to `~/Private/skills`. If the current agent loads skills from
> a different location, make sure that path is linked or otherwise synced to
> the dedicated repository."
