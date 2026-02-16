import * as React from 'react';
import { cn } from '@/shared/lib/utils';

/**
 * PageHeader Compound Component
 *
 * Provides a standardized structure for dashboard page headers.
 *
 * @example
 * <PageHeader>
 *   <PageHeader.Title>Settings</PageHeader.Title>
 *   <PageHeader.Description>Manage your preferences.</PageHeader.Description>
 * </PageHeader>
 */
export function PageHeader({ children, className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex flex-col gap-1', className)} {...props}>
      {children}
    </div>
  );
}

PageHeader.Title = function PageHeaderTitle({ className, ...props }: React.ComponentProps<'h2'>) {
  return <h2 className={cn('text-3xl font-bold tracking-tight', className)} {...props} />;
};

PageHeader.Description = function PageHeaderDescription({
  className,
  ...props
}: React.ComponentProps<'p'>) {
  return <p className={cn('text-muted-foreground', className)} {...props} />;
};

PageHeader.Actions = function PageHeaderActions({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return <div className={cn('flex items-center gap-2 pt-2', className)} {...props} />;
};
