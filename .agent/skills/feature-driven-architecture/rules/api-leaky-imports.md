---
title: Leaky Imports
impact: HIGH
impactDescription: Prevents modular breakdown and tight coupling.
tags: architecture, encapsulation, fdd
---

## Leaky Imports

Never import from the deep internals of another feature. All inter-feature communication must pass through the target feature's public API (`index.ts`).

**Incorrect (Leaking internals):**

```typescript
import { formatAuthDate } from '@/features/auth/lib/format-date';
```

**Correct (Standardized access):**

```typescript
// src/features/auth/index.ts
export { formatAuthDate } from './lib/format-date';

// src/features/profile/page.tsx
import { formatAuthDate } from '@/features/auth';
```
