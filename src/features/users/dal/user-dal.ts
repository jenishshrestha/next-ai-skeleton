import { db } from '@/shared/lib/db';
import { user } from '@/shared/lib/db-schema';
import { dbAction } from '@/dal';
import { eq, sql } from 'drizzle-orm';

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
   * Get basic stats for the dashboard (Example)
   */
  getDashboardStats: () =>
    dbAction(
      async () => {
        const [userCount] = await db.select({ count: sql<number>`count(*)` }).from(user);
        return {
          totalUsers: Number(userCount?.count || 0),
          activeSessions: 0, // Placeholder
        };
      },
      { errorMessage: 'Failed to fetch dashboard stats' },
    ),
};
