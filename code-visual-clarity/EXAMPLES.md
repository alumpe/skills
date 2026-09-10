# TypeScript Visual Spacing Examples

These examples isolate vertical spacing. The before versions already use clear names and braces; they still need polishing. Preserve existing expression choices when spacing alone addresses the problem.

## 1. Separate declarations, guards, and the normal path

Each guard is a separate visual unit, even within one validation phase. Do not keep a lookup attached to its guard.

Before:

```ts
const account = await findAccount(id);
if (!account) {
  throw new NotFoundError(id);
}
if (!account.enabled) {
  return [];
}
const entries = await loadEntries(account);
return entries;
```

After:

```ts
const account = await findAccount(id);

if (!account) {
  throw new NotFoundError(id);
}

if (!account.enabled) {
  return [];
}

const entries = await loadEntries(account);

return entries;
```

## 2. Separate multiline units; group related short declarations

Multiline declarations get breathing room even when their neighbors belong to the same calculation. Range endpoints and summary metrics remain compact pairs.

Before:

```ts
const start = range.start;
const end = range.end;
const activeEntries = entries.filter((entry) => {
  return entry.enabled && overlaps(entry, start, end);
});
const total = sumAmounts(activeEntries);
const count = activeEntries.length;
```

After:

```ts
const start = range.start;
const end = range.end;

const activeEntries = entries.filter((entry) => {
  return entry.enabled && overlaps(entry, start, end);
});

const total = sumAmounts(activeEntries);
const count = activeEntries.length;
```

The same boundary applies to multiline object initializers and standalone calls. Do not pad their individual properties or arguments:

```ts
const now = clock.now();

const event = {
  accountId: account.id,
  occurredAt: now,
  type: "disabled",
};

await eventStore.append(
  account.id,
  event,
  expectedVersion,
);

logger.info("Account disabled");
```

## 3. Separate final returns, even in short bodies

Before:

```ts
function getTotal(entries: Entry[]) {
  const total = sumAmounts(entries);
  return roundCurrency(total);
}

const totals = groups.map((group) => {
  const total = sumAmounts(group.entries);
  return roundCurrency(total);
});
```

After:

```ts
function getTotal(entries: Entry[]) {
  const total = sumAmounts(entries);

  return roundCurrency(total);
}

const totals = groups.map((group) => {
  const total = sumAmounts(group.entries);

  return roundCurrency(total);
});
```

A return-only body stays compact; do not expand it with empty lines:

```ts
function getName(user: User) {
  return user.name;
}
```

## 4. Group small mutations; separate distinct effects

Before:

```ts
account.enabled = false;
account.disabledAt = now;
await repository.save(account);
await sendDisabledNotification(account);
```

After:

```ts
account.enabled = false;
account.disabledAt = now;

await repository.save(account);

await sendDisabledNotification(account);
```

Do not insert a blank line between the two assignments. They jointly update the account's disabled state. Saving and notifying are distinct operations, despite belonging to the same business workflow.

## 5. Separate completed blocks, not attached branches

Before:

```ts
const pending: Entry[] = [];
for (const entry of entries) {
  if (entry.ready) {
    pending.push(entry);
  } else {
    recordSkipped(entry);
  }
}
await saveEntries(pending);
return pending.length;
```

After:

```ts
const pending: Entry[] = [];

for (const entry of entries) {
  if (entry.ready) {
    pending.push(entry);
  } else {
    recordSkipped(entry);
  }
}

await saveEntries(pending);

return pending.length;
```

Keep `} else {` together and do not add padding inside the loop's braces. The same attachment rule applies to `catch` and `finally`.
