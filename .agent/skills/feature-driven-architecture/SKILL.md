---
name: feature-driven-architecture
description: Standards for organizing Next.js applications using Feature-Driven Design (FDD). Ensures code locality, encapsulation, and modular scalability.
---

# Feature-Driven Architecture (FDD)

Comprehensive architectural standards for organizing Next.js applications. Contains granular rules focused on modularity, scalability, and predictable navigation.

## Rule Categories by Priority

| Priority | Category              | Impact   | Prefix      |
| -------- | --------------------- | -------- | ----------- |
| 1        | Feature Locality      | CRITICAL | `locality-` |
| 2        | Component Boundaries  | CRITICAL | `server-`   |
| 3        | Public API            | HIGH     | `api-`      |
| 4        | Naming & Consistency  | MEDIUM   | `naming-`   |
| 5        | Shared Infrastructure | MEDIUM   | `shared-`   |

## Quick Reference

### 1. Feature Locality (CRITICAL)

- `locality-co-location` - Keep all feature code (including tests) inside the feature folder.
- `locality-depth` - Limit nesting to 3 levels for predictability.

### 2. Component Boundaries (CRITICAL)

- `server-client-boundary` - Default to Server Components. Push `'use client'` to leaf nodes.

### 3. Public API (HIGH)

- `api-boundary` - Use `index.ts` as the sole entry point. Never import from feature internals.

### 4. Naming & Consistency (MEDIUM)

- `naming-consistency` - Use kebab-case for all files and folders.

### 5. Shared Infrastructure (MEDIUM)

- `shared-global-move` - Promote to shared only after usage in >2 features.
- `shared-component-organization` - Organize shared components into `ui/`, `layouts/`, `providers/` sub-directories.
- `hook-extraction` - Extract business logic from components into custom hooks.

## How to Use

Read individual rule files for detailed explanations and code examples:

```
rules/locality-co-location.md
rules/locality-depth.md
rules/server-client-boundary.md
rules/api-boundary.md
rules/naming-consistency.md
rules/shared-global-move.md
rules/shared-component-organization.md
rules/hook-extraction.md
```

## Full Compiled Document

For the complete guide with all rules expanded: `AGENTS.md`
