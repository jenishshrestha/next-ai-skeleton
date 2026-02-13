---
title: Strict Typing in Tests
impact: CRITICAL
impactDescription: Prevents type-safety regression and hidden bugs.
tags: typescript, quality, any
---

## Strict Typing in Tests

Never use `any` in test files. Using `any` defeats the purpose of TypeScript and can hide breaking changes in the underlying code.

**Incorrect (Using any):**

```typescript
it('fetches data', async () => {
  const result: any = await fetchData();
  expect(result.someProperty).toBe(true);
});
```

**Correct (Proper Typing):**

```typescript
import { UserResponse } from '../types';

it('fetches data', async () => {
  const result: UserResponse = await fetchData();
  expect(result.someProperty).toBe(true);
});
```

If a type is truly unknown and cannot be imported, use `unknown` and perform type guarding before access.
