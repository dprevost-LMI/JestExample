// Custom Jest matchers extension for Jest 30+
// Using the official Jest documentation approach with 'expect' module

declare module 'expect' {
  interface AsymmetricMatchers {
    toBeCloseTo(expected: number, tolerance: number): void;
    toBeAlphabetic(): void;
    toHaveAllProperties(properties: string[]): void;
    toBeInRange(min: number, max: number): void;
  }
  
  interface Matchers<R> {
    toBeCloseTo(expected: number, tolerance: number): R;
    toBeAlphabetic(): R;
    toHaveAllProperties(properties: string[]): R;
    toBeInRange(min: number, max: number): R;
  }
}
