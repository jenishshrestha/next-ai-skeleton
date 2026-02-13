---
title: Feature Locality for Tests
impact: MEDIUM
impactDescription: Ensures code and its verification stay in sync.
tags: architecture, organization, fdd
---

## Feature Locality for Tests

Tests MUST live in the same feature folder they verify. Do not create a global `tests/` directory at the project root for feature-specific logic.

**Incorrect (Global tests folder):**

```
src/
  tests/
    user-actions.test.ts
  features/
    users/
      actions.ts
```

**Correct (Co-located tests):**

```
src/
  features/
    users/
      actions.ts
      actions.test.ts
```
