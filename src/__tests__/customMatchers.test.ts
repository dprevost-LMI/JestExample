import { describe, it, expect } from '@jest/globals';
import { Calculator } from '../index';

describe('Custom Matcher Error Messages', () => {
  it('should provide clear error messages for toBeCloseTo failures', () => {
    const calc = new Calculator();
    const result = calc.divide(1, 3); // ≈ 0.333...
    
    // Test failure case - value not close enough
    expect(() => {
      expect(result).toBeCloseTo(0.5, 0.1);
    }).toThrow(/expected .* to be close to 0.5 within tolerance 0.1, but difference was/);

    // Test inverse failure case - value too close when expecting not close
    expect(() => {
      expect(result).not.toBeCloseTo(0.333, 0.01);
    }).toThrow(/expected .* not to be close to 0.333 within tolerance 0.01/);
  });

  it('should provide clear error messages for toBeAlphabetic failures', () => {
    // Test failure case - string contains non-alphabetic characters
    expect(() => {
      expect('Hello123').toBeAlphabetic();
    }).toThrow(/expected "Hello123" to be alphabetic \(only letters\)/);

    // Test inverse failure case - alphabetic string when expecting non-alphabetic
    expect(() => {
      expect('Hello').not.toBeAlphabetic();
    }).toThrow(/expected "Hello" not to be alphabetic/);
  });

  it('should provide clear error messages for toHaveAllProperties failures', () => {
    const incompleteObj = { name: 'John', age: 25 };
    
    // Test failure case - missing properties
    expect(() => {
      expect(incompleteObj).toHaveAllProperties(['name', 'age', 'email', 'id']);
    }).toThrow(/expected object to have all properties: name, age, email, id, but missing: email, id/);

    // Test inverse failure case - has all properties when expecting not to
    expect(() => {
      expect(incompleteObj).not.toHaveAllProperties(['name', 'age']);
    }).toThrow(/expected object not to have all properties: name, age/);
  });

  it('should provide clear error messages for toBeInRange failures', () => {
    // Test failure case - value outside range
    expect(() => {
      expect(15).toBeInRange(1, 10);
    }).toThrow(/expected 15 to be in range 1 to 10/);

    // Test inverse failure case - value in range when expecting not to be
    expect(() => {
      expect(5).not.toBeInRange(1, 10);
    }).toThrow(/expected 5 not to be in range 1 to 10/);
  });

  it('should validate error messages for edge cases', () => {
    // toBeCloseTo with zero tolerance
    expect(() => {
      expect(0.1).toBeCloseTo(0.2, 0);
    }).toThrow(/expected 0.1 to be close to 0.2 within tolerance 0, but difference was 0.1/);

    // toBeAlphabetic with empty string
    expect(() => {
      expect('').toBeAlphabetic();
    }).toThrow(/expected "" to be alphabetic \(only letters\)/);

    // toHaveAllProperties with empty array
    expect(() => {
      expect({}).not.toHaveAllProperties([]);
    }).toThrow(/expected object not to have all properties:/);

    // toBeInRange with negative numbers
    expect(() => {
      expect(-5).toBeInRange(1, 10);
    }).toThrow(/expected -5 to be in range 1 to 10/);
  });
});
