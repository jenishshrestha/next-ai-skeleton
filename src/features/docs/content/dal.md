---
title: '🛰️ API Communication (DAL)'
description: 'How to use the Data Access Layer (DAL) for type-safe, resilient API communication.'
date: '2026-02-13'
author: 'Next AI Skeleton'
---

## Overview

The **Data Access Layer (DAL)** is the single source of truth for all external communication. It wraps Axios in a Next.js Server Action pattern, providing a consistent `ApiResult<T>` wrapper that never throws exceptions.

---

## Core Component: `apiAction`

The `apiAction` function orchestrates every request.

### Basic Usage

```typescript
const result = await apiAction(userEndpoints.getProfile, {
  pathVariables: { id: '123' },
});

if (result.success) {
  // result.data is typed based on the endpoint definition
  return result.data;
}
```

---

## Technical Standards

| Standard             | Rule                                                             |
| :------------------- | :--------------------------------------------------------------- |
| **Never Throw**      | `apiAction` catches all errors and returns `{ success: false }`. |
| **Type Safety**      | Every endpoint must define its Request/Response types.           |
| **Isolation**        | API logic must live in `src/dal` or `src/features/[name]/api`.   |
| **No "any"**         | Zero tolerance for `any` in request or response data.            |
| **Global Intercept** | `http-client.ts` handle token injection and logging globally.    |

---

## Common Patterns

### 1. Handling Validation (400)

The DAL automatically parses backend validation messages into the `errors` field.

```typescript
if (!result.success && result.status === 400) {
  const fieldErrors = result.errors; // e.g., { email: ['Required'] }
}
```

### 2. Request Deduplication

Requests within the same React render cycle are automatically deduplicated using `React.cache`.

### 3. Path Interpolation

URLs like `/users/{id}` are automatically hydrated using `pathVariables`.

---

## Standard Status Mapping

| Status  | Category      | Success |
| :------ | :------------ | :------ |
| **201** | Created       | ✅ Yes  |
| **401** | Unauthorized  | ❌ No   |
| **422** | Unprocessable | ❌ No   |
| **500** | Server Error  | ❌ No   |
