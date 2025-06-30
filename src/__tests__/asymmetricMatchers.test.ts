import { describe, it, expect } from '@jest/globals';

describe('Asymmetric Matcher Error Validation', () => {
  it('should validate error messages for asymmetric matcher failures', () => {
    // Test toBeInRange asymmetric matcher failure - validate the exact diff output
    expect(() => {
      expect([20, 0, 25]).toEqual([
        expect.toBeInRange(1, 10),
        expect.toBeInRange(5, 15),
        expect.toBeInRange(1, 20),
      ]);
    }).toThrow(/-\s+toBeInRange<1, 10>,[\s\S]*-\s+toBeInRange<5, 15>,[\s\S]*-\s+toBeInRange<1, 20>,[\s\S]*\+\s+20,[\s\S]*\+\s+0,[\s\S]*\+\s+25,/);

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
    }).toThrow('ObjectContaining');
  });

  it('should validate toString() output for custom asymmetric matchers', () => {
    // Create asymmetric matchers to check their string representation
    const rangeMatcherString = expect.toBeInRange(1, 10).toString();
    expect(rangeMatcherString).toContain('toBeInRange');
    // Note: Jest's built-in asymmetric matchers don't include parameters in toString()
    // This is expected behavior for expect.extend() generated asymmetric matchers
  });
});

describe('Asymmetric Matcher String Representation', () => {
  it('should verify toString() methods work correctly', () => {
    // Test regular asymmetric matchers
    const toBeInRangeMatcher = expect.toBeInRange(5, 15);
    expect(toBeInRangeMatcher.toString()).toContain('toBeInRange');
    
    // Test that the asymmetric matcher has the correct properties
    expect(toBeInRangeMatcher).toHaveProperty('asymmetricMatch');
    expect(typeof toBeInRangeMatcher.asymmetricMatch).toBe('function');
  });

  it('should verify asymmetricMatch functionality', () => {
    const rangeMatcher = expect.toBeInRange(5, 15);
    
    // Values inside the range should match (return true)
    expect(rangeMatcher.asymmetricMatch(5)).toBe(true);   // boundary (min)
    expect(rangeMatcher.asymmetricMatch(10)).toBe(true);  // middle
    expect(rangeMatcher.asymmetricMatch(15)).toBe(true);  // boundary (max)
    
    // Values outside the range should not match (return false)
    expect(rangeMatcher.asymmetricMatch(3)).toBe(false);   // below range
    expect(rangeMatcher.asymmetricMatch(20)).toBe(false);  // above range
    expect(rangeMatcher.asymmetricMatch(-5)).toBe(false);  // negative, below range
    
    // Non-numbers should not match
    expect(rangeMatcher.asymmetricMatch('not a number' as any)).toBe(false);
    expect(rangeMatcher.asymmetricMatch(null as any)).toBe(false);
    expect(rangeMatcher.asymmetricMatch(undefined as any)).toBe(false);
  });
});
