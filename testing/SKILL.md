---
name: testing
description: Guides which automated tests are worth writing and how to write them well. Use when deciding whether code needs tests or when creating, modifying, or reviewing automated tests.
---

# Testing

Write tests that catch defects that matter, and skip tests that only add maintenance. Every test costs time to write, review, run, and maintain, so each one should protect something important.

Repository instructions and nearby tests decide the framework, file location, commands, and style.

## Decide what to test

Read the changed code and its existing tests first. For each test you consider, name the defect it would catch: a specific mistake and the wrong result it causes, such as "a discount code applied twice reduces the price twice." The test is worth writing when that defect could realistically happen, would cause real harm, and is not already caught by an existing test, type check, schema, or linter. If you cannot name such a defect, skip the test.

Do not write tests that only restate a decision made in the code. If the code says "status 1 returns blue, status 0 returns green," a test asserting that status 1 returns blue copies the rule into a second place. It fails only when someone changes the rule on purpose, and then the test has to change with it. Test where the code combines things instead: several rules acting together, data passing through several steps or modules, branches that affect each other, and edge cases where those combinations go wrong.

Usually worth testing:

- Calculations and rules that combine several inputs, conditions, or steps, especially those involving money, permissions, or changes to stored data.
- Bug fixes: a regression test that reproduces the bug. Follow the [bug-fixes skill](../bug-fixes/SKILL.md).
- Boundaries that are easy to get wrong, such as limits, empty input, or date ranges.
- Error handling that callers rely on, such as rejected input or a failing dependency.
- Queries, mappings, and serialization where the code meets a database, file system, or external API.
- Interfaces that other modules, services, or teams depend on.
- Branches that affect each other, and code that has broken before.

Usually skip tests that:

- Exist because a function, branch, or file exists, or to raise coverage.
- Restate a single decision from the code, such as a fixed mapping from input to output or one condition with a fixed result.
- Check getters, constants, constructors, or delegation, unless other code depends on that exact behavior.
- Repeat a case with more inputs that take the same path through the code. Add inputs only for a different combination or a boundary that is likely to be wrong.
- Cover inputs no caller can produce or that the type system already rules out.
- Check library, framework, or language behavior instead of this project's use of it.
- Check the same rule again at another level, such as unit and end-to-end.
- Only confirm that code runs without throwing or returns something defined.
- Assert log output, exact error wording, or internal call order that no caller relies on.

Give each test its own defect to catch. If two tests would fail for the same mistake, keep one.

Apply this guidance when the user asks for tests in general, and mention tests you skipped that they might expect. If the user asks for a specific test that you think adds little value, explain why and ask before writing it.

## Choose the scope

Include all the code that works together to produce the behavior, which is often several functions or modules. When two scopes would catch the same defect, use the smaller one:

- A unit test for a calculation or a combination of rules inside one module.
- An integration test with the real database, file system, or serializer when the defect depends on how that dependency behaves.
- An end-to-end test only for a critical user flow that smaller tests cannot cover.

## Write the test

- Test through the public interface. Assert return values, saved data, sent messages, or errors that callers depend on. Do not assert private state or internal calls unless that call is the requirement.
- Use real in-process collaborators. Replace only dependencies that are remote, slow, costly, or nondeterministic. A test that mostly checks what its own mocks return proves nothing.
- Assert the complete meaningful result, and ignore fields that do not matter to the behavior.
- Keep the inputs that define the behavior visible in the test. Move irrelevant setup into helpers or factories.
- Name the test after the behavior, such as "rejects an expired token," not after the method.
- Keep tests deterministic and independent: control time and randomness, wait for real conditions instead of fixed sleeps, and give each test its own state.
- Add cases to an existing test file before creating new files or helpers.
- Never weaken or delete a valid assertion to make a test pass. When requirements change, update only the assertions for the changed behavior.
- Confirm each new test can fail: run it before the fix, or briefly break the behavior and watch it fail.
