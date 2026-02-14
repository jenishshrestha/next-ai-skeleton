'use client';

import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/shared/lib/utils';
import { Label } from '@/shared/components/ui/label';

const FieldSet = ({ className, ref, ...props }: React.ComponentProps<'fieldset'>) => (
  <fieldset ref={ref} className={cn('grid gap-6', className)} {...props} />
);
FieldSet.displayName = 'FieldSet';

const FieldLegend = ({
  className,
  variant = 'legend',
  ref,
  ...props
}: React.ComponentProps<'legend'> & { variant?: 'legend' | 'label' }) => (
  <legend
    ref={ref}
    className={cn(
      variant === 'label'
        ? 'text-sm leading-none font-medium tracking-tight'
        : 'text-lg leading-none font-semibold tracking-tight',
      className,
    )}
    {...props}
  />
);
FieldLegend.displayName = 'FieldLegend';

const FieldGroup = ({ className, ref, ...props }: React.ComponentProps<'div'>) => (
  <div
    ref={ref}
    className={cn('@container/field-group flex flex-col gap-6', className)}
    {...props}
  />
);
FieldGroup.displayName = 'FieldGroup';

const Field = ({
  className,
  orientation = 'vertical',
  ref,
  ...props
}: React.ComponentProps<'div'> & { orientation?: 'vertical' | 'horizontal' | 'responsive' }) => {
  return (
    <div
      ref={ref}
      data-orientation={orientation}
      className={cn(
        'group/field flex flex-col gap-2',
        orientation === 'horizontal' && 'flex-row items-center justify-between gap-4',
        orientation === 'responsive' &&
          'flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-4',
        className,
      )}
      {...props}
    />
  );
};
Field.displayName = 'Field';

const FieldContent = ({ className, ref, ...props }: React.ComponentProps<'div'>) => (
  <div ref={ref} className={cn('flex flex-col gap-1.5', className)} {...props} />
);
FieldContent.displayName = 'FieldContent';

const FieldLabel = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & {
  ref?: React.Ref<React.ElementRef<typeof LabelPrimitive.Root>>;
}) => {
  return <Label ref={ref} className={cn(className)} {...props} />;
};
FieldLabel.displayName = 'FieldLabel';

const FieldTitle = ({ className, ref, ...props }: React.ComponentProps<'div'>) => (
  <div
    ref={ref}
    className={cn('text-sm leading-none font-medium tracking-tight', className)}
    {...props}
  />
);
FieldTitle.displayName = 'FieldTitle';

const FieldControl = ({
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof Slot> & {
  ref?: React.Ref<React.ElementRef<typeof Slot>>;
}) => {
  return <Slot ref={ref} {...props} />;
};
FieldControl.displayName = 'FieldControl';

const FieldDescription = ({ className, ref, ...props }: React.ComponentProps<'p'>) => {
  return (
    <p ref={ref} className={cn('text-muted-foreground text-[0.8rem]', className)} {...props} />
  );
};
FieldDescription.displayName = 'FieldDescription';

const FieldError = ({
  className,
  children,
  errors,
  ref,
  ...props
}: React.ComponentProps<'div'> & { errors?: Array<{ message?: string } | undefined> }) => {
  const messages =
    errors
      ?.filter(Boolean)
      .map((e) => e?.message)
      .filter(Boolean) || [];
  const body = messages.length > 0 ? messages : children ? [children] : [];

  if (body.length === 0) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={cn(
        'animate-in fade-in slide-in-from-top-1 text-destructive space-y-1 text-xs font-medium',
        className,
      )}
      {...props}
    >
      {body.map((msg, i) => (
        <p key={i}>{String(msg)}</p>
      ))}
    </div>
  );
};
FieldError.displayName = 'FieldError';

const FieldSeparator = ({ className, children, ref, ...props }: React.ComponentProps<'div'>) => (
  <div
    ref={ref}
    className={cn('text-muted-foreground flex items-center gap-4 text-sm font-medium', className)}
    {...props}
  >
    <div className="bg-border h-px flex-1" />
    {children}
    <div className="bg-border h-px flex-1" />
  </div>
);
FieldSeparator.displayName = 'FieldSeparator';

export {
  FieldSet,
  FieldLegend,
  FieldGroup,
  Field,
  FieldContent,
  FieldLabel,
  FieldTitle,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldSeparator,
};
