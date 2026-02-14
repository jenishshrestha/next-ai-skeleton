import { describe, expect, it } from 'bun:test';
import { loginSchema, forgotPasswordSchema } from './auth-schemas';

describe('Auth Schemas (Unit Tests)', () => {
  describe('loginSchema', () => {
    it('should validate a correct login attempt', () => {
      const result = loginSchema.safeParse({
        email: 'test@example.com',
        password: 'password123',
      });
      expect(result.success).toBe(true);
    });

    it('should fail on invalid email', () => {
      const result = loginSchema.safeParse({
        email: 'invalid-email',
        password: 'password123',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Please enter a valid email address');
      }
    });

    it('should fail on too short password', () => {
      const result = loginSchema.safeParse({
        email: 'test@example.com',
        password: 'short',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Password must be at least 8 characters long');
      }
    });
  });

  describe('forgotPasswordSchema', () => {
    it('should validate a correct email address', () => {
      const result = forgotPasswordSchema.safeParse({
        email: 'test@example.com',
      });
      expect(result.success).toBe(true);
    });

    it('should fail on invalid email', () => {
      const result = forgotPasswordSchema.safeParse({
        email: 'not-an-email',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Please enter a valid email address');
      }
    });

    it('should fail on empty email', () => {
      const result = forgotPasswordSchema.safeParse({
        email: '',
      });
      expect(result.success).toBe(false);
    });
  });
});
