import { env } from '@/shared/lib/env';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { captcha, lastLoginMethod } from 'better-auth/plugins';
import { db } from './db';
import * as schema from './db-schema';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: schema,
  }),
  baseURL: env.BETTER_AUTH_URL,
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds (5 minutes)
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  advanced: {
    cookiePrefix: 'buildnext',
  },
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
  },
  rateLimit: {
    enabled: true,
    window: 60,
    max: 100,
  },
  plugins: [
    captcha({
      provider: 'cloudflare-turnstile',
      secretKey: env.CAPTCHA_SECRET_KEY,
    }),
    lastLoginMethod({
      storeInDatabase: true,
    }),
  ],
});
