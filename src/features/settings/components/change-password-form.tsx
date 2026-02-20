'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useAction } from 'next-safe-action/hooks';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/shared/components/ui/button';
import { FieldGroup } from '@/shared/components/form/field';
import { PasswordInput } from '@/shared/components/form/password-input';

import { Form } from '@/shared/components/form/form';
import { changePasswordAction } from '../api/actions';
import { changePasswordSchema, type ChangePasswordFormValues } from '../types/schemas';

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

  const { execute, isExecuting } = useAction(changePasswordAction, {
    onSuccess: () => {
      toast.success('Password changed successfully');
      form.reset();
    },
    onError: ({ error }) => {
      toast.error(
        typeof error.serverError === 'string' ? error.serverError : 'Failed to change password',
      );
    },
  });

  const onSubmit = (data: ChangePasswordFormValues) => {
    execute(data);
  };

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
      <Form form={form} onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Form.Field name="currentPassword" label="Current Password">
            <PasswordInput placeholder="••••••••" />
          </Form.Field>

          <Form.Field name="newPassword" label="New Password">
            <PasswordInput placeholder="••••••••" />
          </Form.Field>

          <Form.Field name="confirmPassword" label="Confirm New Password">
            <PasswordInput placeholder="••••••••" />
          </Form.Field>

          <div>
            <Button type="submit" disabled={isExecuting}>
              {isExecuting ? 'Changing...' : 'Change Password'}
            </Button>
          </div>
        </FieldGroup>
      </Form>
    </div>
  );
}
