# AI Agent: Testing Instructions

When writing or refactoring unit tests, you MUST adhere to these strict technical constraints.

## 1. Zero-Tolerance for `any`

- You are strictly prohibited from using the `any` keyword in test files.
- If you encounter existing `any` usage, your first task is to refactor it to use proper types or `unknown`.

## 2. Type Discovery

- Before writing a test, search for existing type definitions in the feature's `types/` folder or `src/shared/types/`.
- Use `import type` for type-only imports to keep the runtime lean.

## 3. Mocking Standards

- Use `bun:test`'s `mock.module` for service/utility mocking.
- Ensure the mock's parameters match the real function's signature exactly.

## 4. Assertion Clarity

- Use descriptive `describe` and `it` blocks.
- Prefer `toEqual` for object comparisons and `toBe` for primitives.
