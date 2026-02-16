import { db } from '@/shared/lib/db';
import { user } from '@/shared/lib/db-schema';
import { dbAction } from '@/dal';
import { eq } from 'drizzle-orm';
import { auth } from '@/shared/lib/auth';
import { headers } from 'next/headers';
import { type ChangePasswordFormValues } from '../types/settings-schemas';

/**
 * User Data Access Layer
 *
 * Centralizes all direct database interactions for the User feature.
 */
export const UserDAL = {
  /**
   * Fetch a single user by ID
   */
  getById: (id: string) =>
    dbAction(
      async () => {
        const results = await db.select().from(user).where(eq(user.id, id)).limit(1);
        return results[0] || null;
      },
      { errorMessage: 'Failed to fetch user by ID' },
    ),

  /**
   * Update user profile
   * Utilizes dbAction for consistent error handling and revalidation.
   */
  updateProfile: (id: string, name: string) =>
    dbAction(
      async () => {
        const [updated] = await db
          .update(user)
          .set({ name, updatedAt: new Date() })
          .where(eq(user.id, id))
          .returning();
        return updated;
      },
      { revalidate: '/settings', errorMessage: 'Failed to update user profile in database' },
    ),

  /**
   * Change user password
   * Wraps Better Auth API in dbAction for consistent error handling and session context.
   */
  changePassword: (data: ChangePasswordFormValues) =>
    dbAction(
      async () => {
        const response = await auth.api.changePassword({
          headers: await headers(),
          body: {
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
          },
        });
        return response;
      },
      { errorMessage: 'Failed to change password' },
    ),
};
