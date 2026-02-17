'use client';

import { GithubIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/shared/components/logo';

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/shared/components/ui/navigation-menu';
import { Button } from '@/shared/components/ui/button';

const navLinks = [
  { href: '/login', label: 'Login' },
  { href: '/docs', label: 'Docs' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md dark:bg-zinc-900/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Logo textClassName="text-xl font-black tracking-tighter" />

        <NavigationMenu>
          <NavigationMenuList>
            {navLinks.map(({ href, label }) => (
              <NavigationMenuItem key={href}>
                <NavigationMenuLink
                  asChild
                  data-active={pathname.startsWith(href) || undefined}
                  className={navigationMenuTriggerStyle({
                    className:
                      'data-[active=true]:bg-accent data-[active=true]:text-accent-foreground data-[active=true]:font-semibold',
                  })}
                >
                  <Link href={href}>{label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
            <NavigationMenuItem>
              <Button asChild variant="ghost" size="icon-sm">
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/jenishshrestha/next-ai-skeleton"
                >
                  <GithubIcon className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
