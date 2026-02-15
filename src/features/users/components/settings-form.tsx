'use client';

import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { authClient } from '@/shared/lib/auth-client';
import { profileSchema, type ProfileFormValues } from '../types/settings-schemas';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { Skeleton } from '@/shared/components/ui/skeleton';
import {
  Field,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/shared/components/ui/field';

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function SettingsFormSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="flex flex-col items-center gap-3 md:items-start">
        <Skeleton className="size-20 rounded-full" />
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-40" />
      </div>
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
        <Skeleton className="h-10 w-28" />
      </div>
    </div>
  );
}

interface SettingsFormProps {
  initialSession?: typeof authClient.$Infer.Session;
}

export function SettingsForm({ initialSession }: SettingsFormProps) {
  const { data: session, isPending } = authClient.useSession();

  const currentSession = session || initialSession;

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    mode: 'onChange',
    defaultValues: {
      name: currentSession?.user?.name || '',
    },
  });

  // Sync session data into form once loaded
  useEffect(() => {
    if (session?.user?.name) {
      form.reset({ name: session.user.name });
    }
  }, [session?.user?.name, form]);

  const onSubmit = async (data: ProfileFormValues) => {
    const { error } = await authClient.updateUser({
      name: data.name,
    });

    if (error) {
      toast.error(error.message || 'Failed to update profile');
      return;
    }

    toast.success('Profile updated successfully');
  };

  if (isPending) {
    return <SettingsFormSkeleton />;
  }

  const isDirty = form.formState.isDirty;
  const isSubmitting = form.formState.isSubmitting;
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
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="settings-name">Display Name</FieldLabel>
                <FieldControl>
                  <Input
                    id="settings-name"
                    placeholder="Your display name"
                    aria-invalid={fieldState.invalid}
                    {...field}
                  />
                </FieldControl>
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
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
      </form>
    </div>
  );
}
