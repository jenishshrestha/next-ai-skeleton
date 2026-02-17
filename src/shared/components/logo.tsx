import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface LogoProps {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  href?: string;
}

export function Logo({ className, iconClassName, textClassName, href = '/' }: LogoProps) {
  return (
    <Link
      href={href}
      className={cn('flex items-center gap-2 font-semibold tracking-tight', className)}
    >
      <div
        className={cn(
          'bg-primary text-primary-foreground flex h-6 w-6 shrink-0 items-center justify-center rounded',
          iconClassName,
        )}
      >
        <Sparkles className="h-4 w-4" />
      </div>
      <span className={cn('truncate group-data-[state=collapsed]:hidden', textClassName)}>
        Next AI Skeleton
      </span>
    </Link>
  );
}
