---
title: '🧠 Agent Intelligence'
description: 'How to use the Skill Vault and AI Workflows to train your AI agent.'
date: '2026-02-13'
author: 'Ventus'
---

## Overview

We believe in **Agent-Native** development. Instead of explaining your architecture to your AI every time, we externalize the project's DNA into a **Skill Vault** that the agent can read and follow.

---

## The Skill Vault (`.agent/skills`)

Each skill defines a specific area of expertise for the AI agent.

| Skill                      | Domain                                             |
| :------------------------- | :------------------------------------------------- |
| **`feature-architecture`** | Enforces FDD layout and isolation rules            |
| **`testing-standards`**    | Prohibits `any` and mandates Bun-native patterns   |
| **`code-review-lead`**     | Rules for PR analysis and code quality standards   |
| **`vercel-performance`**   | Best practices for Next.js 16 and RSC optimization |

---

## Full Skill Catalog

The following categories are actively used by the AI Agent to audit your code and suggest improvements.

### ⚛️ Vercel React Best Practices

Comprehensive guide with **57 rules** across these domains:

| Category                 | Impact       | Key Focus                                        |
| :----------------------- | :----------- | :----------------------------------------------- |
| Eliminating Waterfalls   | **CRITICAL** | Parallel fetching & Suspense usage               |
| Bundle Size Optimization | **CRITICAL** | Dynamic imports & Barrel file avoidance          |
| Server Performance       | **HIGH**     | `React.cache`, Serialization, & `after()`        |
| Client Data Fetching     | **MEDIUM**   | SWR patterns & event listener cleanup            |
| Re-render Optimization   | **MEDIUM**   | `memo` usage, Functional setState, & Transitions |
| Rendering Performance    | **MEDIUM**   | SVG optimization & hydration stability           |
| JavaScript Performance   | **LOW**      | Loop optimization & Cache storage                |

### 🏗️ Feature-Driven Architecture

Rules for maintaining domain isolation and system purity:

- `strict-isolation`: Features cannot import from other features.
- `shared-promotion`: Mandatory movement of global components to `shared/`.
- `index-uniqueness`: Single entry point for every feature module.

### 🧪 Testing & Quality

Rules for our Bun-native verification suite:

- `bun-native-runner`: Mandates the use of `bun:test` exclusively.
- `strict-typing`: Zero tolerance for `any` in test files.
- `mocking-strategy`: Standardized use of `mock.module` for dependency isolation.

### 🧩 Composition Patterns

Standard React design patterns to prevent prop-drilling and bloat:

- `Compound Components`: Using context for multi-part component state.
- `Explicit Variants`: Favoring separate components over boolean props.
- `React 19 APIs`: Preferring `use()` and direct `ref` props over legacy patterns.

---

## Technical Integration

### 1. Linking Skills

The `link-skills.ts` script (run during `postinstall`) automatically symlinks our markdown rules into the `.cursor/skills` directory.

### 2. Custom Instructions

Inside каждая skill folder, the `AGENTS.md` file contains the raw system prompt used by the AI to understand that specific domain's constraints.

---

## AI Workflows (`.agent/workflows`)

Workflows are standardized technical procedures that can be triggered via slash commands. They provide step-by-step instructions for complex tasks.

- **/code-review**: Triggers a senior-lead audit of the current branch.
- **/create-feature**: Scaffolds a new FDD-compliant feature module leveraging the vault rules.
