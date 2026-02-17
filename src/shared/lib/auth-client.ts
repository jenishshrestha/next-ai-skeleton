import { createAuthClient } from 'better-auth/react';
import { lastLoginMethodClient } from 'better-auth/client/plugins';
import { env } from '@/shared/lib/env';

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_BETTER_AUTH_URL,
  plugins: [lastLoginMethodClient()],
});

export const { signIn, signUp, useSession } = authClient;
