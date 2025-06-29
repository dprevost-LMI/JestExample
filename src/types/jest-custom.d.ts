// Custom Jest matchers type declarations for Jest 30+ with full IDE support

// Extend the core expect module that Jest 30 uses
declare module 'expect' {
  interface Matchers<R> {
    toBeCloseTo(expected: number, tolerance: number): R;
    toBeAlphabetic(): R;
    toHaveAllProperties(properties: string[]): R;
    toBeInRange(min: number, max: number): R;
  }
  
  interface AsymmetricMatchers {
    toBeCloseTo(expected: number, tolerance: number): AsymmetricMatcher;
    toBeAlphabetic(): AsymmetricMatcher;
    toHaveAllProperties(properties: string[]): AsymmetricMatcher;
    toBeInRange(min: number, max: number): AsymmetricMatcher;
  }
}

export {};
