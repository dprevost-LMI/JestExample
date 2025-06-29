// This file is automatically loaded by Jest to set up the testing environment
// It extends Jest with custom matchers and asymmetric matchers

import { expect } from '@jest/globals';
import { customMatchers } from './customMatchers';

// Extend Jest with custom matchers
// This automatically creates both regular matchers and asymmetric matchers
// For example, toBeInRange creates both:
// - expect(value).toBeInRange(min, max) - regular matcher
// - expect.toBeInRange(min, max) - asymmetric matcher
expect.extend(customMatchers);

// Add inverse asymmetric matchers to expect.not
(expect as any).not = (expect as any).not || {};
(expect as any).not.toBeInRange = (min: number, max: number) => {
  return {
    $$typeof: Symbol.for('jest.asymmetricMatcher'),
    asymmetricMatch(received: number) {
      return typeof received === 'number' && (received < min || received > max);
    },
    toString() {
      return `not.toBeInRange(${min}, ${max})`;
    },
  };
};

// Note: stringMatching and objectContaining are built-in Jest asymmetric matchers
