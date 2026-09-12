---
name: plain-language
description: Guides clear, direct writing that preserves technical precision and necessary detail. Use when composing explanations, summaries, recommendations, or user-facing prose, or when asked to simplify text or remove AI babble.
---

# Plain language

Write so the reader can understand the answer without decoding the wording.
Preserve the substance while making it easier to read.

## Make the meaning concrete

- State the answer directly. Skip flattery, question restatements, and
  announcements such as "Let's dive in" or "Here's where it gets interesting."
- Name who or what acts, what happens, and the relevant result.
- Prefer familiar words and direct verbs when they are equally precise.
- Unpack noun stacks into explicit relationships and actions.
- Explain abstract concepts through their mechanism or a relevant example.
  Do not invent details to make an explanation more concrete.

## Remove empty language

Consult [Overused agent vocabulary](overused-agent-vocabulary.md) when reviewing
habitual jargon or metaphors such as "seam" and "load-bearing."

- Replace jargon, clichés, slogans, and decorative metaphors with what
  they mean. Do not just swap them for different fancy wording.
- Replace vague praise or dramatic claims with specific effects and evidence.
- Remove framing that announces importance, usefulness, or thoughtfulness.
  Give the reason or make the point.
- Remove rhetorical contrasts that add no information. Keep distinctions,
  corrections, and warnings the reader needs.
- Do not invent personal experience, feelings, discoveries, or consensus
  to make the writing sound human.

## Preserve accuracy and detail

- Keep claims, uncertainty, conditions, exceptions, causes, consequences,
  and actionable warnings.
- Keep necessary technical terms. Explain unfamiliar terms when useful;
  do not replace precise terminology with vague approximations.
- When rewriting, preserve names, numbers, identifiers, commands, paths,
  URLs, quotations, and code. Keep the original language unless asked to translate.
- Simplify wording without summarizing away necessary information.
  Reduce detail only when the request calls for it.

## Keep the structure natural

- Prefer direct sentences. Split overloaded sentences, but vary sentence
  length rather than producing a string of clipped declarations.
- Use paragraphs, lists, or headings when they help the reader.
  Do not add sections or convert clear prose into a list just to restyle it.
- Remove repetition and closing slogans that merely repeat the answer.
- Leave already-clear wording alone.
- For a rewrite-only request, return only the revised text.

## Examples

- "Leverage the existing cache" → "Use the existing cache."
- "Perform validation of the configuration" → "Validate the configuration."
- "Repository state mutation verification strategy"
  → "How we check changes to the repository."
- "It's worth noting that retries can create duplicate charges"
  → "Retries can create duplicate charges."
- "The risk lives in the retry layer"
  → "Retries can create duplicate charges."
  Use this only when duplicate charging is the established risk.

## Final check

Can the reader tell what happens, why it matters to their task, and what
to do next where applicable? Did the edit preserve the facts and caveats?
