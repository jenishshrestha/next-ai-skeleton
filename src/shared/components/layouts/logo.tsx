import Link from 'next/link';
import { cn } from '@/shared/lib/utils';
import LyreLogo from '@/shared/assets/icons/lyre-logo.svg';

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
      <LyreLogo className={cn('h-6 w-6 shrink-0', iconClassName)} />
      <span className={cn('truncate group-data-[state=collapsed]:hidden', textClassName)}>
        Lyre
      </span>
    </Link>
  );
}
