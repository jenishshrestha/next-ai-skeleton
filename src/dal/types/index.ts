export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export interface ApiEndpoint {
  queryKeyName: string;
  controllerName: string;
  requestMethod?: RequestMethod;
}

export type Primitive = string | number | boolean | null | undefined;

export interface RequestParam {
  [key: string]: Primitive;
}

/** Standard shape for field-level validation errors */
export interface ApiValidationError {
  [key: string]: string | string[];
}

// ─── Request Options ─────────────────────────────────────────────────────────

export interface ApiRequestOptions<TBody = Record<string, unknown>> {
  /** Request body payload — typed per call site */
  requestData?: TBody;
  /** Path variables for URL interpolation (e.g. {id}) */
  pathVariables?: Record<string, string | number>;
  /** Query parameters appended to the URL */
  params?: RequestParam;
  /** Extra headers for this specific request */
  headers?: Record<string, string>;
  /** Override default response type (e.g. 'blob' for file downloads) */
  responseType?: 'json' | 'blob' | 'arraybuffer' | 'text';
}

// ─── Response Shapes ─────────────────────────────────────────────────────────

/** Standardized success/error return type from `apiAction`. */
export type ApiResult<TData> =
  | {
      success: true;
      data: TData;
      status: number;
      message?: string;
      errors?: undefined;
    }
  | {
      success: false;
      data?: undefined;
      message: string;
      status?: number;
      errors?: ApiValidationError;
    };

/** Generic wrapper for paginated lists */
export interface PaginatedResult<T> {
  results: T[];
  total: number;
  limit?: number;
  offset?: number;
  next?: string | null;
  previous?: string | null;
}
