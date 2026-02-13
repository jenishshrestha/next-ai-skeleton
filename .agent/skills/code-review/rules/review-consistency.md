---
title: Consistency & TS Strictness
impact: HIGH
impactDescription: Maintains a predictable codebase and prevents hidden bugs.
tags: consistency, typescript, code-review
---

## Consistency & TS Strictness

Enforce naming conventions and type safety. Audit for `any` usage, PascalCase filenames, and missing return types in complex functions.

**Incorrect Finding:**

> **Finding**: Rename this file to kebab-case.
> **Suggested Improvement**: `user-card.tsx`

**Correct Finding (Standardized):**

> **Location**: `src/features/feedback/components/UserCard.tsx`
> **Finding**: Non-standard filename detected. Our project uses `kebab-case` for all files.
> **Suggested Improvement**: Rename to `user-card.tsx`.
> **Rationale**: Ensures cross-OS compatibility and aligns with the project's naming standard.
