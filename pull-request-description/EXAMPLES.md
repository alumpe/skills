# Pull Request Description Examples

Choose the shortest style that fully explains the pull request. The examples
are grouped by the scope and kind of change.

## Small, focused change

Use this style for a small change that can be explained in one or two
sentences. State the problem or need, then describe the fix concisely.

### Example

> Empty employee export files did not include the CSV header, so other systems
> rejected them.
>
> This change writes the header even when the export contains no employee rows.

## Bug fix with context

Use this style when the problem and fix need more detail than two short
sentences. Use two sections: what went wrong and how the change fixes it.

### Example

> ## Problem
>
> When an employee's final saved value for a field was deleted, the
> `employee_fields` event did not include the field. Services that read the event
> treat a missing field as unchanged, so they could keep outdated data.
>
> ## Solution
>
> Deletion events now include the names of removed fields. The publisher sends
> another saved value if one still applies, or `value: null` if the field has no
> value left.

## Tooling or configuration change

Use this style when a setup change requires updates in several files. Explain
why the change is needed, then list the exact updates.

### Example

> The PDF viewer loaded its worker from a third-party CDN while the application
> was running. This made local and deployed environments depend on an external
> file. The application now includes the worker in its own build.
>
> - Load the worker from `pdfjs-dist`.
> - Configure Webpack to include it as a versioned file.
> - Add the TypeScript declaration and Jest setting needed for the import.

## Refactor across many files

Use this style for the same type of change repeated across many files. State the
main goal, group the work by area, and say whether runtime behavior changes.

### Example

> This change enables `@typescript-eslint/no-explicit-any` as an error and
> replaces all explicit `any` annotations with specific types, `unknown`, or
> generic constraints.
>
> ## Changes by area
>
> - **API types:** Add clear request, response, and error types.
> - **Data services:** Type results with shared application interfaces.
> - **Utilities:** Accept `unknown` values and check their type before using
>   them.
> - **Test helpers:** Add types to mocks and spies without making application
>   types less strict.
>
> Runtime behavior does not change. The linter can now find new `any`
> annotations, and the code shows the expected types directly.

## Larger behavior change

Use this style when several rules or fallback cases are part of the change.
Start with the purpose, list the key behavior, and finish with anything existing
users need to know.

### Example

> ## Summary
>
> Local schema composition used only subgraphs that were already published to
> the schema registry. This meant developers could not use a new local service
> before publishing it. The command now also includes a running local service
> when its introspection endpoint returns a schema for the requested graph.
>
> ## Behavior
>
> - Published subgraphs are still used by default.
> - A local schema replaces a published schema only when their service names
>   match.
> - If a local service is not running, its published schema is used.
> - If a local service reports an unknown name, the command skips it and shows a
>   warning instead of guessing.
>
> ## Compatibility
>
> No configuration changes are needed. If no additional local service is
> running, composition works as before.

## Complex bug fix

Use this style when reviewers need steps to reproduce the problem or an
explanation of why the fix works this way. Include only the sections needed to
understand the problem and fix.

### Example

> ## Problem
>
> Running `createMissingDefaultInstances` again reset saved surcharge settings
> to the default value. Actions such as changing a feature flag could call this
> function again and change a user-selected `no` to `yes`.
>
> ## How to reproduce
>
> Set a surcharge to `no` in a payroll-disabled organization, then run
> `createMissingDefaultInstances`. The value changes back to `yes`.
>
> ## Fix
>
> Load the saved surcharge settings before writing defaults. Write a default
> only when no non-null value exists.
>
> ## Why this approach
>
> Checking for a saved value just before the write keeps the values users chose
> while still setting defaults for new surcharges. The default rules do not
> change.

## Remove old or temporary code

Use this style when temporary code or old code paths are no longer needed after
a migration or release. Explain why they can now be removed, list the main
changes, and note any work that will happen later.

### Example

> The contract-data migration is complete, and all organizations now use the
> new behavior. This change removes the three related feature flags and the old
> code paths they controlled.
>
> ## Main changes
>
> - Delete the old database fallback from contract resolvers.
> - Remove the old rescheduling path and its migration checks.
> - Remove duplicate flag-on and flag-off tests, keeping the tests for the
>   current production behavior.
>
> ## Remaining work
>
> The old feature-flag records will be removed from the database in a separate
> task.

## Public API change

Use this style when adding or changing an API that other developers call. Show
how to use it, then explain the defaults and whether existing code must change.

### Example

> This change adds a `visualLevel` prop to `Headline`, so the HTML heading level
> and the displayed size can be different.
>
> ```tsx
> <Headline level={2} visualLevel={4}>
>   Renders as an h2 and looks like an h4
> </Headline>
> ```
>
> `level` still selects the rendered `h1`–`h6` element. `visualLevel` changes
> only the styling. If it is not set, it uses `level`, so existing code needs no
> changes.

## Data migration or staged rollout

Use this style when a change updates saved data or needs steps done in a
specific order. Explain which data changes, the order of the steps, and whether
the migration can be restarted safely.

### Example

> ## Summary
>
> Workspace assignment dates are stored in several older string formats. This
> change adds a migration that converts valid values to ISO dates.
>
> ## Data changes
>
> - Convert supported date strings to `YYYY-MM-DD`.
> - Leave existing ISO dates and null values unchanged.
> - Skip invalid values and include their record IDs in the migration report.
>
> ## Rollout
>
> 1. Deploy the application version that reads both old and ISO formats.
> 2. Run the migration for each workspace.
> 3. Remove support for the old date formats in a later pull request.
>
> ## Running the migration
>
> The migration can run more than once. If a run stops, the next run starts with
> the first unfinished workspace.

## Front-end visual change

Use this style when a visible interface change is easier to understand with
images. Show before and after screenshots when changing an existing interface.
For a new interface, show only the result. When drafting without the images,
leave clear placeholders that say what each screenshot should show.

### Example: Change to an existing interface

> This change moves the employee profile actions into an overflow menu on
> smaller screens, so the header no longer wraps onto a second line. The desktop
> layout does not change.
>
> ## Before
>
> _Add a screenshot of the previous employee profile header on a small screen._
>
> ## After
>
> _Add a screenshot of the updated employee profile header on a small screen._

### Example: New interface

> This change adds a confirmation dialog before a schedule is published. The
> dialog shows the number of shifts and warns when some shifts have no assigned
> employee.
>
> ## Screenshot
>
> _Add a screenshot of the new schedule confirmation dialog._
