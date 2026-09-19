# TypeScript Visual Spacing Examples

These examples isolate vertical spacing. They use clear names and braces so the
intended spacing stands out. Preserve existing expression choices when spacing
alone addresses the problem.

## 1. Separate declarations, guards, and the normal path

Each guard is a separate visual unit, even within one validation phase. Do not keep a lookup attached to its guard.

Example:

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

Example:

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

## 3. Keep short return preparation compact

A short declaration that only prepares the final return can stay beside it.
Separate the return after a control-flow block, a standalone effect, a multiline
statement, or a longer preparation phase.

Example:

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

A return-only body also stays compact; do not expand it with empty lines:

```ts
function getName(user: User) {
  return user.name;
}
```

## 4. Group small mutations; separate distinct effects

Example:

```ts
account.enabled = false;
account.disabledAt = now;

await repository.save(account);

await sendDisabledNotification(account);
```

Do not insert a blank line between the two assignments. They jointly update the account's disabled state. Saving and notifying are distinct operations, despite belonging to the same business workflow.

## 5. Separate completed blocks, not attached branches

Example:

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

## 6. Separate setup, action, and checks in tests

Related setup statements belong together. Give the action its own block, then
keep related checks together. Empty lines make these phases clear without
section comments.

Example:

```ts
it("disables the account", async () => {
  const account = createAccount();
  await repository.save(account);

  const result = await service.disable(account.id);

  expect(result.enabled).toBe(false);
  expect(sendDisabledNotification).toHaveBeenCalledWith(account);
});
```

## 7. Separate the main parts of a React component

Keep related state and derived values together. Separate effects, local event
handlers, and returned JSX when they form distinct parts of the component.

Example:

```tsx
function AccountList({ accounts, onSelect }: Props) {
  const [query, setQuery] = useState("");
  const visibleAccounts = accounts.filter(matchesQuery(query));

  useEffect(() => {
    analytics.track("account_search", { query });
  }, [query]);

  const handleSelect = (account: Account) => onSelect(account.id);

  return (
    <>
      <SearchInput value={query} onChange={setQuery} />
      <AccountTable accounts={visibleAccounts} onSelect={handleSelect} />
    </>
  );
}
```
