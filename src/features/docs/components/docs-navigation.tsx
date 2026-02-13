import Link from 'next/link';

export function DocsNavigation() {
  const links = [
    { title: 'Overview', href: '/docs' },
    { title: 'Architecture', href: '/docs/architecture' },
    { title: 'AI Strategy', href: '/docs/ai-strategy' },
    { title: 'Sample App', href: '/docs/sample-app' },
    { title: 'DX Standards', href: '/docs/dx-standards' },
  ];

  return (
    <nav className="sticky top-24 space-y-2">
      <p className="text-muted-foreground mb-4 px-2 text-xs font-semibold tracking-widest uppercase">
        Technical Handbook
      </p>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="block rounded-md px-2 py-1.5 text-sm font-medium transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          {link.title}
        </Link>
      ))}
    </nav>
  );
}
