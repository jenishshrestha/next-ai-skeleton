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
| 2        | Public API            | HIGH     | `api-`      |
| 3        | Naming & Consistency  | MEDIUM   | `naming-`   |
| 4        | Shared Infrastructure | MEDIUM   | `shared-`   |

## Quick Reference

### 1. Feature Locality (CRITICAL)

- `locality-co-location` - Keep all feature code inside the feature folder.
- `locality-depth` - Limit nesting to 3 levels for predictability.

### 2. Public API (HIGH)

- `api-index-export` - Use index.ts as the sole entry point.
- `api-leaky-imports` - Never import from feature internals.

### 3. Naming & Consistency (MEDIUM)

- `naming-consistency` - Use kebab-case for all files and folders.

### 4. Shared Infrastructure (MEDIUM)

- `shared-global-move` - Promote to shared only after usage in >2 features.

## How to Use

Read individual rule files for detailed explanations and code examples:

```
rules/locality-co-location.md
rules/locality-depth.md
rules/api-index-export.md
rules/api-leaky-imports.md
rules/naming-consistency.md
rules/shared-global-move.md
```
