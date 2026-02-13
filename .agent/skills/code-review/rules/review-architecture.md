---
title: Architectural Scrutiny (FDD)
impact: CRITICAL
impactDescription: Prevents modular decay and maintenance nightmares.
tags: architecture, code-review, fdd
---

## Architectural Scrutiny (FDD)

Verify that the code adheres to **Feature-Driven Design**. Ensure features are isolated and communication happens only through public APIs.

**Incorrect Finding:**

> **Location**: `src/features/profile/page.tsx`
> **Finding**: You are importing an internal helper from the auth feature directly.
> **Suggested Improvement**: Import from `@/features/auth` instead.

**Correct Finding (Standardized):**

> **Location**: `src/features/profile/page.tsx:L12`
> **Finding**: Leaky import detected. The `InternalAuthHelper` is being accessed from the `lib` folder of the auth feature.
> **Suggested Improvement**: Export the necessary function from `src/features/auth/index.ts` and import from the feature root.
> **Rationale**: Maintains feature isolation and prevents circular dependencies.
