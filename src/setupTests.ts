// This file is automatically loaded by Jest to set up the testing environment
// It extends Jest with custom matchers and asymmetric matchers

import { customMatchers, customAsymmetricMatchers } from './customMatchers';

// Extend Jest with custom matchers
expect.extend(customMatchers);

// Add custom asymmetric matchers to the global expect
(expect as any).numberInRange = customAsymmetricMatchers.numberInRange;
(expect as any).stringMatching = customAsymmetricMatchers.stringMatching;
(expect as any).objectContaining = customAsymmetricMatchers.objectContaining;
