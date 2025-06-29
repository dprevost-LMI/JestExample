// This file is automatically loaded by Jest to set up the testing environment
// It extends Jest with custom matchers and asymmetric matchers

import { expect } from '@jest/globals';
import { customMatchers, customAsymmetricMatchers } from './customMatchers';

// Extend Jest with custom matchers
expect.extend(customMatchers);

// Add custom asymmetric matchers to the global expect
// Only our custom asymmetric matchers need to be assigned
(expect as any).numberInRange = customAsymmetricMatchers.numberInRange;

// Note: stringMatching and objectContaining are built-in Jest asymmetric matchers
// so they don't need to be assigned here
