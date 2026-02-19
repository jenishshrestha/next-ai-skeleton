'use client';

import * as React from 'react';

/**
 * Session data shape from Better Auth.
 * Matches the structure returned by `auth.api.getSession()`.
 */
interface SessionUser {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
  ipAddress?: string | null;
  userAgent?: string | null;
}

export interface SessionData {
  session: Session;
  user: SessionUser;
}

interface SessionContextValue {
  session: SessionData | null;
  isPending: boolean;
}

const SessionContext = React.createContext<SessionContextValue>({
  session: null,
  isPending: true,
});

/**
 * SessionProvider
 *
 * Wraps the application in a server-hydrated session context.
 * The session is fetched once on the server (in RootLayout) and passed down,
 * eliminating client-side refetches and loading flickers.
 */
export function SessionProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: SessionData | null;
}) {
  const value = React.useMemo(() => ({ session, isPending: false }), [session]);

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

/**
 * useServerSession
 *
 * Returns the server-hydrated session from the context.
 * Use this instead of `useSession` from `auth-client` when you want
 * the instant, zero-fetch session data.
 */
export function useServerSession() {
  const context = React.useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useServerSession must be used within a SessionProvider');
  }
  return context;
}
