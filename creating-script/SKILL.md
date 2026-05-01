---
name: creating-script
description: >
  Guidelines for short-lived TypeScript admin, data-fix, backfill, export, and
  batch scripts in `~/Work/hr-manager-dev/hr-manager-service`, mainly under
  `scripts/`. Use when planning, creating, modifying, refactoring, or reviewing
  those scripts. Prefer existing repo patterns first. Ask with `question` when
  scope, config, or output is unclear. Triggers on: "create script",
  "new script", "data fix", "backfill", "export script", "one-off script",
  "scripts/".
---

# Creating Script

Use only in `~/Work/hr-manager-dev/hr-manager-service` for short-lived TypeScript scripts under `scripts/`.

Do not use it for:

- long-running `bin/` workers or servers
- migration object files under `scripts/migrations/`
- shell scripts

For those, inspect the nearest existing pattern and follow it.

## First Move

First: spawn an `explore` sub-agent.

Have it find:

- the nearest similar script
- relevant entities, data sources, services, and helpers
- existing organization and employee loading logic
- existing output and export helpers
- existing bootstrap and database access patterns

Do not design the script blind. Reuse the closest existing pattern.

## Clarify First

If any of these are unclear, use the `question` tool before implementing:

- organization scope
- employee scope
- required configuration
- output format

Do not guess.

## Choose Shape

Prefer the smallest shape that fits.

Place the script where it fits best under `scripts/`.

Prefer the nearest existing thematic folder. If multiple files are needed, create the folder there.

For small scripts, a single file is fine.

For non-trivial org or employee batch scripts, prefer:

```text
scripts/<script-name>/
  index.ts
  load-targets.ts
  output.ts
```

Add `apply-changes.ts` when write execution is non-trivial.

Responsibilities:

- `index.ts`: orchestrate only
- `load-targets.ts`: determine and load the relevant organizations and employees
- `apply-changes.ts`: translate and apply a planned change set using explicit dependencies
- `output.ts`: logging and exports

Do not split files unless the complexity justifies it.

## Bootstrap Pattern

Prefer existing repo wrappers and helpers before hand-rolling setup.

For scripts that use the standard hr-manager-service DB setup, prefer this shape:

- initialize MikroORM with `runMigrations: false`
- initialize Mongoose
- run the main async function in `try`
- log top-level errors
- close resources in `finally`
- exit with the correct status code

Short-lived scripts should clean up connections.

## `index.ts`

At the top of `index.ts`:

- add a short comment block with the run command
- put the config section directly below it

Show a directly copyable run command:

`npx ts-node scripts/<script-name>/index.ts`

Prefer `tee` examples with `$(date +%Y%m%d-%H%M%S)` in the log filename so logs are timestamped per run.

Default to in-file config, not fancy CLI flags.

Do not add `--config`, `--output`, `--verbose`, `--dry-run`, or similar flags unless the user explicitly asks or the script clearly needs them.

Use:

- a few simple `const`s for small scripts
- a typed `config` object for multiple related options

Put relevant values near the top:

- organization IDs
- employee IDs
- when writes can stamp audit fields like `editorId`, define a short stable script identifier near the top, such as `scriptId`, and reuse it so the change can be traced back to this script; keep it 24 chars or fewer because `editorId`-style fields are often treated like Mongo IDs
- feature-flag filters
- dry-run or live-execution behavior
- batch size
- concurrency
- output paths or filenames
- task-specific filters or limits

Main flow:

- keep `index.ts` focused on orchestration
- initialize only the dependencies the script needs
- make major script phases visible with concise progress logs
- call `load-targets.ts` when target loading is non-trivial
- run the main script logic in its own async function
- use a concise task-specific function name
- call `apply-changes.ts` when live write execution is non-trivial
- call `output.ts` when output is non-trivial

For non-trivial or risky scripts that write data, prefer building a change set before applying any writes.

