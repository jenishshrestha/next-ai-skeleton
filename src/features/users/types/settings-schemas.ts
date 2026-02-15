import { z } from 'zod';

// Profile Update Schema
export const profileSchema = z.object({
  name: z.string().min(1, 'Display name is required').max(100, 'Display name is too long'),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

// Change Password Schema
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(8, 'New password must be at least 8 characters long'),
    confirmPassword: z.string().min(1, 'Please confirm your new password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
