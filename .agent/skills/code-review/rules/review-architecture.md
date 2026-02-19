---
title: Architectural Scrutiny (FDD)
impact: CRITICAL
impactDescription: Prevents modular decay and maintenance nightmares.
tags: architecture, code-review, fdd
---

## Architectural Scrutiny (FDD)

Verify that the code adheres to **Feature-Driven Design**. Check against these rules:

- `locality-co-location` — Is the code co-located in its feature folder (including tests)?
- `api-boundary` — Are all inter-feature imports going through `index.ts`?
- `server-client-boundary` — Is `'use client'` pushed to the smallest leaf component?
- `shared-component-organization` — Are shared components in the correct sub-directory (`ui/`, `layouts/`, `providers/`)?
- `shared-global-move` — Is anything being promoted to shared prematurely (used by <3 features)?

**Incorrect Finding:**

> **Finding**: This import looks wrong.

**Correct Finding (Standardized):**

> **📍 Location**: `src/features/profile/page.tsx:L12`
> **Finding**: 🟡 Leaky import detected. `InternalAuthHelper` is being accessed from the `lib/` folder of the auth feature.
> **Suggested Improvement**: Export the necessary function from `src/features/auth/index.ts` and import from the feature root.
> **Rationale**: Maintains feature isolation and prevents circular dependencies.
