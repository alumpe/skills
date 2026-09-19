# Research: Useful Automated Tests

This document collects research used to design an agent skill for writing useful unit and integration tests. It separates broad areas of agreement from contested advice and turns the findings into candidate decision rules.

## Main conclusion

A useful automated test should:

1. Protect a meaningful behavior, contract, invariant, or past regression.
2. Fail for a plausible defect in that behavior.
3. Continue passing after behavior-preserving refactoring.
4. Add confidence that existing tests or static checks do not already provide.
5. Cost less to run and maintain than the risk it reduces.

This matches Kent Beck's emphasis on behavioral, structure-insensitive, deterministic, specific tests, and Google's view that tests should prevent defects while improving engineering productivity.

Sources:

- [Kent Beck: Test Desiderata](https://kentbeck.github.io/TestDesiderata/)
- [Software Engineering at Google: Unit Testing](https://abseil.io/resources/swe-book/html/ch12.html)

## 1. Test value is confidence, not test quantity

Tests are not inherently valuable. Their value comes from detecting regressions, supporting safe change, and explaining intended behavior. A test suite can become a productivity cost when it is brittle, unclear, slow, or unreliable. Google warns that a bad test suite can be worse than no suite because engineers stop trusting it.

A useful working model is:

> Test value = confidence gained minus writing, maintenance, execution, and diagnosis costs.

This makes "should this have a test?" a risk and economics question, not a completeness ritual.

An archived xUnit Test Patterns draft associated with Gerard Meszaros describes similar goals for test automation: improve quality, help engineers understand the system, reduce rather than introduce risk, remain easy to run and maintain, and require little maintenance as the system evolves. The page warns that its content may differ from the published book.

Sources:

- [Software Engineering at Google: Testing Overview](https://abseil.io/resources/swe-book/html/ch11.html)
- [Archived xUnit Test Patterns draft: Goals of Test Automation](http://xunitpatterns.com/Goals%20of%20Test%20Automation.html)

## 2. Test observable behavior, not implementation structure

Tests should normally interact through the stable public boundary of the unit or component and assert observable results or side effects. Tests coupled to private state, helper methods, internal call order, or exact collaboration structure often:

- Fail after harmless refactoring.
- Continue passing when user-visible behavior is broken.
- Require changes whenever the implementation is reorganized.

Kent C. Dodds demonstrates both false failures after refactoring and false passes when behavior is broken. Google recommends testing through public APIs as its main defense against brittle tests.

"Public" depends on the consumer. A class may be internal to an application but public to another module. The stable contract at that boundary is behavior; the code behind it is implementation.

A useful test should be sensitive to behavior changes and insensitive to structural changes. This does not require testing only through the outermost interface of an entire application. It means choosing a stable boundary appropriate to the risk being tested.

Sources:

- [Kent C. Dodds: Testing Implementation Details](https://kentcdodds.com/blog/testing-implementation-details)
- [Software Engineering at Google: Unit Testing](https://abseil.io/resources/swe-book/html/ch12.html)
- [Kent Beck: Test Desiderata](https://kentbeck.github.io/TestDesiderata/)

## 3. Select tests by risk, not by methods or lines

The research does not support writing one test per method, branch, class, or changed line. Better factors are:

- Business, financial, privacy, safety, or operational impact if the behavior breaks.
- Complexity and the number of meaningful decisions.
- Likelihood and frequency of future change.
- History of defects in the area.
- Number of consumers and compatibility commitments.
- Whether static typing, schema validation, compilation, or linting already covers the failure.
- Whether the behavior crosses a dependency boundary.
- Whether failures would otherwise be detected only late or in production.

Google recommends interpreting coverage in light of criticality, complexity, change frequency, and expected lifetime rather than enforcing one universal target.

Sources:

- [Google Testing Blog: Code Coverage Best Practices](https://testing.googleblog.com/2020/08/code-coverage-best-practices.html)
- [Secondary reproduction of Code Coverage Best Practices](https://www.googblogs.com/code-coverage-best-practices/)
- [Software Engineering at Google: Testing Overview](https://abseil.io/resources/swe-book/html/ch11.html)

The primary Google Testing Blog page is available in a browser, but some automated extraction tools return only its comments. The secondary reproduction makes the article body easier to verify programmatically.

## 4. Use the smallest scope that faithfully exercises the risk

The traditional test pyramid recommends many fast, focused tests, some integration tests, and few broad end-to-end tests. Its main principle is not a fixed ratio. Broader tests usually cost more, run more slowly, and fail less precisely.

The practical interpretation of the pyramid has two parts:

1. Use tests at different levels of granularity.
2. Usually have fewer tests as their scope and cost increase.

For browser and UI JavaScript applications, the Testing Trophy argues for more integration tests because they often give more realistic confidence than isolated tests with many mocks. It presents static analysis as the cheapest layer, followed by unit tests, with the most effort often placed in integration tests and a smaller set of end-to-end tests. Its author describes this model as a product of that application context, not as a universal portfolio for every system.

These positions are less contradictory than they first appear. "Unit" and "integration" have inconsistent definitions. Martin Fowler distinguishes solitary unit tests, which replace collaborators, from sociable unit tests, which use real collaborators. Some tests called "integration tests" in one project would be called sociable unit tests in another.

A better decision rule is:

> Choose the narrowest test that still includes the components whose interaction creates the risk.

Examples:

- Pure business calculation: focused unit test.
- Behavior involving several lightweight in-process collaborators: sociable unit or component test.
- ORM mapping, transaction behavior, serialization, database constraints, or filesystem behavior: integration test with the real relevant dependency.
- External service compatibility: contract test.
- Critical user journey, deployment wiring, or whole-system compatibility: a small number of broad tests.

Google calls the missing ingredient in small tests "fidelity": broader tests are justified when a smaller test cannot represent production behavior accurately enough. Higher fidelity usually brings higher setup, runtime, nondeterminism, and diagnosis costs.

There is no well-supported universal ratio such as 70/20/10. Google offers an approximate 80 percent unit and 20 percent broader-scoped mix as a rule of thumb, while Fowler explicitly notes that lower-level tests are unnecessary when high-level tests are fast, reliable, and cheap to modify. The shape should follow the system and its risks.

Sources:

- [Martin Fowler: Test Pyramid](https://martinfowler.com/bliki/TestPyramid.html)
- [Martin Fowler: The Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html)
- [Martin Fowler: On the Diverse and Fantastical Shapes of Testing](https://martinfowler.com/articles/2021-test-shapes.html)
- [Kent C. Dodds: Write tests. Not too many. Mostly integration.](https://kentcdodds.com/blog/write-tests)
- [Kent C. Dodds: The Testing Trophy and Testing Classifications](https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications)
- [Software Engineering at Google: Larger Testing](https://abseil.io/resources/swe-book/html/ch14.html)
- [Martin Fowler: Contract Test](https://martinfowler.com/bliki/ContractTest.html)

## 5. Mocking is useful at boundaries, but harmful as a default

Test doubles are valuable for:

- Remote services.
- Nondeterministic resources such as clocks and random values.
- Slow or heavyweight operations.
- Dependencies with costly side effects or that cannot be used reliably in tests.
- Failure conditions that are difficult to create with the real dependency.

Excessive mocking replaces the real system with assumptions written by the same developer as the test. Google reports that overused mocking frameworks produced tests that needed constant maintenance while rarely finding bugs. Mocks can also become inconsistent with the real implementation.

A sensible default is:

- Use real, lightweight collaborators inside the tested component.
- Replace external, slow, heavyweight, nondeterministic, or unreliable dependencies.
- Prefer a realistic fake where one exists and can remain contract-compatible.
- Add a contract or integration test where correctness depends on the double matching reality.
- Avoid tests whose main assertion is an exact sequence of internal mock calls unless that interaction itself is the contract.
- Do not mock a dependency merely to make the test qualify as a "unit test."

The solitary and sociable schools of unit testing remain a genuine disagreement. The evidence and practitioner experience support treating mocking as a trade-off rather than a requirement.

Sources:

- [Software Engineering at Google: Test Doubles](https://abseil.io/resources/swe-book/html/ch13.html)
- [Martin Fowler: Unit Test](https://martinfowler.com/bliki/UnitTest.html)
- [Martin Fowler: Mocks Aren't Stubs](https://martinfowler.com/articles/mocksArentStubs.html)

## 6. Coverage finds gaps; it does not prove quality

Coverage shows that code executed. It does not show that the result was checked, that the assertion was meaningful, or that the test would notice a defect.

An ICSE study generated 31,000 test suites for five large Java systems. After controlling for test-suite size, it found only low-to-moderate correlation between statement, decision, or modified condition coverage and mutation-based effectiveness. The authors concluded that coverage is more useful for identifying untested areas than as a quality target.

High coverage can be reached with assertion-free tests, weak assertions, repeated low-value cases, or tests that reproduce implementation details. Low coverage can reveal important gaps, but high coverage does not establish that the suite is effective.

Fowler recommends using coverage to locate untested code and then applying human judgment to whether those gaps matter. Google similarly warns against treating a percentage as the sole source of truth.

Sources:

- [Inozemtseva and Holmes: Coverage Is Not Strongly Correlated with Test Suite Effectiveness](https://www.cs.ubc.ca/~rtholmes/papers/icse_2014_inozemtseva.pdf)
- [Martin Fowler: Test Coverage](https://martinfowler.com/bliki/TestCoverage.html)
- [Google Testing Blog: Code Coverage Best Practices](https://testing.googleblog.com/2020/08/code-coverage-best-practices.html)

## 7. Mutation testing gives a stronger but imperfect signal

Mutation testing deliberately changes production code and checks whether the test suite notices. A surviving mutation indicates that the mutated behavior was not exercised or that the test oracle was too weak.

One ICSE study found that strong mutation testing had higher fault revelation than statement, branch, and weak mutation criteria in the systems it studied. The authors also discuss limits to generalizing that result. Mutation analysis is useful for finding tests that execute code without checking meaningful outcomes.

Mutation testing also has limits:

- It can be computationally expensive.
- Some mutations are equivalent to valid behavior and cannot be killed.
- Mutation operators do not model every real defect.
- An ISSTA study found that some mutants are killed by crashes rather than meaningful assertions.

The practical lesson is not to require mutation testing everywhere. It is to require falsifiability:

> A new test must be capable of failing when its claimed behavior is broken.

For bug fixes, demonstrate that against the unfixed code when practical. For important new behavior, temporarily remove or alter the behavior and confirm that the test fails. Focused mutation testing can audit especially important or suspicious areas.

Sources:

- [An Empirical Study on Mutation, Statement and Branch Coverage Fault Revelation](https://thierry-tct.github.io/pdf/CPA-MFI_ICSE17.pdf)
- [Mutation-Driven Generation of Unit Tests and Oracles](https://www.evosuite.org/wp-content/papercite-data/pdf/tse12_mutation.pdf)
- [To Kill a Mutant: An Empirical Study of Mutation Testing Kills](https://dl.acm.org/doi/10.1145/3597926.3598090)
- [Martin Fowler: Test Coverage](https://martinfowler.com/bliki/TestCoverage.html)

## 8. Redundant tests are not free

Overlapping tests can be justified when they provide different information, such as:

- A broad smoke test proves wiring while a focused test identifies the precise broken rule.
- A contract test verifies that a fake still represents the real provider.
- A focused regression test reproduces a defect first found by a broad test.
- The same high-impact contract is intentionally checked from both provider and consumer perspectives.

Repeating the entire business-rule matrix at unit, integration, and end-to-end levels usually adds maintenance without adding proportionate confidence.

Kent Beck shows how composable tests can cover independent dimensions and one representative composition instead of testing every cross-product. For example, four calculation variants and five output variants may need four calculation tests, five output tests, and one wiring test rather than twenty combination tests.

Fowler treats high-level tests as a second defense, not a repetition of every lower-level case. If a high-level test exposes a bug, he recommends reproducing that bug with a focused test before fixing it.

Before adding a test, search the existing suite and identify the specific gap it fills. Similar names do not prove redundancy; compare the inputs, observable outcome, dependency boundary, and failure the tests can detect.

Sources:

- [Kent Beck: Composable Tests](https://newsletter.kentbeck.com/p/composable-tests)
- [Martin Fowler: Test Pyramid](https://martinfowler.com/bliki/TestPyramid.html)

## 9. Determinism and trust are requirements, not polish

A flaky test sometimes passes and sometimes fails without a relevant code change. Flakiness consumes diagnosis time and teaches engineers to rerun or ignore failures. Once failures are treated as noise, the suite loses its purpose as a decision tool.

Common causes found in empirical studies include asynchronous waiting, concurrency, test-order dependencies, shared state, time, random values, and environmental assumptions.

Tests should therefore:

- Control time and randomness when those are not the behavior under test.
- Avoid mutable state shared across cases.
- Clean up external resources.
- Wait for observable conditions rather than fixed delays.
- Remain independent of test order.
- Produce the same result for the same code and controlled environment.

A flaky test should be fixed, quarantined with clear ownership, or removed from a blocking path until it is reliable. Repeated retries are mitigation, not proof that the test is healthy.

Sources:

- [Kent Beck: Test Desiderata](https://kentbeck.github.io/TestDesiderata/)
- [An Empirical Analysis of Flaky Tests](https://mir.cs.illinois.edu/lamyaa/publications/fse14.pdf)
- [Software Engineering at Google: Testing Overview](https://abseil.io/resources/swe-book/html/ch11.html)

## 10. "Do not test trivial code" needs context

There is genuine disagreement about trivial code.

Robert Martin and Martin Fowler argue against direct tests for simple getters, setters, one-line delegation, and other logic-free code when those operations are already exercised indirectly. Their concern is that such tests provide little additional confidence and add maintenance.

Mark Seemann argues that trivial behavior may later become nontrivial and that TDD tests can still define its contract. He also argues that deciding an implementation is trivial before test-driving it can confuse cause and effect.

The useful synthesis is:

- Do not add a separate test merely because a getter, constructor, property, or delegation method exists.
- Test simple behavior when it is a meaningful public contract, has high impact, has many consumers, or is not already protected by a broader behavioral test.
- A tiny reusable library can justify denser contract coverage than application glue with the same number of lines.
- Judge the risk and contract, not the number of lines.
- Do not use "trivial" as an excuse to leave significant behavior untested.

Sources:

- [Robert Martin: The Pragmatics of TDD](https://blog.cleancoder.com/uncle-bob/2013/03/06/ThePragmaticsOfTDD.html)
- [Martin Fowler: The Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html)
- [Mark Seemann: Test trivial code](https://blog.ploeh.dk/2013/03/08/test-trivial-code/)

## 11. Test-smell rules should remain heuristics

Research reviewing 20 years of test-smell work found that test quality is context-dependent, automated smell detectors rely on imperfect heuristics, and developers often find the rules too strict.

The skill should not blindly impose rules such as:

- One assertion per test.
- Every collaborator must be mocked.
- Every public method needs a test.
- Every branch requires its own test case.
- All duplicated setup must be abstracted.
- Every test smell reported by a tool must be removed.

Instead, judge whether a test:

- Expresses one coherent behavior.
- Makes its important inputs and expectations easy to see.
- Fails clearly enough to diagnose the broken behavior.
- Remains stable when implementation structure changes.
- Adds distinct confidence.

Sources:

- [Test smells 20 years later: detectability, validity, and reliability](https://link.springer.com/article/10.1007/s10664-022-10207-5)
- [Software Engineering at Google: Unit Testing](https://abseil.io/resources/swe-book/html/ch12.html)

## 12. Property-based tests can replace repetitive example matrices

Example-based tests are useful for named business cases, regressions, and documentation. They become inefficient when many inputs should obey the same invariant.

Property-based testing generates inputs and checks a general property such as:

- Encoding and then decoding returns the original value.
- Sorting preserves all elements and produces an ordered result.
- Reversing twice returns the original collection.
- Adding an item changes a total by that item's value.
- A state transition preserves a domain invariant.

A well-chosen property can replace many mechanically similar examples while exploring inputs the author did not anticipate. It does not replace concrete examples when those examples communicate important domain rules. Generated inputs also need realistic constraints, and the asserted property must be independent enough to detect a wrong implementation.

Source:

- [Application of property-based testing tools for metamorphic testing](https://arxiv.org/abs/2211.12003)

## Areas of broad agreement

The sources broadly agree on these points:

1. Tests should prevent regressions and support confident change.
2. Tests should focus on observable behavior at a stable boundary.
3. Fast, deterministic, clear tests provide better feedback than slow or unreliable tests.
4. Broader tests are justified by fidelity, not by ceremony.
5. End-to-end tests should not dominate a suite when cheaper tests can cover the same risks.
6. Coverage percentages do not measure test quality.
7. Excessive mocking creates brittle tests and can hide integration errors.
8. A test suite has continuing maintenance cost.
9. Tests should be capable of detecting the defect they claim to cover.
10. Test categories and ratios are heuristics, not universal laws.

## Genuine disagreements

The skill should make these trade-offs explicit rather than present one side as settled fact.

### Unit-heavy versus integration-heavy portfolios

The classical pyramid emphasizes many focused tests. For browser and UI JavaScript applications, the Testing Trophy emphasizes integration tests because they exercise real collaboration. The right balance depends on architecture, tooling, dependency cost, failure diagnosis, and how each project defines a unit.

### Solitary versus sociable unit tests

Mockist or solitary testing replaces collaborators to isolate a class or function. Classic or sociable testing keeps lightweight real collaborators and replaces awkward boundaries. Both styles can work, but extensive interaction verification has higher coupling and lower fidelity.

### Whether trivial code deserves direct tests

Some practitioners see direct tests of trivial code as waste. Others see them as contracts and part of TDD. Risk, public compatibility, existing indirect coverage, and maintenance cost provide a more useful decision than a blanket rule.

### Fixed portfolio and coverage targets

Some organizations use approximate test mixes or coverage thresholds as prompts. The research strongly cautions against treating them as proof of quality or immutable gates.

## Useful versus ceremonial tests

| Usually useful | Usually ceremonial or unnecessary |
|---|---|
| Protects a business rule, invariant, boundary, contract, or past defect | Exists only to increase test or coverage counts |
| Would fail under a plausible regression | Still passes when the claimed behavior is removed |
| Uses the stable consumer-facing interface | Reads private state or pins helper calls and call order |
| Adds coverage of a distinct risk | Repeats an equivalent scenario already protected elsewhere |
| Uses enough real components to exercise the risky interaction | Mocks both sides of the interaction being "verified" |
| Covers boundaries and representative equivalence classes | Creates one test for every mechanically similar permutation |
| Is deterministic and produces a useful failure | Is flaky, order-dependent, or requires habitual reruns |
| Tests simple code because its contract matters | Tests a getter, constant, or delegation merely because it exists |
| Checks meaningful outputs and side effects | Only checks that execution did not throw or returned something non-null |
| Reproduces a real regression | Speculates about implausible cases without a requirement or risk |
| Uses a property to cover a broad input domain | Copies a long list of examples that all prove the same rule |
| Exercises a real boundary where integration can fail | Re-tests a framework or language guarantee with no project-specific contract |

## Candidate decision gate for the skill

Before an agent adds a test, it should answer:

1. **What behavior or regression does this protect?**
2. **What plausible defect would make it fail?**
3. **What is the impact and likelihood of that defect?**
4. **Is the defect already caught by an existing test or static check?**
5. **What is the narrowest scope that still exercises the risky interaction?**
6. **Does the test observe behavior rather than implementation structure?**
7. **Does the test use realistic collaborators where their behavior matters?**
8. **Can the test's sensitivity be demonstrated?**
9. **Will a failure clearly identify the broken behavior?**
10. **Will its expected confidence justify its maintenance, runtime, and flakiness costs?**

If the agent cannot give concrete answers, it should normally not add the test.

## Candidate rules for agent-generated tests

The research supports these possible instructions for the eventual skill:

- Search existing tests before creating new ones.
- State the distinct behavior, regression, or boundary a new test protects.
- Do not write tests merely because production code was added or changed.
- Do not write one test per method, branch, or line by default.
- Prefer observable state and outputs over private state or interaction sequences.
- Choose the smallest scope that preserves enough fidelity for the risk.
- Use real lightweight collaborators by default; replace awkward boundaries deliberately.
- Do not repeat a full edge-case matrix at multiple test levels.
- Use representative partitions, boundary cases, or properties instead of mechanical permutations.
- For a bug fix, show that the regression test fails against the defect and passes with the fix when reproducible.
- For important new behavior, verify that the test can fail when that behavior is removed or altered.
- Use coverage to investigate gaps, not to justify low-value tests.
- Do not weaken assertions, delete meaningful cases, or skip failures merely to make the suite pass.
- Treat flaky tests as defects in the feedback system.
- Keep deliberate overlap only when each test supplies different confidence or diagnosis.
- Report what was run, what passed, what failed, and what was not run.

## Key sources

### Practitioner and industry guidance

- [Software Engineering at Google: Testing Overview](https://abseil.io/resources/swe-book/html/ch11.html)
- [Software Engineering at Google: Unit Testing](https://abseil.io/resources/swe-book/html/ch12.html)
- [Software Engineering at Google: Test Doubles](https://abseil.io/resources/swe-book/html/ch13.html)
- [Software Engineering at Google: Larger Testing](https://abseil.io/resources/swe-book/html/ch14.html)
- [Martin Fowler: Test Pyramid](https://martinfowler.com/bliki/TestPyramid.html)
- [Martin Fowler: The Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html)
- [Martin Fowler: Test Coverage](https://martinfowler.com/bliki/TestCoverage.html)
- [Martin Fowler: Unit Test](https://martinfowler.com/bliki/UnitTest.html)
- [Martin Fowler: Contract Test](https://martinfowler.com/bliki/ContractTest.html)
- [Kent Beck: Test Desiderata](https://kentbeck.github.io/TestDesiderata/)
- [Kent Beck: Composable Tests](https://newsletter.kentbeck.com/p/composable-tests)
- [Kent C. Dodds: Write tests. Not too many. Mostly integration.](https://kentcdodds.com/blog/write-tests)
- [Kent C. Dodds: Testing Implementation Details](https://kentcdodds.com/blog/testing-implementation-details)
- [Archived xUnit Test Patterns draft: Goals of Test Automation](http://xunitpatterns.com/Goals%20of%20Test%20Automation.html)

### Empirical research

- [Coverage Is Not Strongly Correlated with Test Suite Effectiveness](https://www.cs.ubc.ca/~rtholmes/papers/icse_2014_inozemtseva.pdf)
- [An Empirical Study on Mutation, Statement and Branch Coverage Fault Revelation](https://thierry-tct.github.io/pdf/CPA-MFI_ICSE17.pdf)
- [Mutation-Driven Generation of Unit Tests and Oracles](https://www.evosuite.org/wp-content/papercite-data/pdf/tse12_mutation.pdf)
- [To Kill a Mutant: An Empirical Study of Mutation Testing Kills](https://dl.acm.org/doi/10.1145/3597926.3598090)
- [An Empirical Analysis of Flaky Tests](https://mir.cs.illinois.edu/lamyaa/publications/fse14.pdf)
- [Test smells 20 years later](https://link.springer.com/article/10.1007/s10664-022-10207-5)
- [Application of property-based testing tools for metamorphic testing](https://arxiv.org/abs/2211.12003)

## Research cautions

- Much testing guidance is based on experienced practitioner judgment rather than controlled experiments.
- Terms such as "unit," "integration," and "end-to-end" are used inconsistently. Scope, dependencies, fidelity, runtime, and isolation are more precise descriptions.
- Coverage and mutation studies measure proxies for real defects and have limits on generalization.
- Test-smell detectors should not be treated as objective measures of maintainability.
- Fixed test ratios are heuristics, not research-backed universal targets.
- Advice should be adapted for system criticality. Safety-critical and widely consumed libraries may justify tests that would be excessive for low-risk application glue or short-lived scripts.
