import { describe, expect, it, mock } from 'bun:test';
import { createMockDb } from '@tests/mocks/db';

// 1. Create the mock
const { dbMock, chain } = createMockDb();

// 2. INTERCEPT the global db import
// This "Automated Magic" means UserDAL uses the mock without knowing it!
mock.module('@/shared/lib/db', () => ({
  db: dbMock,
}));

// 3. Mock Next.js cache (standard for any Next.js unit test)
mock.module('next/cache', () => ({
  revalidatePath: mock(() => {}),
  revalidateTag: mock(() => {}),
}));

// Now we import the real UserDAL (uncorrupted by test code)
import { UserDAL } from './user-dal';

describe('UserDAL (Automated Magic)', () => {
  it('getById correctly constructs the select query without manual DI', async () => {
    // Setup mock return value
    const mockUser = {
      id: '123',
      name: 'Test User',
      email: 'test@example.com',
      emailVerified: false,
      image: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastLoginMethod: 'credentials',
    };
    chain.mockResolve([mockUser]);

    // NO EXTRA PARAMETERS! Just call the function normally.
    const result = await UserDAL.getById('123');

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(mockUser);
    }

    // Verify the mock was called correctly
    expect(dbMock.select).toHaveBeenCalled();
    expect(chain.where).toHaveBeenCalled();
  });

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
    const result = await UserDAL.updateProfile('123', 'Updated Name');

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data?.name).toBe('Updated Name');
    }

    expect(dbMock.update).toHaveBeenCalled();
    expect(chain.set).toHaveBeenCalled();
  });
});
