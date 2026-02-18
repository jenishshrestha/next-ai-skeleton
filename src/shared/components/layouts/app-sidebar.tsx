import { LayoutDashboard, Loader2, Settings, UserCircle } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from '@/shared/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { usePathname } from 'next/navigation';
import { UserInfo } from '@/shared/components/user-info';
import { LogoutMenuItem } from '@/shared/components/logout-menu-item';

import { authClient } from '@/shared/lib/auth-client';

import Link from 'next/link';

const items = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
  },
];

import { Logo } from '@/shared/components/logo';

export function AppSidebar() {
  const pathname = usePathname();
  const { data: activeSession, isPending } = authClient.useSession();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex h-14 items-center border-b px-4 group-data-[state=collapsed]:px-3">
        <Logo href="/dashboard" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title} isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  {isPending ? (
                    <div className="flex w-full items-center justify-center">
                      <Loader2 className="text-muted-foreground size-4 animate-spin" />
                    </div>
                  ) : (
                    <UserInfo user={activeSession?.user || {}} size="sm" className="flex-1" />
                  )}
                  <UserCircle className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem onClick={() => (window.location.href = '/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <LogoutMenuItem />
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
