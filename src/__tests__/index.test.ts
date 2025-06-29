/// <reference types="../types/jest-custom" />

import { describe, it, expect, beforeEach } from '@jest/globals';
import { Calculator, User } from '../index';

describe('Calculator', () => {
  let calculator: Calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  describe('Basic Operations', () => {
    it('should add two numbers correctly', () => {
      expect(calculator.add(2, 3)).toBe(5);
      expect(calculator.add(-1, 1)).toBe(0);
      expect(calculator.add(0, 0)).toBe(0);
    });

    it('should subtract two numbers correctly', () => {
      expect(calculator.subtract(5, 3)).toBe(2);
      expect(calculator.subtract(1, 1)).toBe(0);
      expect(calculator.subtract(-1, -1)).toBe(0);
    });

    it('should multiply two numbers correctly', () => {
      expect(calculator.multiply(3, 4)).toBe(12);
      expect(calculator.multiply(-2, 3)).toBe(-6);
      expect(calculator.multiply(0, 5)).toBe(0);
    });

    it('should divide two numbers correctly', () => {
      expect(calculator.divide(10, 2)).toBe(5);
      expect(calculator.divide(9, 3)).toBe(3);
      expect(calculator.divide(-6, 2)).toBe(-3);
    });

    it('should throw error when dividing by zero', () => {
      expect(() => calculator.divide(5, 0)).toThrow('Division by zero is not allowed');
    });

    it('should calculate power correctly', () => {
      expect(calculator.power(2, 3)).toBe(8);
      expect(calculator.power(5, 2)).toBe(25);
      expect(calculator.power(3, 0)).toBe(1);
    });
  });

  describe('Custom Matchers', () => {
    it('should use toBeCloseTo custom matcher', () => {
      const result = calculator.divide(1, 3);
      expect(result).toBeCloseTo(0.333, 0.001);
      expect(result).not.toBeCloseTo(0.5, 0.1);
    });

    it('should use toBeAlphabetic custom matcher', () => {
      expect('Hello').toBeAlphabetic();
      expect('World').toBeAlphabetic();
      expect('Hello123').not.toBeAlphabetic();
      expect('Hello World').not.toBeAlphabetic();
    });

    it('should use toHaveAllProperties custom matcher', () => {
      const mathResult = {
        result: 10,
        operation: 'add',
        operands: [4, 6]
      };
      
      // Note: Custom matchers now work without type assertion thanks to expect module declaration
      expect(mathResult).toHaveAllProperties(['result', 'operation', 'operands']);
      expect(mathResult).not.toHaveAllProperties(['result', 'operation', 'timestamp']);
    });
  });

  describe('Asymmetric Matchers', () => {
    it('should use toBeInRange asymmetric matcher', () => {
      const results = [
        calculator.add(1, 2),    // 3
        calculator.add(2, 3),    // 5
        calculator.add(3, 4),    // 7
      ];

      expect(results).toEqual([
        expect.toBeInRange(1, 5),   // 3 is in range [1, 5]
        expect.toBeInRange(4, 8),   // 5 is in range [4, 8]
        expect.toBeInRange(6, 10),  // 7 is in range [6, 10]
      ]);
    });

    it('should use stringMatching asymmetric matcher', () => {
      const operations = ['addition', 'subtraction', 'multiplication'];
      
      expect(operations).toEqual([
        expect.stringMatching(/^add/),
        expect.stringMatching('sub'),
        expect.stringMatching(/tion$/)
      ]);
    });

    it('should use expect.not.toBeInRange asymmetric matcher', () => {
      const outOfRangeResults = [
        calculator.add(10, 5),   // 15 - outside range [1, 10]
        calculator.add(0, 0),    // 0 - outside range [5, 15]
        calculator.add(20, 5),   // 25 - outside range [1, 20]
      ];

      expect(outOfRangeResults).toEqual([
        expect.not.toBeInRange(1, 10),   // 15 is NOT in range [1, 10]
        expect.not.toBeInRange(5, 15),   // 0 is NOT in range [5, 15]
        expect.not.toBeInRange(1, 20),   // 25 is NOT in range [1, 20]
      ]);
    });

    it('should use objectContaining asymmetric matcher', () => {
      const calculationLog = [
        { operation: 'add', a: 2, b: 3, result: 5, timestamp: Date.now() },
        { operation: 'multiply', a: 4, b: 5, result: 20, timestamp: Date.now() }
      ];

      expect(calculationLog).toEqual([
        expect.objectContaining({
          operation: 'add',
          result: 5
        }),
        expect.objectContaining({
          operation: 'multiply',
          a: expect.toBeInRange(3, 5)
        })
      ]);
    });

    it('should validate inverse cases for asymmetric matchers', () => {
      // Test arrays that should NOT match the asymmetric matchers
      
      // toBeInRange asymmetric matcher - values outside ranges
      const outOfRangeResults = [
        calculator.add(10, 10),  // 20 - outside range [1, 5]
        calculator.add(0, 1),    // 1 - outside range [4, 8] 
        calculator.add(1, 1),    // 2 - outside range [6, 10]
      ];

      // This should fail because values don't match the ranges
      expect(() => {
        expect(outOfRangeResults).toEqual([
          expect.toBeInRange(1, 5),   // 20 is NOT in range [1, 5]
          expect.toBeInRange(4, 8),   // 1 is NOT in range [4, 8]
          expect.toBeInRange(6, 10),  // 2 is NOT in range [6, 10]
        ]);
      }).toThrow();

      // stringMatching asymmetric matcher - strings that don't match patterns
      const nonMatchingOperations = ['division', 'modulo', 'exponential'];
      
      expect(() => {
        expect(nonMatchingOperations).toEqual([
          expect.stringMatching(/^add/),    // 'division' doesn't start with 'add'
          expect.stringMatching('sub'),     // 'modulo' doesn't contain 'sub'
          expect.stringMatching(/tion$/)    // 'exponential' doesn't end with 'tion'
        ]);
      }).toThrow();

      // objectContaining asymmetric matcher - objects missing expected properties
      const incompleteLog = [
        { operation: 'subtract', result: 3 }, // missing 'a' and 'b'
        { operation: 'divide', a: 10 }        // missing 'result'
      ];

      expect(() => {
        expect(incompleteLog).toEqual([
          expect.objectContaining({
            operation: 'add',           // has 'subtract' not 'add'
            result: 5                   // has 3 not 5
          }),
          expect.objectContaining({
            operation: 'multiply',      // has 'divide' not 'multiply'
            result: 20                  // missing result property
          })
        ]);
      }).toThrow();

      // Positive cases - these should work (inverse of the failing cases)
      const correctResults = [
        calculator.add(1, 2),    // 3 - in range [1, 5]
        calculator.add(2, 3),    // 5 - in range [4, 8]
        calculator.add(3, 4),    // 7 - in range [6, 10]
      ];

      expect(correctResults).toEqual([
        expect.toBeInRange(1, 5),
        expect.toBeInRange(4, 8),
        expect.toBeInRange(6, 10),
      ]);
    });
  });
});

