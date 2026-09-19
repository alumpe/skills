---
name: testing
description: Guides risk-based selection and clear construction of useful automated tests. Use when deciding whether code needs tests or when creating, modifying, debugging, or reviewing automated tests.
---

# Testing

Repository instructions and nearby tests control the framework, file placement, commands, and syntax. This skill controls test value, behavioral focus, determinism, and assertion quality.

## 1. Decide What to Test

Read the relevant production code and existing tests before adding cases. Search for current protection and put new behavior in the closest clear test home.

Evaluate every behavior change. Do not add a test merely because a method, branch, file, or public symbol exists. For a reproducible bug, presume a regression test is needed unless an existing test already detects it or an automated reproduction is impractical.

### Test-value gate

Answer these before writing a test:

1. What observable behavior, contract, invariant, or regression will it protect?
2. What plausible defect could break that behavior, and how likely or harmful is it?
3. Would an existing test or static check already detect that defect?
4. What is the narrowest scope that faithfully includes the risky interaction?
5. Which representative partitions, boundaries, or failure modes add distinct confidence?
6. Can the test's sensitivity be shown by reproducing or deliberately perturbing the defect?
7. Does the confidence justify the writing, runtime, diagnosis, maintenance, and flakiness costs?

If these questions have no concrete answers, do not add the test. If the user asks for tests that appear ceremonial, explain the concern, propose the smallest useful alternative, and ask before materially changing the request.

### Choose focus, extent, and scope

- Prioritize regressions, domain rules, invariants, compatibility promises, meaningful boundaries, and failure-prone interactions by risk.
- Cover reachable invalid inputs and distinct failure modes, not speculative or impossible combinations.
- Use representative equivalence classes and boundaries. Do not mechanically enumerate branches or create cross-products of independent dimensions.
- Usually skip direct tests of getters, constants, and trivial delegation. Test them when they carry an important contract, impact, compatibility promise, or otherwise-unprotected risk.
- Do not duplicate guarantees already enforced statically. Test the meaningful runtime behavior or integration that the static check cannot prove.
- Test project-specific configuration, wrappers, mappings, and assumptions about third-party code, not the dependency's own guarantees.
- Add tests during a behavior-preserving refactor only for important behavior that lacked protection.

Choose the narrowest faithful scope, not the narrowest test by definition:

- Use a focused unit test for an isolated rule or calculation.
- Keep lightweight in-process collaborators when their interaction matters.
- Use the real production-compatible database, filesystem, queue, or serializer when its semantics create the risk.
- Use contract tests for external compatibility and property-based tests for a stable invariant over a broad input space.
- Use a small number of end-to-end tests for critical journeys, deployment wiring, or whole-system behavior that narrower tests cannot prove.
- Repeat behavior across levels only when each level supplies distinct evidence or diagnosis. Do not repeat the full case matrix at every level.

## 2. Write the Test

### Name and organize

- Follow repository conventions for file names, suffixes, and locations. Name top-level suites after the behavior-owning component, capability, or contract.
- Name each case as a behavioral sentence that states the observable outcome and, when relevant, its condition. Use domain language rather than only a production method name; do not mandate words such as `should`.
- Group cases by behavior or contract. Nest only when it improves navigation or removes genuinely repeated context.

### Set up the case

- Make setup, exercise, and verification visually distinct without mandatory phase comments or a fixed number of statements.
- Keep behavior-defining inputs in the case. Use minimal, meaningful data and helpers or factories for irrelevant defaults.
- Share setup only when it stays obvious and immutable. Each case must own or reset mutable state, clean external resources, and pass alone or in any order.
- Control clocks, randomness, identifiers, and scheduling unless they are the behavior under test. Await completion signals or bounded observable conditions; do not use fixed sleeps.
- Extract a test helper when its name clarifies intent and hides irrelevant mechanics, not merely because code repeats.
- Use real lightweight collaborators. Replace remote, slow, heavyweight, costly, or nondeterministic boundaries deliberately. When correctness depends on a double matching reality, add a contract or integration check. Do not expose internals only for tests; introduce a legitimate production seam when it improves the design as well as testability.

### Assert the contract

- Assert observable returned values, public state, persisted effects, emitted events, or contractually significant errors. Do not inspect private state or verify internal calls and order unless that interaction is itself the contract.
- Make assertions strong enough to establish the complete meaningful outcome while ignoring incidental fields and formatting. For errors, assert the stable type, code, status, or message fragment consumers rely on.
- Test one coherent behavior per case, not one assertion. Use multiple related assertions when they jointly describe that outcome and fail clearly.
- Use snapshots only when the reviewed artifact is the contract and the snapshot remains focused and understandable.
- Parameterize examples only when they exercise the same rule and assertion shape. Keep distinct domain rules and regressions as named cases.
- Comment only to explain a non-obvious constraint or regression history.

### Preserve protection

Extend an existing case only if it remains one coherent behavior; otherwise add a distinct case. When requirements change, update or remove only assertions for the changed contract. Never weaken a valid assertion to hide a production defect. Treat test code with production-level care, but prefer explicit repetition over premature test abstractions.

## Finish

- For a bug fix, observe the regression test fail before the fix when reproducible, then pass afterward. For important new behavior, perturb it to demonstrate sensitivity when practical; mutation tooling is not required.
- Run the focused case first, then the smallest relevant suite or repository-prescribed check. Report checks that were not run.
- Fix nondeterminism in every new or touched test before finishing. Retries and repeated passing runs do not make a flaky test reliable.
- Briefly report omitted tests and non-obvious scope choices. Do not narrate routine test additions.

## Useful Versus Ceremonial

- Useful: fails for a plausible behavioral regression. Ceremonial: still passes when the claimed behavior is removed.
- Useful: exercises the real interaction that creates risk. Ceremonial: verifies only assumptions encoded in mocks.
- Useful: covers a meaningful boundary or partition. Ceremonial: adds another mechanically similar permutation.
- Useful: asserts an observable contract. Ceremonial: pins private structure or checks only that a value is non-null.