Here, `change set` is a script-level concept, not a project-wide convention. Use it to mean small snippets that describe exactly what should change where so they can be collected, reviewed, and executed later. Let the exact shape vary with the script, entities, and write logic.

- build the change set with side-effect-free logic
- do not compute and write in the same loop when this pattern is used
- reuse the same planned changes for dry-run, review, and live execution
- default to dry-run until live execution is explicitly enabled
- log or export a concise summary of the planned changes before applying them
- make that review output follow the logging or export approach chosen for the script
- when the apply step is non-trivial, move datastore-specific write logic into `apply-changes.ts`
- let `apply-changes.ts` translate the change set into datastore operations and execute them
- pass the change set and required data sources, services, or database handles into `apply-changes.ts` explicitly
- include enough information in each change-set item to review and apply it safely
- use `bulkWrite` when many changes share the same write shape
- otherwise apply the change set in a loop or bounded batches, using transactions when they fit

Do not put target-loading, write-execution, or output-formatting logic here when those deserve their own files.

## `load-targets.ts`

- own target scope and loading
- load only the data needed for the task
- return structured target data to `index.ts`
- accept explicit inputs from `index.ts`
- pass services, data sources, database handles, and target-related config in explicitly

Prefer explicit inputs over implicit config access.

Document the main exported function with a short `/** */` comment.

## `apply-changes.ts`

- own datastore-specific translation and live execution of the planned change set
- accept the change set and explicit dependencies from `index.ts`
- pass data sources, services, database handles, and apply-related config in explicitly
- keep dry-run checks and review output in `index.ts` or `output.ts`, not here

Prefer explicit inputs over implicit config access.

Document the main exported function with a short `/** */` comment.

## `output.ts`

- own non-trivial logging and exports
- keep output formatting out of `index.ts`

Defaults:

- prefer `console.log`, `console.info`, `console.warn`, and `console.error` for script logging
- do not use a custom logger, logging abstraction, or logging framework in these scripts
- use normal stdout logging when plain logs are enough
- log the major steps the script runs through so progress is visible during execution
- when the script skips a target, record, or planned change, log that it was skipped and why
- when catching an error to continue or add context, log the failure with enough detail to identify the affected target or step
- do not swallow skips or caught errors silently
- prefer Excel when the script needs a structured export file

When exporting organization and employee data to Excel, prefer identifiers and human-readable fields together.

- for organizations, include `organizationId` and organization name
- for employees, include `employeeId`, employee name, and `staffNumber`

Document the main exported function with a short `/** */` comment.

## Documentation

Document only non-trivial created functions.

Use short `/** */` comments. No JSDoc tags like `@param`, `@returns`, or `@throws`.

In `index.ts`, add short inline comments only when they help a reviewer follow phases like initialization, target loading, processing, output, or cleanup.

Do not comment obvious lines.

## Review Checklist

After implementing the script, review it against this checklist.

Base checks:

- repo pattern reused before inventing a new one
- script shape kept as small as possible
- run command shown at the top of `index.ts`
- config kept near the top
- unclear scope, config, or output resolved with `question`
- scope, config, and output are explicit and reviewable
- target scope is constrained to the intended organizations or employees
- target loading extracted when non-trivial
- output logic extracted when non-trivial
- logging uses `console.*` statements, not a custom logger or logging abstraction
- logs make the script's major steps, skips, and caught failures visible for human review
- output or logs are understandable for human review
- cleanup and exit behavior fit a short-lived script

For mutating scripts:

- live writes are disabled by default until explicitly enabled
- planned changes can be reviewed before live execution
- if the script uses a change set, planning and review stay side-effect-free and nothing mutates outside the apply phase
- the apply path is isolated and uses an execution strategy that fits the write shape and risk level
- partial failures are visible in logs or output and do not hide what did or did not apply
- database connections and other resources still close cleanly on success and failure
- re-running is safe, or the script clearly says it is intentionally one-time
