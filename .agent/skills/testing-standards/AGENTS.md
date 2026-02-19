# AI Agent: Testing Instructions

When writing or refactoring unit tests, follow this workflow in order.

## Step 1: Understand the Source

Before writing a test, study the source file:

- Read the function/component's type signature and return type.
- Search for existing type definitions in the feature's `types/` folder or `src/shared/types/`.
- Use `import type` for type-only imports to keep the runtime lean.

## Step 2: Scaffold the Test

- Co-locate the test file next to the source: `actions.ts` → `actions.test.ts`.
- Use `bun:test` exclusively. Do not use Jest, Vitest, or other frameworks.
- Write descriptive `describe` and `it` blocks that read like documentation.

```typescript
import { describe, expect, it, mock } from 'bun:test';
```

## Step 3: Type-Safe Mocking

- Use `mock.module` for infrastructure/external modules.
- Use `mock()` for function-level dependencies.
- Ensure the mock's parameters match the real function's signature **exactly**.
- **Never** use `any` in mock signatures. Use the real type or `unknown` with a type guard.

```typescript
import type { Config } from './types';

const myMock = mock((arg: Config) => 'value');

mock.module('./api', () => ({
  fetchData: myMock,
}));
```

## Step 4: Cover Edge Cases

Every test suite should cover at minimum:

- ✅ **Happy path** — expected input produces expected output.
- ❌ **Error path** — what happens when the API returns an error, throws, or times out?
- 🫙 **Empty state** — what happens with `null`, `undefined`, `[]`, or `{}`?
- ⏳ **Loading state** — if the function is async, test the pending state.

## Step 5: Assert Clearly

- Prefer `toEqual` for object comparisons and `toBe` for primitives.
- Avoid generic `toBeTruthy()` — be specific about what you expect.
- If a function should throw, use `toThrow()` with the expected message.

## Zero-Tolerance Policy

- You are **strictly prohibited** from using the `any` keyword in test files.
- If you encounter existing `any` usage, your **first task** is to refactor it to use proper types or `unknown`.
