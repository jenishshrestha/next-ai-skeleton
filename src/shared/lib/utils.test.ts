import { describe, expect, it } from 'bun:test';
import { cn } from './utils';

describe('Shared Utilities', () => {
  describe('cn (Class Merging)', () => {
    it('merges tailwind classes correctly', () => {
      const result = cn('px-2 py-1', 'bg-red-500 px-4');
      // bg-red-500 should stay, px-4 should override px-2
      expect(result).toContain('bg-red-500');
      expect(result).toContain('px-4');
      expect(result).not.toContain('px-2');
    });

    it('handles conditional classes', () => {
      const isActive = true;
      const result = cn('base', isActive && 'active', !isActive && 'hidden');
      expect(result).toBe('base active');
    });

    it('handles undefined and null inputs gracefullly', () => {
      const result = cn('base', undefined, null, false, 'extra');
      expect(result).toBe('base extra');
    });
  });
});
