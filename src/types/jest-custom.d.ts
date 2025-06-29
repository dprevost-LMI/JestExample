// Custom Jest matchers extension for Jest 30
// This file only contains the custom matcher definitions

declare global {
  namespace jest {
    interface Matchers<R> {
      /**
       * Custom matcher to check if a number is close to another number within a tolerance
       */
      toBeCloseTo(expected: number, tolerance: number): R;
      
      /**
       * Custom matcher to check if a string contains only alphabetic characters
       */
      toBeAlphabetic(): R;
      
      /**
       * Custom matcher to check if an object has all required properties
       */
      toHaveAllProperties(properties: string[]): R;
    }
  }
}

export {};
