# Data Access Layer (DAL) Documentation

## Overview

The `apiAction` function is the primary entry point for all API communication in this application. It wraps a pre-configured Axios instance in a Next.js Server Action, providing typed requests, automatic error handling, and a consistent `ApiResult<T>` return shape — **it never throws**. It also uses `React.cache` to deduplicate requests within the same render cycle.

---

## Core Types

### `ApiEndpoint`

Defines a single API endpoint.

```typescript
interface ApiEndpoint {
  queryKeyName: string; // Unique key for caching / query identification
  controllerName: string; // API path — supports {variable} interpolation
  requestMethod?: RequestMethod; // Defaults to GET
}
```

### `ApiRequestOptions`

Configuration for a single API call.

```typescript
export interface ApiRequestOptions<TBody = Record<string, unknown>> {
  requestData?: TBody;
  pathVariables?: Record<string, string | number>;
  params?: RequestParam;
  headers?: Record<string, string>;
  /** e.g. 'blob' for file downloads */
  responseType?: 'json' | 'blob' | 'arraybuffer' | 'text';
}
```

### `ApiResult<T>`

The standard return shape. Check `success` to narrow the type.

```typescript
type ApiResult<TData> =
  | { success: true; data: TData; status: number; message?: string }
  | {
      success: false;
      data?: undefined;
      message: string;
      status?: number;
      errors?: ApiValidationError;
    };
```

---

## Advanced Usage

### 1. Handling Validation Errors (Forms)

The DAL automatically extracts field-level errors if the backend returns them.

```typescript
const result = await apiAction(userEndpoints.create, { requestData });

if (!result.success && result.status === 400) {
  // result.errors will contain field-level messages (e.g. { email: ["Too short"] })
  setFormErrors(result.errors);
}
```

### 2. Pagination (Tables)

Use the `PaginatedResult<T>` utility for consistent list responses.

```typescript
const result = await apiAction<PaginatedResult<User>>(userEndpoints.list, {
  params: { offset: 0, limit: 10 },
});

if (result.success) {
  console.log('Total count:', result.data.total);
  console.log('Items:', result.data.results);
}
```

### 3. File Downloads (CSV/PDF)

Override the `responseType` to handle binary data.

```typescript
const result = await apiAction(userEndpoints.downloadReport, {
  responseType: 'blob',
});

if (result.success) {
  const url = window.URL.createObjectURL(new Blob([result.data]));
  // ... trigger download
}
```

### 4. File Uploads (FormData)

```typescript
const formData = new FormData();
formData.append('file', file);

const result = await apiAction(userEndpoints.upload, {
  requestData: formData,
});
```

---

## Global Standards Mapping

| Status  | Success  | Category     | Typical Use Case                             |
| :------ | :------- | :----------- | :------------------------------------------- |
| **200** | ✅ True  | OK           | Successful GET, PUT, PATCH                   |
| **201** | ✅ True  | Created      | Successful POST (new resource)               |
| **204** | ✅ True  | No Content   | Successful DELETE                            |
| **400** | ❌ False | Bad Request  | Validation errors (mapped to `errors` field) |
| **401** | ❌ False | Unauthorized | Authentication failure                       |
| **403** | ❌ False | Forbidden    | Permissions failure                          |
| **404** | ❌ False | Not Found    | Resource not found                           |
| **500** | ❌ False | Server Error | Backend crash                                |

---

## Environment Variables

| Variable              | Description                                                       |
| :-------------------- | :---------------------------------------------------------------- |
| `NEXT_PUBLIC_API_URL` | Base URL for all API requests (e.g. `https://api.example.com/v1`) |
