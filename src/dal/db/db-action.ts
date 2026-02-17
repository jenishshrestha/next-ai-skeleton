import { cache } from 'react';
import { revalidatePath } from 'next/cache';
import type { ApiResult, ApiValidationError } from '../types';

/**
 * Database Action Orchestrator
 *
 * A wrapper around Drizzle queries for use in Next.js Server Actions and Components.
 * Standardizes the return shape to ApiResult<T> and deduplicates requests.
 */
export const dbAction = cache(
  async <TData = unknown>(
    queryFn: () => Promise<TData>,
    config: {
      /** Path to revalidate after a successful mutation */
      revalidate?: string;
      /** Custom error message */
      errorMessage?: string;
    } = {},
  ): Promise<ApiResult<TData>> => {
    try {
      const data = await queryFn();

      // Revalidate Next.js cache if requested
      if (config.revalidate) {
        revalidatePath(config.revalidate);
      }

      return {
        success: true,
        data,
        status: 200,
      };
    } catch (error) {
      const message =
        config.errorMessage ||
        (error instanceof Error ? error.message : 'Database operation failed');

      console.error('[DB-DAL] Error:', message, error);

      // Handle common database errors (e.g., uniqueness constraints)
      let errors: ApiValidationError | undefined;

      // PostgreSQL/Neon error code for unique violation is '23505'
      if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        error.code === '23505'
      ) {
        errors = {
          database: 'A record with this value already exists.',
        };
      }

      return {
        success: false,
        message,
        status: 500,
        errors,
      };
    }
  },
);
