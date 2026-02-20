'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

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
  updateSession: (data: Partial<SessionUser>) => void;
}

const SessionContext = createContext<SessionContextValue>({
  session: null,
  isPending: true,
  updateSession: () => {},
});

export function SessionProvider({
  children,
  session: initialSession,
}: {
  children: ReactNode;
  session: SessionData | null;
}) {
  const [session, setSession] = useState<SessionData | null>(initialSession);

  const updateSession = useCallback((data: Partial<SessionUser>) => {
    setSession((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        user: { ...prev.user, ...data },
      };
    });
  }, []);

  const value = useMemo(
    () => ({ session, isPending: false, updateSession }),
    [session, updateSession],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useServerSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useServerSession must be used within a SessionProvider');
  }
  return context;
}

