import { describe, it, expect } from '@jest/globals';

describe('Asymmetric Matcher Error Validation', () => {
  it('should validate error messages for asymmetric matcher failures', () => {
    // Test toBeInRange asymmetric matcher failure
    expect(() => {
      expect([20, 0, 25]).toEqual([
        expect.toBeInRange(1, 10),
        expect.toBeInRange(5, 15),
        expect.toBeInRange(1, 20),
      ]);
    }).toThrow(); // Should fail because 20 is not in range [1, 10], 0 is not in range [5, 15]

    // Test expect.not.toBeInRange asymmetric matcher failure
    expect(() => {
      expect([5, 10, 15]).toEqual([
        expect.not.toBeInRange(1, 10),  // 5 IS in range [1, 10] - should fail
        expect.not.toBeInRange(5, 15),  // 10 IS in range [5, 15] - should fail
        expect.not.toBeInRange(1, 20),  // 15 IS in range [1, 20] - should fail
      ]);
    }).toThrow(); // Should fail because all values are within their respective ranges

    // Test mixed asymmetric matchers in complex object
    expect(() => {
      expect([
        { name: 'InvalidUser', age: 5, score: 150 }
      ]).toEqual([
        expect.objectContaining({
          name: expect.toBeAlphabetic(),      // Should pass
          age: expect.toBeInRange(18, 65),    // Should fail - 5 is not in range
          score: expect.toBeInRange(0, 100)   // Should fail - 150 is not in range
        })
      ]);
    }).toThrow(); // Should fail due to age and score being out of range
  });

  it('should validate toString() output for custom asymmetric matchers', () => {
    // Create asymmetric matchers to check their string representation
    const rangeMatcherString = expect.toBeInRange(1, 10).toString();
    expect(rangeMatcherString).toContain('toBeInRange');
    // Note: Jest's built-in asymmetric matchers don't include parameters in toString()
    // This is expected behavior for expect.extend() generated asymmetric matchers

    // Check inverse asymmetric matcher string representation
    const inverseRangeMatcherString = expect.not.toBeInRange(1, 10).toString();
    expect(inverseRangeMatcherString).toBe('not.toBeInRange(1, 10)');
  });
});

describe('Asymmetric Matcher String Representation', () => {
  it('should verify toString() methods work correctly', () => {
    // Test regular asymmetric matchers
    const toBeInRangeMatcher = expect.toBeInRange(5, 15);
    expect(toBeInRangeMatcher.toString()).toContain('toBeInRange');
    
    // Test our custom inverse asymmetric matcher
    const notToBeInRangeMatcher = expect.not.toBeInRange(1, 10);
    expect(notToBeInRangeMatcher.toString()).toBe('not.toBeInRange(1, 10)');
    
    // Test with different ranges
    const anotherInverseMatcher = expect.not.toBeInRange(20, 30);
    expect(anotherInverseMatcher.toString()).toBe('not.toBeInRange(20, 30)');
  });

  it('should verify asymmetricMatch functionality', () => {
    const inverseMatcher = expect.not.toBeInRange(5, 15);
    
    // Values outside the range should match (return true)
    expect(inverseMatcher.asymmetricMatch(3)).toBe(true);   // below range
    expect(inverseMatcher.asymmetricMatch(20)).toBe(true);  // above range
    expect(inverseMatcher.asymmetricMatch(-5)).toBe(true);  // negative, below range
    
    // Values inside the range should not match (return false)
    expect(inverseMatcher.asymmetricMatch(5)).toBe(false);   // boundary (min)
    expect(inverseMatcher.asymmetricMatch(10)).toBe(false);  // middle
    expect(inverseMatcher.asymmetricMatch(15)).toBe(false);  // boundary (max)
    
    // Non-numbers should not match
    expect(inverseMatcher.asymmetricMatch('not a number' as any)).toBe(false);
    expect(inverseMatcher.asymmetricMatch(null as any)).toBe(false);
    expect(inverseMatcher.asymmetricMatch(undefined as any)).toBe(false);
  });
});
