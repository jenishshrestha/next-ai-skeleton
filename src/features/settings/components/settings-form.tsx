'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { Button } from '@/shared/components/ui/button';
import {
  Field,
  FieldControl,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/shared/components/form/field';
import { Input } from '@/shared/components/ui/input';
import { Form } from '@/shared/components/form/form';
import { authClient } from '@/shared/lib/auth-client';
import { useServerSession } from '@/shared/providers/session-provider';
import { getInitials } from '@/shared/lib/utils';

import {
  profileSchema,
  type ProfileFormValues,
  type SettingsFormProps,
} from '../types/schemas';

export function SettingsForm({ initialSession }: SettingsFormProps) {
  const { session, updateSession } = useServerSession();
  const currentSession = session || initialSession;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    mode: 'onChange',
    defaultValues: {
      name: currentSession?.user?.name || '',
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    setIsSubmitting(true);
    try {
      await authClient.updateUser({ name: data.name });
      updateSession({ name: data.name });
      form.reset({ name: data.name });
      toast.success('Profile updated successfully');
    } catch {
      toast.error('Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDirty = form.formState.isDirty;
  const userName = currentSession?.user?.name || '';
  const userEmail = currentSession?.user?.email || '';
  const userImage = currentSession?.user?.image;

  return (
    <div className="grid gap-6 md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* Left: Avatar + Info */}
      <div className="flex flex-col items-center gap-3 md:items-start">
        <Avatar className="size-20 text-lg">
          {userImage && <AvatarImage src={userImage} alt={userName} />}
          <AvatarFallback>{userName ? getInitials(userName) : '?'}</AvatarFallback>
        </Avatar>
        <div className="text-center md:text-left">
          <p className="text-sm font-medium">{userName}</p>
          <p className="text-muted-foreground text-xs">{userEmail}</p>
        </div>
      </div>

      {/* Right: Form */}
      <Form form={form} onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Form.Field name="name" label="Display Name">
            <Input placeholder="Your display name" />
          </Form.Field>

          <Field>
            <FieldLabel htmlFor="settings-email">Email Address</FieldLabel>
            <FieldControl>
              <Input id="settings-email" value={userEmail} readOnly disabled />
            </FieldControl>
            <FieldDescription>
              Your email is managed by your authentication provider.
            </FieldDescription>
          </Field>

          <div>
            <Button type="submit" disabled={!isDirty || isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </FieldGroup>
      </Form>
    </div>
  );
}
