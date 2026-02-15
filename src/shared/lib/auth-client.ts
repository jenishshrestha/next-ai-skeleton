import { createAuthClient } from 'better-auth/react';
import { lastLoginMethod } from 'better-auth/plugins';

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL, // the base url of your auth server
  plugins: [lastLoginMethod()],
});

export const { signIn, signUp, useSession } = authClient;
