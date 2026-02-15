'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { authClient } from '@/shared/lib/auth-client';
import { changePasswordSchema, type ChangePasswordFormValues } from '../types/settings-schemas';
import { PasswordInput } from '@/shared/components/ui/password-input';
import { Button } from '@/shared/components/ui/button';
import { Skeleton } from '@/shared/components/ui/skeleton';
import {
  Field,
  FieldControl,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/shared/components/ui/field';

export function ChangePasswordSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="space-y-1.5">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-4 w-48" />
      </div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
        <Skeleton className="h-10 w-36" />
      </div>
    </div>
  );
}

export function ChangePasswordForm() {
  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    mode: 'onChange',
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: ChangePasswordFormValues) => {
    const { error } = await authClient.changePassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });

    if (error) {
      toast.error(error.message || 'Failed to change password');
      return;
    }

    toast.success('Password changed successfully');
    form.reset();
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <div className="grid gap-6 md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* Left: Section description */}
      <div>
        <h3 className="text-sm font-medium">Password</h3>
        <p className="text-muted-foreground mt-1 text-xs">
          Update your password to keep your account secure.
        </p>
      </div>

      {/* Right: Form */}
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            control={form.control}
            name="currentPassword"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="current-password">Current Password</FieldLabel>
                <FieldControl>
                  <PasswordInput
                    id="current-password"
                    placeholder="••••••••"
                    aria-invalid={fieldState.invalid}
                    {...field}
                  />
                </FieldControl>
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="newPassword"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="new-password">New Password</FieldLabel>
                <FieldControl>
                  <PasswordInput
                    id="new-password"
                    placeholder="••••••••"
                    aria-invalid={fieldState.invalid}
                    {...field}
                  />
                </FieldControl>
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="confirmPassword"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="confirm-password">Confirm New Password</FieldLabel>
                <FieldControl>
                  <PasswordInput
                    id="confirm-password"
                    placeholder="••••••••"
                    aria-invalid={fieldState.invalid}
                    {...field}
                  />
                </FieldControl>
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
          <div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Changing...' : 'Change Password'}
            </Button>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
}
