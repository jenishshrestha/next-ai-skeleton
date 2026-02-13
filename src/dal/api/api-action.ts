import { cache } from 'react';
import { revalidatePath } from 'next/cache';
import { AxiosError } from 'axios';

import httpClient, { buildRequestConfig } from './http-client';
import type { ApiEndpoint, ApiRequestOptions, ApiResult, ApiValidationError } from '../types';

/**
 * Server Action Orchestrator
 *
 * A thin wrapper around the HTTP client for use in Next.js Server Actions.
 * Deduplicates concurrent requests within the same render cycle using React.cache.
 */
export const apiAction = cache(
  async <TData = unknown, TBody = Record<string, unknown>>(
    endpoint: ApiEndpoint,
    options: ApiRequestOptions<TBody> = {} as ApiRequestOptions<TBody>,
    config: {
      /** Path to revalidate after a successful mutation */
      revalidate?: string;
    } = {},
  ): Promise<ApiResult<TData>> => {
    try {
      const requestConfig = buildRequestConfig(endpoint, options);
      const response = await httpClient.request<TData>(requestConfig);

      // Revalidate Next.js cache if requested
      if (config.revalidate) {
        revalidatePath(config.revalidate);
      }

      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<{
        message?: string;
        errors?: ApiValidationError;
        validationErrors?: ApiValidationError;
      }>;

      const data = axiosError.response?.data;
      const message = data?.message || axiosError.message || 'Something went wrong';
      const status = axiosError.response?.status;
      const errors = data?.errors || data?.validationErrors;

      console.error('[DAL]', message, { status, url: endpoint.controllerName });

      return { success: false, message, status, errors };
    }
  },
);
