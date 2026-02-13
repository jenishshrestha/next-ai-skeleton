# Feature-Driven Architecture (AGENTS)

**Version 1.0.0**  
**January 2026**

> **Note:** This document is optimized for AI agents to follow when maintaining or generating code in the projects codebase.

---

## Abstract
This architecture implements a hybrid approach between DDD (Domain-Driven) and FDD (Feature-Driven). It prioritizes **Co-location** and **Encapsulation** to prevent "spaghetti code" as the project grows.

---

## 1. Directory Structure

### 1.1 `src/features/` (The Core)
The primary unit of organization. Each subdirectory represents a business domain or unique user outcome.

**Internal Structure:**
- `api/`: Server-side interaction (Fetchers, Actions, Services).
- `components/`: UI components used *only* within this feature.
- `hooks/`: Business logic hooks for this specific domain.
- `types/`: Domain-specific TypeScript interfaces.
- `index.ts`: The **Public API**.

**Rules:**
- **Encapsulation**: Files inside a feature should not be aware of internals of other features.
- **Index Exports**: Only export what is necessary for external use in `index.ts`.

### 1.2 `src/shared/`
Code used by multiple features.
- `components/`: UI Atoms (Buttons, Inputs, Modals).
- `hooks/`: Utility hooks (`useMediaQuery`, `useDebounce`).
- `lib/`: Third-party SDK initializations.
- `types/`: Global/Common types.

---

## 2. Import & Dependency Rules

### 2.1 The Public API Rule
Agents **MUST NOT** import from the internals of a feature.

**Incorrect:**
```typescript
import { useLogin } from '@/features/auth/hooks/useLogin';
```

**Correct:**
```typescript
import { useLogin } from '@/features/auth';
```

### 2.2 Shared Promotion
If a component in `@/features/chat` is suddenly needed in `@/features/support`, move that component to `@/shared/components` instead of allowing a cross-feature import.

---

## 3. Implementation Checklist for Agents

1.  **Identity**: Determine if the new code belongs to a specific feature or is shared.
2.  **Scaffold**: If a new feature, creates the 5-folder structure + `index.ts`.
3.  **Export**: Ensure all public-facing components/hooks/services are in `index.ts`.
4.  **Validate**: Check `tsconfig.json` path aliases for correct mapping.
