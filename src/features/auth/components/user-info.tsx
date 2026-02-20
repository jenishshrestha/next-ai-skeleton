'use client';

import * as React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { cn } from '@/shared/lib/utils';

interface UserInfoProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  className?: string;
  size?: 'sm' | 'default' | 'lg';
  showName?: boolean;
  showEmail?: boolean;
}

/**
 * UserInfo Component
 *
 * A shared component to display user profile information (Avatar, Name, Email).
 * Used in the Header, Sidebar, and other profile contexts.
 */
export function UserInfo({
  user,
  className,
  size = 'default',
  showName = true,
  showEmail = true,
}: UserInfoProps) {
  const initials =
    user.name
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'U';

  const avatarSize = size === 'sm' ? 'size-8' : size === 'lg' ? 'size-12' : 'size-10';
  const nameSize = size === 'sm' ? 'text-xs' : 'text-sm font-bold';
  const emailSize = 'text-xs text-muted-foreground';

  return (
    <div className={cn('flex items-center gap-3 overflow-hidden', className)}>
      <Avatar className={avatarSize}>
        <AvatarImage src={user.image || ''} alt={user.name || ''} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      {(showName || showEmail) && (
        <div className="flex flex-col space-y-0.5 overflow-hidden">
          {showName && <p className={cn('truncate leading-none', nameSize)}>{user.name}</p>}
          {showEmail && <p className={cn('truncate leading-none', emailSize)}>{user.email}</p>}
        </div>
      )}
    </div>
  );
}
