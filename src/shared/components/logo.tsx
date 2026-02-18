import Link from 'next/link';
import Image from 'next/image';
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
        <Image
          src="/images/lyre-logo.svg"
          alt="Lyre Logo"
          width={16}
          height={16}
          className="invert dark:invert-0"
        />
      </div>
      <span className={cn('truncate group-data-[state=collapsed]:hidden', textClassName)}>
        Lyre
      </span>
    </Link>
  );
}
