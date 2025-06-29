// Custom Jest matchers extension for Jest 30+
// Based on the official Jest repository patterns

import '@jest/globals';

declare module '@jest/globals' {
  namespace jest {
    interface Matchers<R> {
      toBeCloseTo(expected: number, tolerance: number): R;
      toBeAlphabetic(): R;
      toHaveAllProperties(properties: string[]): R;
      toBeInRange(min: number, max: number): R;
    }

    interface AsymmetricMatchers {
      toBeInRange(min: number, max: number): any;
    }

    interface Expect extends AsymmetricMatchers {}
  }
}

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeCloseTo(expected: number, tolerance: number): R;
      toBeAlphabetic(): R;
      toHaveAllProperties(properties: string[]): R;
      toBeInRange(min: number, max: number): R;
    }

    interface AsymmetricMatchers {
      toBeInRange(min: number, max: number): any;
    }

    interface Expect extends AsymmetricMatchers {}
  }
}
