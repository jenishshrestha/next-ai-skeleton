import { eq } from 'drizzle-orm';
import { db } from '../db';
import { user, account } from '../db-schema';

import { hashPassword } from 'better-auth/crypto';

async function seed() {
  console.log('🌱 Starting database seeding...');

  try {
    const testUserEmail = 'test@example.com';
    const testPassword = 'password123';

    // 1. Clean up existing test data for idempotency
    console.log('Seeding Initialized...');
    await db.delete(user).where(eq(user.email, testUserEmail));
    // Account is deleted via cascade if the DB schema is set up with onDelete: 'cascade'
    // But we'll be explicit to be safe if cascade isn't active on all environments

    // 2. Hash the password using Better Auth's standard
    const hashedPassword = await hashPassword(testPassword);

    const userId = crypto.randomUUID();
    const accountId = crypto.randomUUID();

    // 3. Create the User
    console.log('👤 Creating "Golden Test User"...');
    await db
      .insert(user)
      .values({
        id: userId,
        name: 'Test Admin',
        email: testUserEmail,
        emailVerified: true,
        lastLoginMethod: 'credentials',
      })
      .onConflictDoNothing();

    // 4. Create the Account (linking password)
    console.log('🔑 Linking credentials account...');
    await db
      .insert(account)
      .values({
        id: accountId,
        userId: userId,
        accountId: userId,
        providerId: 'credentials',
        password: hashedPassword,
      })
      .onConflictDoNothing();

    console.log('\n✅ Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

seed();
