---
title: Mocking Strategy
impact: HIGH
impactDescription: Decouples tests from external infrastructure and side effects.
tags: mocking, infrastructure, isolation
---

## Mocking Strategy

Use `mock.module` for infrastructure/external modules and `mock()` for function-level dependencies. Ensure mocks stay type-safe by avoiding `any` in signatures.

**Incorrect (Brittle mocking or any):**

```typescript
const myMock = mock((arg: any) => 'value');
```

**Correct (Type-safe mocking):**

```typescript
import { Config } from './types';

const myMock = mock((arg: Config) => 'value');

mock.module('./api', () => ({
  fetchData: myMock,
}));
```
