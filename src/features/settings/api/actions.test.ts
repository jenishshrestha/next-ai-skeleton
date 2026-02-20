import { describe, expect, it } from 'bun:test';
import { updateProfileAction, changePasswordAction } from './actions';

describe('Settings Actions (Integration Layer)', () => {
  it('updateProfileAction should be a valid SafeAction', () => {
    expect(updateProfileAction).toBeDefined();
    expect(typeof updateProfileAction).toBe('function');
  });

  it('changePasswordAction should be a valid SafeAction', () => {
    expect(changePasswordAction).toBeDefined();
    expect(typeof changePasswordAction).toBe('function');
  });
});
