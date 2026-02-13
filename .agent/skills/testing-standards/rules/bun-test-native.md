---
title: Bun-Native Testing
impact: HIGH
impactDescription: Zero overhead, blazing fast execution.
tags: bun, testing, performance
---

## Bun-Native Testing

Use `bun:test` exclusively. Do not install or use Jest, Vitest, or other testing frameworks. Bun's built-in test runner is faster and integrated directly into our environment.

**Incorrect (Mixed frameworks):**

```typescript
import { describe, it } from 'vitest';
// or using global describe from non-bun runners
```

**Correct (Bun-native):**

```typescript
import { describe, expect, it, mock } from 'bun:test';
```
