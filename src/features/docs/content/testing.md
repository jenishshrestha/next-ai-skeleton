---
title: '🧪 Testing Strategy'
description: 'How to write and run high-performance unit tests using the Bun-native runner.'
date: '2026-02-13'
author: 'Ventus'
---

## Overview

We use **Bun's native test runner** instead of Jest or Vitest. This provides ultra-fast execution (~100ms for standard suites) and built-in mocking without additional configuration.

---

## Technical Standards

| Standard             | Rule                                                               |
| :------------------- | :----------------------------------------------------------------- |
| **Zero "any"**       | Every mock and test utility must be strictly typed. No exceptions. |
| **Mocking Module**   | Use `mock.module` for dependency injection and boundary testing.   |
| **Filename Pattern** | All tests must end in `[name].test.ts`.                            |
| **Locality**         | Place tests alongside the source code they verify (same folder).   |

---

## Core Utilities

### 1. Basic Test Block

```typescript
import { describe, expect, it } from 'bun:test';

describe('Logic Block', () => {
  it('calculates X correctly', () => {
    expect(calculate(10)).toBe(20);
  });
});
```

### 2. Mocking Dependencies

```typescript
import { mock } from 'bun:test';

mock.module('./api-client', () => ({
  default: {
    request: mock(async () => ({ success: true, data: {} })),
  },
}));
```

---

## CI/CD Verification

Tests are automatically run during several stages of the workflow:

- **Pre-Push**: Husky runs `bun test` to prevent broken code from reaching the remote.
- **Pre-Commit (Optional)**: Can be enabled for critical features.

Run manually:

```bash
bun test        # One-shot run
bun test:watch  # Watch mode for high-velocity DX
```
