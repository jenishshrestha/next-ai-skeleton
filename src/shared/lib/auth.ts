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
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
  },
  advanced: {
    cookiePrefix: 'next-ai-skeleton',
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  user: {
    additionalFields: {
      lastLoginMethod: {
        type: 'string',
        defaultValue: 'credentials',
      },
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
      secretKey: process.env.CAPTCHA_SECRET_KEY as string,
    }),
    lastLoginMethod({
      storeInDatabase: true,
    }),
  ],
});
