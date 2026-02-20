'use client';

import Link from 'next/link';
import { Logo } from './logo';
import { ThemeToggle } from './theme-toggle';
import { UserAccountNav } from '@/features/auth';
import { useServerSession } from '@/shared/providers/session-provider';
import { Button } from '@/shared/components/ui/button';

export function Header() {
  const { session } = useServerSession();

  return (
    <header className="bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Logo */}
        <Logo textClassName="text-xl font-black tracking-tighter" />

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {session ? (
            <UserAccountNav />
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/signup">Sign up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
