import { cache } from 'react';
import { revalidatePath } from 'next/cache';
import { AxiosError } from 'axios';

import httpClient, { buildRequestConfig } from './http-client';
import {
  RequestMethod,
  type ApiEndpoint,
  type ApiRequestOptions,
  type ApiResult,
  type ApiValidationError,
} from '../types';

/**
 * Base API Execution logic
 */
async function executeApiRequest<TData = unknown, TBody = Record<string, unknown>>(
  endpoint: ApiEndpoint,
  options: ApiRequestOptions<TBody, TData> = {} as ApiRequestOptions<TBody, TData>,
  config: {
    revalidate?: string;
  } = {},
): Promise<ApiResult<TData>> {
  try {
    const requestConfig = buildRequestConfig(endpoint, options);
    const response = await httpClient.request<TData>(requestConfig);

    let data = response.data;

    // Optional Zod Validation for 10/10 runtime safety
    if (options.responseSchema) {
      const validation = options.responseSchema.safeParse(data);
      if (!validation.success) {
        console.error('[DAL] Response Validation Failed:', {
          endpoint: endpoint.controllerName,
          errors: validation.error.format(),
        });
        return {
          success: false,
          message: 'Received invalid data format from external API',
          status: response.status,
        };
      }
      data = validation.data;
    }

    if (config.revalidate) {
      revalidatePath(config.revalidate);
    }

    return {
      success: true,
      data,
      status: response.status,
    };
  } catch (error) {
    const axiosError = error as AxiosError<{
      message?: string;
      errors?: ApiValidationError;
      validationErrors?: ApiValidationError;
    }>;

    const responseData = axiosError.response?.data;
    const message = responseData?.message || axiosError.message || 'Something went wrong';
    const status = axiosError.response?.status;
    const errors = responseData?.errors || responseData?.validationErrors;

    console.error('[DAL] Request Failed:', message, {
      status,
      url: endpoint.controllerName,
    });

    return { success: false, message, status, errors };
  }
}

/**
 * Cached version for GET requests to deduplicate within the same render cycle.
 */
const cachedApiRequest = cache(executeApiRequest);

/**
 * Server Action Orchestrator
 *
 * A thin wrapper around the HTTP client for use in Next.js Server Actions.
 * Dedupes concurrent GET requests using React.cache, while ensuring mutations stay fresh.
 */
export const apiAction = <TData = unknown, TBody = Record<string, unknown>>(
  endpoint: ApiEndpoint,
  options: ApiRequestOptions<TBody, TData> = {} as ApiRequestOptions<TBody, TData>,
  config: {
    revalidate?: string;
  } = {},
): Promise<ApiResult<TData>> => {
  const method = endpoint.requestMethod ?? RequestMethod.GET;

  // Only use React.cache for GET requests to avoid mutation caching bugs in Next.js
  if (method === RequestMethod.GET) {
    return cachedApiRequest(endpoint, options, config) as Promise<ApiResult<TData>>;
  }

  return executeApiRequest(endpoint, options, config);
};
