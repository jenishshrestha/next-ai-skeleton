---
title: Promoting to Shared
impact: MEDIUM
impactDescription: Prevents premature abstraction and keeps feature code focused.
tags: abstraction, shared, infrastructure
---

## Promoting to Shared

Do not move feature code to `src/shared` prematurely. Only promote a component or utility to the shared layer if it is used by at least **three** different features.

**Incorrect (Moving too early):**

```typescript
// Component only used in 'auth' feature, but placed in shared
src / shared / components / auth - button.tsx;
```

**Correct (Keeping it local):**

```typescript
// Keeping it local until shared logic is required
src / features / auth / components / auth - button.tsx;
```
