# Overused agent vocabulary

Use these as review cues, not forbidden words or proof of AI authorship.
When a metaphor obscures the meaning, name the specific component, relationship,
dependency, action, or consequence instead.

## How to use this list

- Check what the word means in this sentence before replacing it.
- Keep precise technical terms, literal uses, quotations, and identifiers.
  A test seam or circuit breaker may be the correct term for the audience.
- Do not invent a mechanism, risk, or guarantee to make the wording concrete.
  If the source is vague, preserve that uncertainty or ask for clarification.
- Do not replace one fashionable metaphor with another.

## Coding-agent wording

These are suggested edits, not fixed synonym substitutions.

| Review cue | Prefer |
|---|---|
| **seam**, **clean seam** | Name the interface, replacement point, or components being separated. |
| **load-bearing** | Explain what depends on it or what fails without it. |
| **blast radius** | Specify which users, files, services, or operations could be affected. |
| **machinery** | Name the functions, components, or steps involved. |
| **chokepoint** | Specify where requests must pass or what limits throughput, depending on the meaning. |
| **backstop**, **tripwire** | Name the fallback, check, or alert and what triggers it. |
| **the risk lives in**, **the logic lives in** | State where the risk occurs or which file or component contains the logic. |
| **shape**, **the shape of** | Specify the structure, fields, behavior, or direction being described. |
| **surface**, **surface an issue** | Say whether the system detects, reports, displays, or exposes it. |
| **quietly**, **silently** | Specify whether there is no log, alert, error, or user notification. Omit unsupported claims that nobody noticed. |
| **genuinely**, **honestly**, **the honest take** | Usually omit self-endorsement and state the claim with its evidence or limits. |
| **structurally**, **fundamentally**, **at its core** | Name the relevant design constraint or relationship; otherwise omit the framing. |
| **leverage**, **harness** | Use, call, or rely on, according to the actual action. |
| **robust**, **seamless** | Describe the supported failure cases or the steps the user no longer needs to perform. |

## Examples

Use these rewrites only when the stated details are established:

- "Introduce a clean seam around storage."
  → "Put storage calls behind an interface so tests can substitute an in-memory store."
- "This validation is load-bearing."
  → "Without this validation, an empty ID reaches the database query."
- "The error quietly disappears."
  → "The handler catches the error without logging it or notifying the caller."

## Sources

Candidates draw on [The load-bearing vocabulary of Claude](https://github.com/louisabraham/load-bearing)
and [Claudisms](https://claudisms.ai/claudisms.md), with additional editorial examples.
The first analyzes vocabulary in GitHub PR descriptions; the second collects
editorial judgments about overused wording. Neither makes every occurrence wrong.
The replacement guidance here is adapted for technical explanations.
