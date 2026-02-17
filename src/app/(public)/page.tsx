import Link from 'next/link';
import { Button } from '@/shared/components/ui/button';

export default function Home() {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-zinc-50 px-4 py-12 dark:bg-zinc-950">
      <main className="relative flex w-full max-w-6xl flex-col items-center justify-center text-center">
        {/* Animated Glow Effect */}
        <div className="bg-primary/10 absolute -top-40 -z-10 h-[500px] w-[500px] animate-pulse rounded-full blur-[120px]" />

        <div className="space-y-6">
          <h1 className="text-3xl leading-[1.1] font-black tracking-tighter sm:text-5xl md:text-6xl">
            Build Faster. <br />
            <span className="from-primary to-primary/40 bg-linear-to-r bg-clip-text text-transparent">
              Vibe Harder.
            </span>
          </h1>

          <p className="text-muted-foreground mx-auto max-w-xl text-sm font-medium sm:text-base">
            The elite Next.js 16 skeleton for developers who demand{' '}
            <br className="hidden md:block" />
            architectural purity and AI-native excellence.
          </p>

          <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="rounded-lg px-8 font-bold shadow-sm">
              <Link href="/docs">Master the Handbook</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-lg px-8 font-bold">
              <a
                href="https://github.com/jenishshrestha/next-ai-skeleton"
                target="_blank"
                rel="noopener noreferrer"
              >
                Source Code
              </a>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
