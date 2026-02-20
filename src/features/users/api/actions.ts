'use server';

import { authActionClient } from '@/shared/lib/safe-action';
import { UserDAL } from './user-dal';



/**
 * Get All Users Action
 */
export const getUsersAction = authActionClient
  .action(async () => {
    const result = await UserDAL.getAll();

    if (!result.success) {
      throw new Error(result.message);
    }

    return result.data;
  });
