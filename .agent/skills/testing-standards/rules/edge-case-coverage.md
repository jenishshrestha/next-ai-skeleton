---
title: Edge Case Coverage
impact: MEDIUM
impactDescription: Prevents production regressions from untested error and boundary conditions.
tags: testing, coverage, edge-cases
---

## Edge Case Coverage

Every test suite should cover at minimum these four paths. Missing any of these is a gap in test quality.

### Required Paths

1. **✅ Happy Path** — Expected input produces expected output.
2. **❌ Error Path** — API returns an error, function throws, network times out.
3. **🫙 Empty State** — Input is `null`, `undefined`, `[]`, or `{}`.
4. **⏳ Loading State** — (For async functions) The pending/intermediate state.

**Incorrect (Only happy path):**

```typescript
describe('fetchUsers', () => {
  it('returns users', async () => {
    const users = await fetchUsers();
    expect(users).toHaveLength(3);
  });
  // ← No error test, no empty test
});
```

**Correct (Full coverage):**

```typescript
describe('fetchUsers', () => {
  it('returns users on success', async () => {
    const users = await fetchUsers();
    expect(users).toHaveLength(3);
  });

  it('throws on network error', async () => {
    mockNetworkError();
    expect(fetchUsers()).rejects.toThrow('Network error');
  });

  it('returns empty array when no users exist', async () => {
    mockEmptyResponse();
    const users = await fetchUsers();
    expect(users).toEqual([]);
  });
});
```
