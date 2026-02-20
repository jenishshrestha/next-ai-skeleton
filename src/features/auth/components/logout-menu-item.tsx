'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Loader2 } from 'lucide-react';
import { DropdownMenuItem } from '@/shared/components/ui/dropdown-menu';
import { authClient } from '@/shared/lib/auth-client';
import { cn } from '@/shared/lib/utils';

interface LogoutMenuItemProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuItem> {
  showIcon?: boolean;
}

/**
 * LogoutMenuItem Component
 *
 * A specialized menu item for logout functionality.
 * Centralizes authentication logic, loading states, and redirection.
 */
export function LogoutMenuItem({
  className,
  showIcon = true,
  children,
  ...props
}: LogoutMenuItemProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogout = async (e: Event) => {
    // Prevent the menu from closing immediately so we can show the loading state
    e.preventDefault();

    if (isLoading) return;

    setIsLoading(true);
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push('/login');
          },
          onError: () => {
            setIsLoading(false);
          },
        },
      });
    } catch (error) {
      console.error('Logout failed:', error);
      setIsLoading(false);
    }
  };

  return (
    <DropdownMenuItem
      className={cn(
        'text-destructive focus:bg-destructive/10 focus:text-destructive flex cursor-pointer items-center gap-3 px-3 py-2',
        isLoading && 'pointer-events-none opacity-70',
        className,
      )}
      onSelect={handleLogout}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        showIcon && <LogOut className="size-4" />
      )}
      <span className="text-sm font-medium">
        {isLoading ? 'Logging out...' : children || 'Log out'}
      </span>
    </DropdownMenuItem>
  );
}
