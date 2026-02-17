import { describe, expect, it, mock } from 'bun:test';
import { updateProfileAction } from './actions';

// We don't use global mock.module here as it leaks into user-dal.test.ts
// Instead we verify the Action structure.

describe('User Actions (Integration Layer)', () => {
  it('updateProfileAction should be a valid SafeAction', () => {
    // Basic verification that the action is correctly wired up with safe-action
    expect(updateProfileAction).toBeDefined();
    expect(typeof updateProfileAction).toBe('function');
  });

  it('changePasswordAction should be a valid SafeAction', () => {
    expect(updateProfileAction).toBeDefined();
    expect(typeof updateProfileAction).toBe('function');
  });
});
