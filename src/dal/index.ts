// Server Action
export { apiAction } from './api/api-action';

// HTTP Client (for direct use or interceptor setup)
export { default as httpClient, buildRequestConfig } from './api/http-client';

// Types
export type { ApiEndpoint, ApiRequestOptions, ApiResult } from './types';
export { RequestMethod } from './types';
