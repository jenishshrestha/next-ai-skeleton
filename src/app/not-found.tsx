import Link from 'next/link';
import { Button } from '@/shared/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center space-y-6 px-4 text-center">
      <div className="space-y-2">
        <h1 className="text-9xl font-extrabold tracking-tighter text-zinc-200 dark:text-zinc-800">
          404
        </h1>
        <h2 className="text-3xl font-bold tracking-tight">Page Not Found</h2>
        <p className="text-muted-foreground mx-auto max-w-[500px]">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Check the URL or
          return to the homepage.
        </p>
      </div>
      <Button asChild size="lg" className="rounded-full px-8">
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
