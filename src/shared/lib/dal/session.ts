import { auth } from '@/shared/lib/auth';
import { headers } from 'next/headers';
import { cache } from 'react';

/**
 * Server-side Session Fetcher
 *
 * Retrieves the user session on the server using Better Auth.
 * Uses React.cache to deduplicate the request across the render tree.
 */
export const getServerSession = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
});
