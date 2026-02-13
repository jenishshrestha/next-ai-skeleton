---
title: Performance & Best Practices
impact: CRITICAL
impactDescription: Direct impact on Core Web Vitals and user experience.
tags: performance, code-review, vercel
---

## Performance & Best Practices

Enforce Vercel Engineering's performance guidelines. Look for waterfalls, excessive re-renders, and bloated bundles.

**Incorrect Finding:**

> **Finding**: Use `Promise.all` here.
> **Suggested Improvement**: `await Promise.all(...)`

**Correct Finding (Standardized):**

> **Location**: `src/features/dashboard/api/actions.ts:L45-L50`
> **Finding**: Sequential async waterfall detected. Three independent fetches are being awaited one by one.
> **Suggested Improvement**: Use `Promise.all()` to execute the fetches concurrently.
> **Rationale**: Reduces total request time by up to 60%, improving perceived page load.
