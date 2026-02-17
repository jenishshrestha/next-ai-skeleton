# Project Brief: Next-ai-skeleton 🌬️

**Next-ai-skeleton** is a premium, highly-opinionated Next.js production engine and starter kit. It is designed to bridge the gap between "bare-bones skeletons" and "bloated SaaS templates," focusing on architectural purity, developer experience (DX), and a "10/10" premium user interface.

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

| Layer              | Technology                                                        |
| :----------------- | :---------------------------------------------------------------- |
| **Framework**      | Next.js (App Router, React 19, Server Components)                 |
| **Language**       | TypeScript (Strict Mode)                                          |
| **Runtime / Test** | Bun (Runtime, Test runner, Package manager)                       |
| **Database**       | PostgreSQL + Drizzle ORM                                          |
| **Authentication** | Better Auth (Client/Server Plugin architecture)                   |
| **Validation**     | Zod (Schema-first validation)                                     |
| **Env Safety**     | @t3-oss/env-nextjs (Build-time validation)                        |
| **Actions**        | next-safe-action (Type-safe, middleware-ready)                    |
| **Style**          | Vanilla CSS + Tailwind-like utility classes (Radix UI influenced) |
| **UX**             | Sonner (Toasts), Lucide (Icons), Framer-like micro-animations     |

---

## 🚀 Key Features

- **Advanced Auth System**:
  - Email/Password & OAuth (GitHub) integration.
  - **"Last Used" Login Badge**: Smart UI that remembers the user's last login method.
  - **Security**: Built-in rate limiting and Captcha (Cloudflare Turnstile).
  - **Cookie Shield**: Custom proxy-based middleware for secure redirects and session handling.
- **Premium User Settings**:
  - Instant UI sync (no layout shifts) for profile updates.
  - Server-side session pre-fetching for zero-flicker page loads.
  - Intelligent form states (Save button enables/disables based on dirty state).
- **Engineering Foundation**:
  - Global standardized `apiAction` orchestrator for external APIs.
  - Seeding layer for "Golden Test Users" and reproducible development environments.
  - Standardized `PageHeader` and `Field` compound components.

---

## 🎯 Target Brand Identity: "Next-ai-skeleton"

- **Meaning**: Inspired by "Ventus" (Wind/Air).
- **Keywords**: Speed, Flow, Agility, Lightweight, Premium.
- **Vibe**: Futuristic, clean, and extremely fast.

---

## ✅ Current Project Status

- **Engineering Standards**: 10/10 (Skeleton Hardened).
- **UI/UX**: 8/10 (Premium Layout established, Badge UI refined).
- **Scalability**: High (Ready for multi-tenant or complex SaaS logic).
