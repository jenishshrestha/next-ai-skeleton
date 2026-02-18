---
title: '⚖️ Engineering Standards'
description: 'The core technical rules and quality standards that govern the development of this skeleton.'
date: '2026-02-13'
author: 'Ventus'
---

## Overview

These standards are not just suggestions; they are codifed into our **Skill Vault** and enforced by the AI Agent during development and code reviews.

---

## 🏗️ Architecture Standards (FDD)

| Rule                  | Standard                                                                |
| :-------------------- | :---------------------------------------------------------------------- |
| **Deep Isolation**    | Features must not import from other features. Cross-talk is prohibited. |
| **Shared Promotion**  | If a component is used by >1 feature, it must move to `src/shared`.     |
| **Index-Only Access** | Feature code should only be accessed via the feature's `index.ts`.      |
| **Kebab-Case Only**   | All filenames and directories must use kebab-case.                      |

---

## 📡 Data Access Layer (DAL)

| Rule                  | Standard                                                                 |
| :-------------------- | :----------------------------------------------------------------------- |
| **Zero-Throw Policy** | API actions must return an `ApiResult` object and never throw errors.    |
| **Strict Typing**     | Zero tolerance for `any` in request or response data.                    |
| **Path Hydration**    | Use `{variable}` in endpoint controllers for dynamic path interpolation. |

---

## 🧪 Testing Standards

| Rule               | Standard                                                           |
| :----------------- | :----------------------------------------------------------------- |
| **Bun-Native**     | Use `bun:test` exclusively for performance. No Jest or Vitest.     |
| **Co-Location**    | Tests must live in the same folder as the source code they verify. |
| **Module Mocking** | Use `mock.module` for isolating dependencies at the boundary.      |

---

## 🎨 Web Design Guidelines

| Rule                 | Standard                                                             |
| :------------------- | :------------------------------------------------------------------- |
| **Rich Aesthetics**  | Use curated HSL palettes. Avoid generic red, blue, or green colors.  |
| **Micro-Animations** | Every primary action should have a hover/active transition state.    |
| **Glassmorphism**    | Use `backdrop-blur` and translucent backgrounds for premium UI feel. |

---

## 🤖 AI Workflow Rules

- **Branch Naming**: Must follow `type/description` (e.g., `feat/login-api`). Invalid branches are automatically deleted.
- **Commit Messages**: Must follow Conventional Commits (e.g., `feat: added auth`).
- **Code Review**: Every PR must pass a Senior Lead audit via the `/code-review` workflow.
