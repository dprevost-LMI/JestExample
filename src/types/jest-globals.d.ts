// Jest 30 ambient declarations
// This file provides TypeScript declarations for Jest globals without relying on @types/jest

// Define the core Jest types based on the actual @jest/globals exports
export declare global {
  // Re-export types from @jest/globals for ambient use
  const describe: typeof import('@jest/globals').describe;
  const it: typeof import('@jest/globals').it;
  const test: typeof import('@jest/globals').test;
  const expect: typeof import('@jest/globals').expect & {
    // Add our custom asymmetric matchers
    numberInRange: (min: number, max: number) => any;
    stringMatching: (pattern: RegExp | string) => any;
    objectContaining: (properties: Record<string, any>) => any;
  };
  const beforeEach: typeof import('@jest/globals').beforeEach;
  const afterEach: typeof import('@jest/globals').afterEach;
  const beforeAll: typeof import('@jest/globals').beforeAll;
  const afterAll: typeof import('@jest/globals').afterAll;

  // Extend Jest's expect interface for custom matchers
  namespace jest {
    interface Matchers<R> {
      toBeCloseTo(expected: number, tolerance: number): R;
      toBeAlphabetic(): R;
      toHaveAllProperties(properties: string[]): R;
    }
  }
}
