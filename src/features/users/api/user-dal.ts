import { db } from '@/shared/lib/db';
import { user } from '@/shared/lib/db-schema';
import { dbAction } from '@/dal';
import { eq } from 'drizzle-orm';

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
   * Fetch all users
   */
  getAll: () =>
    dbAction(
      async () => {
        const results = await db.select().from(user);
        return results;
      },
      { errorMessage: 'Failed to fetch all users' },
    ),
};
