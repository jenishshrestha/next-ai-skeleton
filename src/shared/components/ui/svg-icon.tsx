import type { ComponentType, SVGProps } from 'react';
import { cn } from '@/shared/lib/utils';

interface SvgIconProps extends SVGProps<SVGSVGElement> {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  className?: string;
}

export function SvgIcon({ icon: Icon, className, ...props }: SvgIconProps) {
  return <Icon className={cn('h-[1em] shrink-0', className)} fill="currentColor" {...props} />;
}