describe('User', () => {
  let user: User;

  beforeEach(() => {
    user = new User(1, 'John Doe', 'john@example.com', 25);
  });

  describe('Basic Functionality', () => {
    it('should create user with correct properties', () => {
      expect(user.id).toBe(1);
      expect(user.name).toBe('John Doe');
      expect(user.email).toBe('john@example.com');
      expect(user.age).toBe(25);
    });

    it('should determine if user is adult', () => {
      expect(user.isAdult()).toBe(true);
      
      const minor = new User(2, 'Jane Doe', 'jane@example.com', 16);
      expect(minor.isAdult()).toBe(false);
    });

    it('should return user info', () => {
      const info = user.getInfo();
      expect(info).toEqual({
        id: 1,
        name: 'John Doe',
        email: 'john@example.com'
      });
    });
  });

  describe('Custom Matchers with User', () => {
    it('should validate user name is alphabetic (with space)', () => {
      // Note: Our custom matcher only checks for letters, so this will fail
      // This demonstrates the matcher working as expected
      // Custom matchers now work without type assertion thanks to expect module declaration
      expect('JohnDoe').toBeAlphabetic();
      expect('John Doe').not.toBeAlphabetic(); // Contains space
    });

    it('should validate user object has all required properties', () => {
      // Note: Custom matchers now work without type assertion thanks to expect module declaration
      expect(user).toHaveAllProperties(['id', 'name', 'email', 'age']);
      expect(user).not.toHaveAllProperties(['id', 'name', 'email', 'age', 'phone']);
    });
  });

  describe('Asymmetric Matchers with User', () => {
    it('should match user data with asymmetric matchers', () => {
      const users = [
        new User(1, 'Alice', 'alice@test.com', 28),
        new User(2, 'Bob', 'bob@test.com', 22),
        new User(3, 'Charlie', 'charlie@test.com', 35)
      ];

      expect(users).toEqual([
        expect.objectContaining({
          name: expect.stringMatching(/^A/),
          age: expect.toBeInRange(25, 30)
        }),
        expect.objectContaining({
          name: 'Bob',
          email: expect.stringMatching(/@test\.com$/)
        }),
        expect.objectContaining({
          age: expect.toBeInRange(30, 40)
        })
      ]);
    });

    it('should validate email patterns', () => {
      const emails = ['user@example.com', 'admin@test.org', 'developer@company.net'];
      
      expect(emails).toEqual([
        expect.stringMatching(/@example\.com$/),
        expect.stringMatching(/^admin@/),
        expect.stringMatching(/\.net$/)
      ]);
    });
  });

  describe('Comprehensive Tests', () => {
    it('should validate inverse cases for custom matchers', () => {
      // toBeCloseTo inverse cases - using a calculator instance
      const calc = new Calculator();
      const result = calc.divide(1, 3); // ≈ 0.333...
      expect(result).toBeCloseTo(0.333, 0.001);     // Should pass
      expect(result).not.toBeCloseTo(0.5, 0.1);     // Should pass (not close)
      expect(result).not.toBeCloseTo(0.9, 0.001);   // Should pass (not close)
      
      // toBeAlphabetic inverse cases
      expect('Hello').toBeAlphabetic();           // Should pass
      expect('World').toBeAlphabetic();           // Should pass  
      expect('Hello123').not.toBeAlphabetic();    // Should pass (contains numbers)
      expect('Hello World').not.toBeAlphabetic(); // Should pass (contains space)
      expect('Test!').not.toBeAlphabetic();       // Should pass (contains special char)
      expect('').not.toBeAlphabetic();            // Should pass (empty string)
      
      // toHaveAllProperties inverse cases
      const mathResult = {
        result: 10,
        operation: 'add',
        operands: [4, 6]
      };
      
      expect(mathResult).toHaveAllProperties(['result', 'operation', 'operands']); // Should pass
      expect(mathResult).not.toHaveAllProperties(['result', 'operation', 'timestamp']); // Should pass (missing timestamp)
      expect(mathResult).not.toHaveAllProperties(['result', 'operation', 'operands', 'extra']); // Should pass (missing extra)
      expect({}).not.toHaveAllProperties(['anything']); // Should pass (empty object)
      
      // toBeInRange inverse cases with type assertions
      expect(5).toBeInRange(1, 10);      // Should pass
      expect(1).toBeInRange(1, 10);      // Should pass (boundary)
      expect(10).toBeInRange(1, 10);     // Should pass (boundary)
      expect(0).not.toBeInRange(1, 10);  // Should pass (below range)
      expect(11).not.toBeInRange(1, 10); // Should pass (above range)
      expect(-5).not.toBeInRange(1, 10); // Should pass (negative, below range)
    });

    it('should validate inverse cases for asymmetric matchers', () => {
      // Create a calculator instance for this test
      const calc = new Calculator();
      
      // Test arrays that should NOT match the asymmetric matchers
      
      // toBeInRange asymmetric matcher - values outside ranges
      const outOfRangeResults = [
        calc.add(10, 10),  // 20 - outside range [1, 5]
        calc.add(0, 1),    // 1 - outside range [4, 8] 
        calc.add(1, 1),    // 2 - outside range [6, 10]
      ];

      // This should fail because values don't match the ranges
      expect(() => {
        expect(outOfRangeResults).toEqual([
          expect.toBeInRange(1, 5),   // 20 is NOT in range [1, 5]
          expect.toBeInRange(4, 8),   // 1 is NOT in range [4, 8]
          expect.toBeInRange(6, 10),  // 2 is NOT in range [6, 10]
        ]);
      }).toThrow();

      // stringMatching asymmetric matcher - strings that don't match patterns
      const nonMatchingOperations = ['division', 'modulo', 'exponential'];
      
      expect(() => {
        expect(nonMatchingOperations).toEqual([
          expect.stringMatching(/^add/),    // 'division' doesn't start with 'add'
          expect.stringMatching('sub'),     // 'modulo' doesn't contain 'sub'
          expect.stringMatching(/tion$/)    // 'exponential' doesn't end with 'tion'
        ]);
      }).toThrow();

      // objectContaining asymmetric matcher - objects missing expected properties
      const incompleteLog = [
        { operation: 'subtract', result: 3 }, // missing 'a' and 'b'
        { operation: 'divide', a: 10 }        // missing 'result'
      ];

      expect(() => {
        expect(incompleteLog).toEqual([
          expect.objectContaining({
            operation: 'add',           // has 'subtract' not 'add'
            result: 5                   // has 3 not 5
          }),
          expect.objectContaining({
            operation: 'multiply',      // has 'divide' not 'multiply'
            result: 20                  // missing result property
          })
        ]);
      }).toThrow();

      // Positive cases - these should work (inverse of the failing cases)
      const correctResults = [
        calc.add(1, 2),    // 3 - in range [1, 5]
        calc.add(2, 3),    // 5 - in range [4, 8]
        calc.add(3, 4),    // 7 - in range [6, 10]
      ];

      expect(correctResults).toEqual([
        expect.toBeInRange(1, 5),
        expect.toBeInRange(4, 8),
        expect.toBeInRange(6, 10),
      ]);
    });
  });
});
