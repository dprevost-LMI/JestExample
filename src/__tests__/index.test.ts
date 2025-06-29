/// <reference path="../types/jest-globals.d.ts" />

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
      // Note: Using type assertion due to Jest 30 typing limitations with custom matchers
      (expect('Hello') as any).toBeAlphabetic();
      (expect('World') as any).toBeAlphabetic();
      (expect('Hello123') as any).not.toBeAlphabetic();
      (expect('Hello World') as any).not.toBeAlphabetic();
    });

    it('should use toHaveAllProperties custom matcher', () => {
      const mathResult = {
        result: 10,
        operation: 'add',
        operands: [4, 6]
      };
      
      // Note: Using type assertion due to Jest 30 typing limitations with custom matchers
      (expect(mathResult) as any).toHaveAllProperties(['result', 'operation', 'operands']);
      (expect(mathResult) as any).not.toHaveAllProperties(['result', 'operation', 'timestamp']);
    });
  });

  describe('Asymmetric Matchers', () => {
    it('should use numberInRange asymmetric matcher', () => {
      const results = [
        calculator.add(1, 2),    // 3
        calculator.add(2, 3),    // 5
        calculator.add(3, 4),    // 7
      ];

      expect(results).toEqual([
        (expect as any).numberInRange(1, 5),   // 3 is in range [1, 5]
        (expect as any).numberInRange(4, 8),   // 5 is in range [4, 8]
        (expect as any).numberInRange(6, 10),  // 7 is in range [6, 10]
      ]);
    });

    it('should use stringMatching asymmetric matcher', () => {
      const operations = ['addition', 'subtraction', 'multiplication'];
      
      expect(operations).toEqual([
        (expect as any).stringMatching(/^add/),
        (expect as any).stringMatching('sub'),
        (expect as any).stringMatching(/tion$/)
      ]);
    });

    it('should use objectContaining asymmetric matcher', () => {
      const calculationLog = [
        { operation: 'add', a: 2, b: 3, result: 5, timestamp: Date.now() },
        { operation: 'multiply', a: 4, b: 5, result: 20, timestamp: Date.now() }
      ];

      expect(calculationLog).toEqual([
        (expect as any).objectContaining({
          operation: 'add',
          result: 5
        }),
        (expect as any).objectContaining({
          operation: 'multiply',
          a: (expect as any).numberInRange(3, 5)
        })
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
      // Using type assertion due to Jest 30 typing limitations with custom matchers
      (expect('JohnDoe') as any).toBeAlphabetic();
      (expect('John Doe') as any).not.toBeAlphabetic(); // Contains space
    });

    it('should validate user object has all required properties', () => {
      // Note: Using type assertion due to Jest 30 typing limitations with custom matchers  
      (expect(user) as any).toHaveAllProperties(['id', 'name', 'email', 'age']);
      (expect(user) as any).not.toHaveAllProperties(['id', 'name', 'email', 'age', 'phone']);
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
        (expect as any).objectContaining({
          name: (expect as any).stringMatching(/^A/),
          age: (expect as any).numberInRange(25, 30)
        }),
        (expect as any).objectContaining({
          name: 'Bob',
          email: (expect as any).stringMatching(/@test\.com$/)
        }),
        (expect as any).objectContaining({
          age: (expect as any).numberInRange(30, 40)
        })
      ]);
    });

    it('should validate email patterns', () => {
      const emails = ['user@example.com', 'admin@test.org', 'developer@company.net'];
      
      expect(emails).toEqual([
        (expect as any).stringMatching(/@example\.com$/),
        (expect as any).stringMatching(/^admin@/),
        (expect as any).stringMatching(/\.net$/)
      ]);
    });
  });
});
