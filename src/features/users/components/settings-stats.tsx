'use client';

import { authClient } from '@/shared/lib/auth-client';
import { Skeleton } from '@/shared/components/ui/skeleton';

export function SettingsStatsSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="space-y-1.5">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-4 w-44" />
      </div>
      <div className="space-y-3">
        {[1, 2].map((i) => (
          <div key={i} className="flex justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32" />
          </div>
        ))}
      </div>
    </div>
  );
}

interface SettingsStatsProps {
  initialSession?: typeof authClient.$Infer.Session;
}

export function SettingsStats({ initialSession }: SettingsStatsProps) {
  const { data: session } = authClient.useSession();

  const currentSession = session || initialSession;

  return (
    <div className="grid gap-6 md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* Left: Section description */}
      <div>
        <h3 className="text-sm font-medium">Account</h3>
        <p className="text-muted-foreground mt-1 text-xs">
          Details about your account registration.
        </p>
      </div>

      {/* Right: Stats */}
      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Member Since</span>
          <span className="text-foreground font-medium">
            {currentSession?.user?.createdAt
              ? new Date(currentSession.user.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : '—'}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Auth Provider</span>
          <span className="text-foreground font-medium capitalize">
            {currentSession?.user && 'lastLoginMethod' in currentSession.user
              ? String(currentSession.user.lastLoginMethod)
              : 'Credentials'}
          </span>
        </div>
      </div>
    </div>
  );
}
