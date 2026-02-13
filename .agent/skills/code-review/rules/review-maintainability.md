---
title: Maintainability & Logical Flow
impact: MEDIUM
impactDescription: Reduces cognitive load for future developers.
tags: maintenance, readability, code-review
---

## Maintainability & Logical Flow

Verify that code is easy to read and logically structured. Look for overly complex functions, missing comments for edge cases, and "pre-mature" abstractions.

**Incorrect Finding:**

> **Finding**: This function is too long. Break it up.

**Correct Finding (Standardized):**

> **Location**: `src/shared/lib/utils.ts:L20-L80`
> **Finding**: Complex conditional logic is making the `processData` function difficult to scan.
> **Suggested Improvement**: Extract the validation logic into a private helper function.
> **Rationale**: Improves readability and makes the core logic easier to verify in isolation.
