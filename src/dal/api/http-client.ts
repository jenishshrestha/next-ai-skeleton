import axios from 'axios';

import type { ApiEndpoint, ApiRequestOptions } from '../types';
import { env } from '@/shared/lib/env';

// ─── Axios Instance ──────────────────────────────────────────────────────────

export const httpClient = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  timeout: 30_000, // 30 seconds
  headers: { 'Content-Type': 'application/json' },
});

// ─── Interceptor Hooks ───────────────────────────────────────────────────────
// Projects can extend these to add auth headers, logging, error transforms, etc.
//
// Example — inject a Bearer token:
//   httpClient.interceptors.request.use((config) => {
//     config.headers.Authorization = `Bearer ${getToken()}`;
//     return config;
//   });

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Interpolates path variables into the endpoint URL.
 * `/users/{id}` + `{ id: '123' }` → `/users/123`
 */
function interpolatePath(url: string, pathVariables?: Record<string, string | number>): string {
  if (!pathVariables) return url;

  let result = url;
  for (const [key, value] of Object.entries(pathVariables)) {
    result = result.replaceAll(`{${key}}`, String(value));
  }
  return result;
}

/**
 * Builds a full Axios request config from our typed endpoint + options.
 */
export function buildRequestConfig<TBody = Record<string, unknown>>(
  endpoint: ApiEndpoint,
  options: ApiRequestOptions<TBody> = {} as ApiRequestOptions<TBody>,
) {
  return {
    url: interpolatePath(endpoint.controllerName, options.pathVariables),
    method: endpoint.requestMethod ?? 'GET',
    data: options.requestData,
    params: options.params,
    headers: options.headers,
    responseType: options.responseType,
  };
}

export default httpClient;
