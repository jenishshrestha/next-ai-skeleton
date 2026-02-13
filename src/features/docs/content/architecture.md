---
title: '🏗️ Architecture: Feature-Driven Design'
description: 'Deep-dive into the FDD methodology and folder isolation rules.'
date: '2026-02-13'
author: 'Next AI Skeleton'
---

## Feature-Driven Design (FDD)

This project follows a strict **Feature-Driven Design** pattern. Instead of organizing by technical type (e.g., all components in one folder), we organize by **Domain**.

### Core Constraints

1.  **Deep Isolation**: Features should be self-contained. A feature should rarely import from another feature.
2.  **Shared vs. Feature**: Components used by multiple features live in `src/shared`. If it's specific to a domain, it stays in `src/features/[name]`.
3.  **App Router as Glue**: `src/app` only handles routing and layout. It imports features and shared components to compose pages.

---

## Directory Structure

| Path            | Level       | Purpose                                             |
| :-------------- | :---------- | :-------------------------------------------------- |
| `.agent/`       | **System**  | AI Skills, Workflows, and Custom Instructions       |
| `src/app/`      | **Routing** | App Router pages, layouts, and global providers     |
| `src/features/` | **Domain**  | Isolated business logic, components, and API routes |
| `src/shared/`   | **Shared**  | Global UI, Libs, Types, and Utils                   |
| `src/dal/`      | **System**  | Data Access Layer (Client & Server actions)         |

---

## Feature Anatomy

Every folder inside `src/features/` should follow this standard structure:

```text
src/features/[feature-name]/
├── api/          # Feature-specific API endpoints & actions
├── components/   # Feature-specific UI components
├── types/        # Feature-specific TypeScript interfaces
├── lib/          # Feature-specific utilities/helpers
└── index.ts      # Public API for the feature
```

---

## The Rule of "Zero Leakage"

- **Incorrect**: `import { Button } from '@/features/auth/components/button'`
- **Correct**: `import { Button } from '@/shared/components/ui/button'`
- **Correctish**: `import { AuthForm } from '@/features/auth'` (only via index.ts)
