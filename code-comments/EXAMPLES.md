# Examples

Positive examples of comments worth writing, per the rules in
[SKILL.md](SKILL.md). These are illustrative snippets with assumed domain
contracts; ticket IDs are fictional. Verify equivalent claims in real code.

## Inline comments

### Explaining why — reuse a payment key

The comment explains why key creation belongs outside the retried callback.
Assume the provider deduplicates requests with the same key throughout the
retry window.

```typescript
// Reuse one key across attempts so retries identify the same
// payment rather than a new charge.
const idempotencyKey = crypto.randomUUID();

await withRetry(() => charge(payment, { idempotencyKey }), {
  attempts: 2,
});
```

### Explaining ordering and precedence

Each comment states a decision a reader cannot infer from the calls alone:
why the fetch order matters, and why remote wins the merge.

```typescript
export async function syncTimesheets(date: Date) {
  // Fetch remote first so a slow provider call
  // can't hold a stale local snapshot.
  const remote = await provider.fetchTimesheets(date);
  const local = await db.timesheets.forDate(date);

  // Keyed on employeeId + day, remote wins because
  // the provider is the source of truth.
  const merged = mergeByKey(local, remote, timesheetKey);

  await db.timesheets.replaceAll(merged);

  return { updated: merged.length };
}
```

### Orienting readers through an algorithm

An overview connects the phases into one idea rather than explaining each
statement separately.

```typescript
// Build balances from the opening snapshot, then replay
// adjustments in timestamp order to reconstruct the closing state.
const balances = new Map(openingBalances);
const orderedAdjustments = [...adjustments].sort(compareTimestamps);

for (const adjustment of orderedAdjustments) {
  applyAdjustment(balances, adjustment);
}
```

### Stating an external constraint — keep in sync

The comment records a maintenance dependency not apparent from the list itself.

```typescript
// Keep in sync with the scripts block in package.json.
export const commandNames = [
  "build",
  "test",
  "lint",
] as const;
```

### Workaround with ticket and removal condition

Names the ticket, what the workaround does, and when it can be deleted —
the pattern that makes cleanup possible.

```typescript
// WORKAROUND(API-1234): the v2 endpoint repeats events across
// pages. Remove deduplication once the fix is deployed to the
// provider environment this client uses.
const events = dedupeBy(await fetchEvents(cursor), (e) => e.id);
```

## Doc comments

### Contract the signature cannot show

Units, tax treatment, and the error mode are invisible in the type signature;
the doc comment is where they live.

```typescript
/**
 * Returns the price in cents, excluding tax.
 * Throws if the product has no active price
 * for the given currency.
 */
function unitPrice(
  product: Product,
  currency: Currency,
): number;
```

### Brief function doc — scope plus caller rule

States what the function is for and who owns the destination's lifecycle. No
`@param` or `@returns` boilerplate.

```typescript
/**
 * Writes the report as CSV to the destination stream.
 * Leaves the stream open. The caller is responsible for closing it.
 */
export function writeReport(
  report: Report,
  destination: Writable,
): Promise<void>;
```

### Module-level doc — responsibility and scope

Placed at the top of the module file, this describes the module as a whole
and distinguishes its responsibilities from the caller's.

```typescript
/**
 * Converts provider timesheets into payroll entries.
 * Normalizes dates and rounding. Persistence belongs to the caller.
 */
```

### One-line doc on a helper — one non-inferable fact

The name says what it checks; the doc line adds the single fact the signature
cannot show.

```typescript
/** True when the subscription covers the whole period, ignoring proration. */
function coversPeriod(
  subscription: Subscription,
  period: DateRange,
): boolean;
```
