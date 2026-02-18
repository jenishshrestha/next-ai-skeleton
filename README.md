# 💀 next-ai-starter

A premium, **Agent-Native** Next.js 16 skeleton designed for high-performance development, architectural clarity, and seamless AI collaboration.

---

## 🚀 Overview

**next-ai-starter** is more than just a boilerplate. It's a production-ready foundation built on the principles of **Deep Feature Isolation** and **Modern DX**. It provides a robust technical handbook, standardized AI instructions, and a lightning-fast Bun-native workflow to help you go from idea to deployment with zero technical debt.

### Key Pillars

- **Agent-Native Workflow**: Specialized AI skills (`.agent/skills`) and instructions (`AGENTS.md`) designed to guide both human and AI developers toward architectural excellence.
- **Deep Feature Isolation (FDD)**: Self-contained business domains with dedicated subfolders, ensuring absolute separation of concerns.
- **Production-Ready DAL**: A robust Data Access Layer powered by Axios and `React.cache()` for high-performance, deduplicated requests.
- **Hardened Git Hygiene**: Self-rectifying Husky hooks that enforce professional branch naming and block broken code.

---

## 🧩 Tech Stack

- ⚛️ **Next.js 16 (App Router)** – The cutting edge of React.
- ⚡ **Bun** – Ultra-fast runtime, package manager, and test runner.
- 🎨 **Tailwind CSS 4** – Modern utility-first styling with HSL precision.
- 🛡️ **Axios** – Standardized HTTP client with advanced request matching.
- � **Bun Test** – Blazing fast, zero-config unit testing suite.
- �🧱 **shadcn/ui** – Premium, accessible UI base.
- 🤖 **Gray-Matter** – Powering a markdown-driven technical CMS.
- ✨ **Lucide React** – Premium iconography.

---

## 🏗️ Architecture

The project follows a strict **Feature-Driven Design (FDD)** with **Deep Isolation**. All system-related logic is consolidated into the `.agent` vault.

```bash
.
├── .agent/              # 🧠 AI Skill Vault & System Logic
│   ├── skills/          # Custom AI instructions (Architecture, Testing, Design)
│   └── workflows/       # Standardized SOPs for complex tasks
├── src/
│   ├── app/             # 🌏 Next.js Routing & Global Layouts
│   │   ├── docs/        # Dynamic Technical Handbook
│   │   └── icon.tsx     # Dynamic SVG Favicon
│   ├── dal/             # 🏛️ Data Access Layer (Orchestrator, Client, Internal Types)
│   ├── features/        # 📦 Deeply Isolated Business Domains
│   │   ├── feedback/    # Reference Implementation (Mini-App Pattern)
│   │   │   ├── api/     # Server Actions & Unit Tests
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── types/
│   │   └── docs/        # Markdown CMS Logic & Content
│   └── shared/          # 💎 Global Shared Core (Components, Libs, Hooks, Types)
├── tsconfig.json        # Strict TypeScript Configuration (Bun-types ready)
├── package.json         # Lean dependencies & Bun-native scripts
└── README.md
```

---

## 🏁 Getting Started

### Prerequisites

- **Bun** >= 1.3.9 (Strictly enforced via `only-allow`)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/jenishshrestha/next-ai-starter.git
   cd next-ai-starter
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

3. Start developing:
   ```bash
   bun dev
   ```

### Standard Scripts

- `bun test` — Run the high-performance unit test suite.
- `bun run typecheck` — Strict TypeScript verification.
- `bun run lint` — ESLint audit for project standards.

---

## 🛡️ Guardrails & Standards

This project uses **Husky** to enforce "Zero-Tolerance" quality:

- **Branch Naming**: Only `feature/`, `fix/`, `refactor/`, etc., allowed. Invalid branches are **automatically deleted** to prevent messy git history.
- **Commit Standards**: Enforces [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) via `commitlint`.
- **Pre-Push Safety**: All unit tests must pass before code can be pushed to remote.

---

## 📚 Documentation

The skeleton includes a built-in technical handbook at `/docs`, powered by the local CMS:

- **[Architecture: Deep Isolation](file:///Users/jenishshrestha/Projects/personal/next-ai-starter/src/features/docs/content/architecture.md)**
- **[DX Standards: Performance First](file:///Users/jenishshrestha/Projects/personal/next-ai-starter/src/features/docs/content/dx-standards.md)**
- **[Deployment & Dockerization: Optimized Deployment](file:///Users/jenishshrestha/Projects/personal/next-ai-starter/src/features/docs/content/deployment.md)**
- **[Data Access Layer: Usage Guide](file:///Users/jenishshrestha/Projects/personal/next-ai-starter/src/dal/README.md)**

---

© 2026 next-ai-starter. Engineered for the AI age by **Jenish Shrestha**.
