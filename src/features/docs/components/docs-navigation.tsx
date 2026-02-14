'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/shared/lib/utils';

export function DocsNavigation() {
  const pathname = usePathname();

  const links = [
    { title: 'Getting Started', href: '/docs/getting-started' },
    { title: 'Architecture (FDD)', href: '/docs/architecture' },
    { title: 'Engineering Standards', href: '/docs/engineering-standards' },
    { title: 'API Communication (DAL)', href: '/docs/dal' },
    { title: 'Testing Strategy', href: '/docs/testing' },
    { title: 'Agent Intelligence', href: '/docs/agent-intelligence' },
    { title: 'Deployment', href: '/docs/deployment' },
  ];

  return (
    <nav className="sticky top-24 space-y-2">
      <p className="text-muted-foreground mb-4 px-2 text-xs font-semibold tracking-widest uppercase">
        Technical Handbook
      </p>
      {links.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'block rounded-md px-2 py-1.5 text-sm font-medium transition-colors',
              isActive
                ? 'text-foreground bg-zinc-100 dark:bg-zinc-800'
                : 'text-muted-foreground hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800',
            )}
          >
            {link.title}
          </Link>
        );
      })}
    </nav>
  );
}
