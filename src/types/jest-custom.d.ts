// Custom Jest matchers extension for @types/jest
// This file contains the custom matcher definitions for use with @types/jest

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

    interface Expect {
      /**
       * Asymmetric matcher for numbers within a range
       */
      numberInRange(min: number, max: number): any;
      
      /**
       * Asymmetric matcher for string matching
       */
      stringMatching(pattern: string | RegExp): any;
      
      /**
       * Asymmetric matcher for object containing properties
       */
      objectContaining(properties: object): any;
    }
  }
}

export {};
