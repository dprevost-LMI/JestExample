import { describe, it, expect } from '@jest/globals';

describe('Basic Validation', () => {
  it('should run a simple test', () => {
    expect(1 + 1).toBe(2);
  });

  it('should validate custom matchers are loaded', () => {
    // Test that custom matchers are available
    expect(5).toBeInRange(1, 10);
    expect('Hello').toBeAlphabetic();
  });
});
