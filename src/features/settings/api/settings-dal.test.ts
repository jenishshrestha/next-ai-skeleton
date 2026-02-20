import { describe, expect, it, mock } from 'bun:test';
import { createMockDb } from '@tests/mocks/db';

// 1. Create the mock
const { dbMock, chain } = createMockDb();

// 2. INTERCEPT the global db import
mock.module('@/shared/lib/db', () => ({
  db: dbMock,
}));

// 3. Mock Next.js cache 
mock.module('next/cache', () => ({
  revalidatePath: mock(() => {}),
  revalidateTag: mock(() => {}),
}));

import { SettingsDAL } from './settings-dal';

describe('SettingsDAL (Automated Magic)', () => {
  it('updateProfile correctly constructs the update query without manual DI', async () => {
    const updatedUser = {
      id: '123',
      name: 'Updated Name',
      email: 'test@example.com',
      emailVerified: false,
      image: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastLoginMethod: 'credentials',
    };
    chain.mockResolve([updatedUser]);

    // Clean call, clean code.
    const result = await SettingsDAL.updateProfile('123', 'Updated Name');

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data?.name).toBe('Updated Name');
    }

    expect(dbMock.update).toHaveBeenCalled();
    expect(chain.set).toHaveBeenCalled();
  });
});
