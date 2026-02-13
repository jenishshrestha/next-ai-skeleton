import { Github } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/shared/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md dark:bg-zinc-900/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="transition-opacity hover:opacity-80">
          <p className="text-xl font-black tracking-tighter">next-ai-skeleton</p>
        </Link>
        <nav className="flex items-center gap-2 text-sm font-medium" aria-label="Main navigation">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Link href="/docs">Docs</Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="icon-sm"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/jenishshrestha/next-ai-skeleton"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
