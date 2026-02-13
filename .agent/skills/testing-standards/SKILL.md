---
name: testing-standards
description: Global standards for writing high-performance, type-safe unit tests using Bun. Enforces strict typing and zero-tolerance for "any".
---

# Testing Standards

Global standards for writing high-performance, type-safe unit tests using Bun. Enforces strict typing and zero-tolerance for "any".

## Rule Categories by Priority

| Priority | Category       | Impact   | Prefix     |
| -------- | -------------- | -------- | ---------- |
| 1        | Strict Typing  | CRITICAL | `strict-`  |
| 2        | Infrastructure | HIGH     | `bun-`     |
| 3        | Decoupling     | HIGH     | `mock-`    |
| 4        | Organization   | MEDIUM   | `feature-` |

## Quick Reference

### 1. Strict Typing (CRITICAL)

- `strict-typing` - Never use `any` in test files. Use proper types or unknown.

### 2. Infrastructure (HIGH)

- `bun-test-native` - Use bun:test exclusively for maximum speed.

### 3. Decoupling (HIGH)

- `mocking-strategy` - Use mock.module and mock() for isolation.

### 4. Organization (MEDIUM)

- `feature-locality` - Co-locate tests with the features they verify.

## How to Use

Read individual rule files for detailed explanations and code examples:

```
rules/strict-typing.md
rules/bun-test-native.md
rules/mocking-strategy.md
rules/feature-locality.md
```
