---
title: Deployment & Dockerization
description: Professional deployment strategies using multi-stage, Bun-native Docker builds.
date: 2026-02-13
author: Antigravity
---

# Deployment & Dockerization

The **next-ai-skeleton** is designed to be cloud-agnostic and ultra-performant in production. We leverage **Docker** with a multi-stage, Bun-native build process to ensure that yours images are lean, secure, and blazing fast.

## ⚓️ Elite Docker Strategy

Our Docker setup is highly optimized, hitting a benchmark of ~**216MB**, which is in the elite category for Next.js applications.

### Key Optimizations

1.  **Multi-Stage Alpine Builds**: We use `oven/bun:alpine` for dependencies and `node:22-alpine` for the final runner stage.
2.  **Next.js Standalone Mode**: Enabled via `output: 'standalone'` in `next.config.ts`. This bundles only the minimal required `node_modules` into the build.
3.  **Security-First**: The application runs as a non-root `nextjs` user inside the container.
4.  **Bun-to-Node Handover**: We use Bun for the ultra-fast build stage and the official Node.js Alpine image for the stable production runner.

## 🚀 How to Use

### 1. Build the Image

To build the optimized production image locally:

```bash
docker compose build
```

### 2. Start the Container

To start the container with the correct port mapping (`3000:3000`):

```bash
docker compose up
```

### 3. Verification

Once running, verify the application at: [http://localhost:3000](http://localhost:3000)

## 🏗️ Docker Hierarchy

| Stage       | Image             | Responsibility                                          |
| ----------- | ----------------- | ------------------------------------------------------- |
| **deps**    | `oven/bun:alpine` | Installs production-only dependencies.                  |
| **builder** | `oven/bun:alpine` | Compiles the code and generates the standalone package. |
| **runner**  | `node:22-alpine`  | Minimal runtime image hosting the production app.       |

## 📦 Deployment Options

Because of the Dockerized nature of the skeleton, you can deploy it to:

- **PaaS**: Vercel (Native hooks), Railway, Render.
- **IaaS**: AWS (ECS/EKS), DigitalOcean (Droplets/App Platform), Google Cloud (Cloud Run).
- **Private Cloud**: Any Linux server running Docker.

---

© 2026 next-ai-skeleton. Managed by **Jenish Shrestha**.
