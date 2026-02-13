---
title: Public API with index.ts
impact: HIGH
impactDescription: Prevents circular dependencies and stabilizes internal APIs.
tags: encapsulation, naming, fdd
---

## Public API with index.ts

Every feature MUST have an `index.ts` file that acts as its public portal. Export ONLY what is necessary for other features to consume.

**Incorrect (Deep internal imports):**

```typescript
import { InternalHelper } from '@/features/auth/lib/internal-helper';
```

**Correct (Importing from the public API):**

```typescript
// src/features/auth/index.ts
export { useAuth } from './hooks/use-auth';

// src/features/profile/page.tsx
import { useAuth } from '@/features/auth';
```
