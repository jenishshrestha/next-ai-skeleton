# Project Brief: Lyre 🌬️🎼

**Lyre** is a premium, highly-opinionated Next.js + AI Architecture stack. It is designed to bridge the gap between "bare-bones skeletons" and "bloated SaaS templates," focusing on architectural purity, developer experience (DX), and a "10/10" orchestrated engineering standard.

---

## 🏗️ Core Architecture & Principles

### 1. Feature-Driven Design (FDD)

Code is organized by business feature rather than technical type. Each feature (e.g., `auth`, `users`) encapsulates its own:

- **UI Components**: Presentational and compound components.
- **Hooks**: Logic separation (SoC).
- **DAL (Data Access Layer)**: Raw database interactions.
- **Actions**: Validated server actions using `next-safe-action`.

### 2. SOLID & SoC (Separation of Concerns)

- **Single Responsibility**: UI components are purely presentational; logic is extracted into custom hooks.
- **Dependency Inversion**: Clean boundaries between the UI, the Data Access Layer, and external APIs.
- **Type Safety**: Zero-tolerance for `any`. Strict TypeScript throughout.

### 3. "Automated Magic" Testing

- **Zero-Friction Mocking**: Uses Bun's `mock.module()` to intercept database calls at the module level.
- **No DI Boilerplate**: Tests stay clean without needing manual Dependency Injection in production code.
- **Reliability**: 100% test coverage on critical DALs and Actions.

---

## 🛠️ Technology Stack

| Layer              | Technology                                                    |
| :----------------- | :------------------------------------------------------------ |
| **Framework**      | Next.js (App Router, React 19, Server Components)             |
| **Language**       | TypeScript (Strict Mode)                                      |
| **Runtime / Test** | Bun (Runtime, Test runner, Package manager)                   |
| **Database**       | PostgreSQL + Drizzle ORM                                      |
| **Authentication** | Better Auth (Client/Server Plugin architecture)               |
| **Validation**     | Zod (Schema-first validation)                                 |
| **Env Safety**     | @t3-oss/env-nextjs (Build-time validation)                    |
| **Actions**        | next-safe-action (Type-safe, middleware-ready)                |
| **Style**          | Tailwind CSS v4 + Radix UI                                    |
| **UX**             | Sonner (Toasts), Lucide (Icons), Framer-like micro-animations |

---

## 🚀 Key Features

- **Finely Tuned Auth System**:
  - Email/Password & OAuth (GitHub) integration.
  - **"Last Used" Login Badge**: Smart UI that remembers the user's last login method.
  - **Security**: Built-in rate limiting and Captcha (Cloudflare Turnstile).
  - **Cookie Shield**: Custom proxy-based middleware for secure redirects and session handling.
- **Orchestrated Data Layer**:
  - Standardized `apiAction` orchestrator for external APIs.
  - Seeding layer for "Golden Test Users" and reproducible development environments.
  - Standardized `PageHeader` and `Field` compound components.
- **Premium UX**:
  - Instant UI sync for profile updates.
  - Server-side session pre-fetching for zero-flicker page loads.

---

## 🎯 Brand Identity: "Lyre"

- **Slogan**: "Orchestrate your vision. Harmonize your code."
- **Meaning**: Inspired by the instrument of the wind. Representing speed, harmony, and finely tuned engineering.
- **Vibe**: Futuristic, clean, and extremely fast.

---

## ✅ Current Project Status

- **Engineering Standards**: 10/10 (Lyre Engine Hardened).
- **UI/UX**: 9/10 (Premium Layout + Refined Badge UI).
- **Scalability**: High (Ready for multi-tenant or complex SaaS logic).
