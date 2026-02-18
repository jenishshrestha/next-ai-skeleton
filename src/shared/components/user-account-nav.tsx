import { useSession } from '@/shared/lib/auth-client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { Button } from '@/shared/components/ui/button';
import { UserInfo } from '@/shared/components/user-info';
import { LogoutMenuItem } from '@/shared/components/logout-menu-item';

export function UserAccountNav() {
  const { data: session } = useSession();

  if (!session) return null;

  const user = session.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="ring-offset-background hover:ring-ring relative h-8 w-8 rounded-full p-0 transition-all hover:ring-2 hover:ring-offset-2"
        >
          <UserInfo user={user} showName={false} showEmail={false} size="sm" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end" forceMount>
        {/* Profile Summary */}
        <UserInfo user={user} className="p-4" size="lg" />

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => (window.location.href = '/dashboard')}>
          Dashboard
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => (window.location.href = '/settings')}>
          Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Logout */}
        <div className="px-1">
          <LogoutMenuItem />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
