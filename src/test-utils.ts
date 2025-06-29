// Test utilities for better TypeScript support with custom matchers
import { expect } from '@jest/globals';

// Type-safe wrapper for custom matchers
export function expectCustom<T>(actual: T) {
  return expect(actual) as any;
}

// Type-safe wrapper for asymmetric matchers
export const expectAsymmetric = expect as any;
