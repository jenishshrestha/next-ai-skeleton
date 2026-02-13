import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white dark:bg-zinc-900">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="transition-opacity hover:opacity-80">
          <p className="text-wrap-balance text-xl font-bold tracking-tighter">Next AI Skeleton</p>
        </Link>
        <nav className="flex gap-4 text-sm font-medium" aria-label="Main navigation">
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/jenishshrestha/next-ai-skeleton"
            className="inline-flex items-center gap-1 hover:underline"
          >
            GitHub
            <span className="sr-only">(opens in a new tab)</span>
          </Link>
          <Link href="/docs" className="text-muted-foreground hover:underline">
            Docs
          </Link>
        </nav>
      </div>
    </header>
  );
}
