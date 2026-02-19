---
name: testing-standards
description: Global standards for writing high-performance, type-safe unit tests using Bun. Enforces strict typing and zero-tolerance for "any".
---

# Testing Standards

Global standards for writing high-performance, type-safe unit tests using Bun. Enforces strict typing and zero-tolerance for "any".

## Rule Categories by Priority

| Priority | Category       | Impact   | Prefix      |
| -------- | -------------- | -------- | ----------- |
| 1        | Strict Typing  | CRITICAL | `strict-`   |
| 2        | Infrastructure | HIGH     | `bun-`      |
| 3        | Decoupling     | HIGH     | `mock-`     |
| 4        | Coverage       | MEDIUM   | `coverage-` |

## Quick Reference

### 1. Strict Typing (CRITICAL)

- `strict-typing` - Never use `any` in test files. Use proper types or unknown.

### 2. Infrastructure (HIGH)

- `bun-test-native` - Use bun:test exclusively for maximum speed.

### 3. Decoupling (HIGH)

- `mocking-strategy` - Use mock.module and mock() for isolation.

### 4. Coverage (MEDIUM)

- `edge-case-coverage` - Cover happy path, error path, empty state, and loading state.

## How to Use

Read individual rule files for detailed explanations and code examples:

```
rules/strict-typing.md
rules/bun-test-native.md
rules/mocking-strategy.md
rules/edge-case-coverage.md
```

## Full Compiled Document

For the complete guide with all rules expanded: `AGENTS.md`
