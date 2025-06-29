// Custom Jest matchers extension for @jest/globals
// This file extends the @jest/globals expect interface with custom matchers

import type { expect } from '@jest/globals';

// Extend the imported expect function with custom matchers
declare module '@jest/globals' {
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

// Also declare types for the global expect (in case it's used)
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeCloseTo(expected: number, tolerance: number): R;
      toBeAlphabetic(): R;
      toHaveAllProperties(properties: string[]): R;
    }

    interface Expect {
      numberInRange(min: number, max: number): any;
      stringMatching(pattern: string | RegExp): any;
      objectContaining(properties: object): any;
    }
  }
}
