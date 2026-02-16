import { createAuthClient } from 'better-auth/react';
import { lastLoginMethod } from 'better-auth/plugins';
import { env } from '@/shared/lib/env';

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_BETTER_AUTH_URL, // the base url of your auth server
  plugins: [lastLoginMethod()],
});

export const { signIn, signUp, useSession } = authClient;
