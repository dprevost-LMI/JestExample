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
       * Custom asymmetric matcher for numbers within a range
       */
      numberInRange(min: number, max: number): any;
      
      // Note: stringMatching and objectContaining are built-in Jest asymmetric matchers
      // so they don't need to be declared here
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
      // Built-in asymmetric matchers are already available
    }
  }
}
