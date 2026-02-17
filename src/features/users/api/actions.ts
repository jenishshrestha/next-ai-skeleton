'use server';

import { authActionClient } from '@/shared/lib/safe-action';
import { profileSchema, changePasswordSchema } from '../types/settings-schemas';
import { UserDAL } from './user-dal';

/**
 * Update Profile Action
 */
export const updateProfileAction = authActionClient
  .inputSchema(profileSchema)
  .action(async ({ parsedInput: data, ctx: { user } }) => {
    const result = await UserDAL.updateProfile(user.id, data.name);

    if (!result.success) {
      throw new Error(result.message);
    }

    return {
      success: true,
      user: result.data,
    };
  });

/**
 * Change Password Action
 */
export const changePasswordAction = authActionClient
  .inputSchema(changePasswordSchema)
  .action(async ({ parsedInput: data }) => {
    const result = await UserDAL.changePassword(data);

    if (!result.success) {
      throw new Error(result.message);
    }

    return {
      success: true,
    };
  });
