import Link from 'next/link';
import { cn } from '@/shared/lib/utils';
import { SvgIcon } from '@/shared/components/ui/svg-icon';
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
      <SvgIcon icon={LyreLogo} className={cn('h-6 w-6 text-white', iconClassName)} />
      <span className={cn('truncate group-data-[state=collapsed]:hidden', textClassName)}>
        BuildNext
      </span>
    </Link>
  );
}
