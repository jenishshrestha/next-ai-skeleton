import { createSafeActionClient, DEFAULT_SERVER_ERROR_MESSAGE } from 'next-safe-action';
import { getServerSession } from './dal/session';

/**
 * Base Action Client
 *
 * Use this for actions that don't require authentication.
 * Provides consistent error handling logic.
 */
export const actionClient = createSafeActionClient({
  handleServerError(e) {
    if (e instanceof Error) {
      return e.message;
    }
    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
});

/**
 * Authenticated Action Client
 *
 * Use this for actions that require a valid user session.
 * Automatically injects the `session` into the action's context.
 */
export const authActionClient = actionClient.use(async ({ next }) => {
  const session = await getServerSession();

  if (!session) {
    throw new Error('Unauthorized: You must be logged in to perform this action.');
  }

  return next({
    ctx: {
      session,
      user: session.user,
    },
  });
});
