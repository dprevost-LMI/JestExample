# Jest TypeScript Example with Custom Matchers

This project demonstrates how to use **Jest 30+** with TypeScript, including custom matchers and asymmetric matchers, utilizing the modern `@jest/globals` package instead of the deprecated `@types/jest`. **No explicit imports from `@jest/globals` are required in test files!**

## Features

- **Jest 30.0.3**: Latest Jest version with improved performance and features
- **@jest/globals**: Modern Jest typing approach (replaces deprecated `@types/jest`)
- **No explicit imports needed**: Jest globals are available automatically in test files
- **TypeScript Configuration**: Properly configured TypeScript with Jest
- **Custom Matchers**: Custom Jest matchers with TypeScript declarations
- **Asymmetric Matchers**: Custom asymmetric matchers for flexible testing
- **Comprehensive Tests**: Examples showing all features in action
- **No Babel required**: Pure TypeScript + Jest 30 setup

## Key Updates for Jest 30+

✅ **Upgraded to Jest 30.0.3** from Jest 29.7.0  
✅ **Replaced `@types/jest`** with `@jest/globals`  
✅ **No explicit imports required** - Jest globals are available automatically  
✅ **Updated Jest configuration** to use modern ts-jest syntax with `injectGlobals: true`  
✅ **Custom TypeScript declarations** for Jest 30 compatibility  
✅ **Maintained full functionality** of custom matchers

## Project Structure

```
src/
├── index.ts                    # Main source code (Calculator and User classes)
├── customMatchers.ts           # Custom matcher implementations
├── setupTests.ts              # Jest setup file (optional)
├── types/
│   └── jest-custom.d.ts       # TypeScript declarations for custom matchers
└── __tests__/
    └── index.test.ts          # Comprehensive test examples
```

## Custom Matchers

### 1. `toBeCloseTo(expected, tolerance)`
Checks if a number is close to another number within a specified tolerance.

```typescript
expect(0.333).toBeCloseTo(1/3, 0.001);
```

### 2. `toBeAlphabetic()`
Checks if a string contains only alphabetic characters.

```typescript
expect('Hello').toBeAlphabetic();
expect('Hello123').not.toBeAlphabetic();
```

### 3. `toHaveAllProperties(properties)`
Checks if an object has all specified properties.

```typescript
expect(user).toHaveAllProperties(['id', 'name', 'email']);
```

## Asymmetric Matchers

### 1. `numberInRange(min, max)`
Matches any number within a specified range.

```typescript
expect([1, 5, 9]).toEqual([
  expect.numberInRange(0, 3),
  expect.numberInRange(4, 6),
  expect.numberInRange(8, 10)
]);
```

### 2. `stringMatching(pattern)`
Matches strings against a regex pattern.

```typescript
expect(['hello', 'world']).toEqual([
  expect.stringMatching(/^h/),
  expect.stringMatching('world')
]);
```

### 3. `objectContaining(properties)`
Matches objects that contain specific properties.

```typescript
expect(users).toEqual([
  expect.objectContaining({
    name: expect.stringMatching(/^A/),
    age: expect.numberInRange(25, 30)
  })
]);
```

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run tests:**
   ```bash
   npm test
   ```

3. **Run tests in watch mode:**
   ```bash
   npm run test:watch
   ```

4. **Build the project:**
   ```bash
   npm run build
   ```

## Migration Notes: Jest 29 → Jest 30

This project demonstrates the proper way to migrate from Jest 29 to Jest 30 **without requiring explicit imports**:

### Dependencies Changed:
- ❌ `@types/jest@^29.5.5` (deprecated)
- ✅ `@jest/globals@^30.0.3` (modern approach)
- ✅ `jest@^30.0.3` (latest version)

### Configuration Updated:
- **Jest Config**: Added `injectGlobals: true` to make Jest functions globally available
- **TypeScript**: Custom ambient declarations that leverage `@jest/globals` types
- **Test Files**: No imports needed - Jest functions are available globally!

### Key Benefits:
- ✨ **No explicit imports**: Write tests like classic Jest (no imports needed)
- 🚀 **Latest Jest features**: Performance improvements and new functionality
- 📝 **Full TypeScript support**: Complete type checking and IntelliSense
- 🔧 **No Babel required**: Pure TypeScript + Jest 30 setup
- 🎯 **Custom matchers work**: All custom functionality preserved

### Test File Example:
```typescript
/// <reference path="../types/jest-globals.d.ts" />

import { Calculator } from '../index';

// No need to import describe, it, expect, beforeEach!
describe('Calculator', () => {
  let calculator: Calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  it('should add numbers', () => {
    expect(calculator.add(2, 3)).toBe(5);
  });
});
```

## TypeScript Configuration

The project includes proper TypeScript declarations for all custom matchers in `src/types/jest-custom.d.ts`. This provides full IntelliSense support and type checking for your custom matchers.

**Note**: Due to Jest 30's updated type system, custom matchers currently require type assertions (`as any`) in test files. This is a temporary limitation while the Jest ecosystem adapts to the new typing approach.

## Test Examples

The test file (`src/__tests__/index.test.ts`) contains comprehensive examples of:

- Basic Jest matchers with `@jest/globals`
- Custom matchers in various scenarios  
- Asymmetric matchers with complex objects
- Combining multiple custom matchers
- Error testing and edge cases
- Modern Jest 30 patterns and best practices

## Key Files Explained

- **`package.json`**: Updated dependencies for Jest 30 and `@jest/globals`
- **`customMatchers.ts`**: Contains the implementation of all custom matchers
- **`jest-custom.d.ts`**: TypeScript declarations for IDE support (Jest 30 compatible)
- **`setupTests.ts`**: Jest setup using `@jest/globals` expect extension
- **`index.test.ts`**: Comprehensive test examples with Jest 30 patterns
- **`jest.config.js`**: Modern Jest 30 configuration without deprecated globals

This project serves as a complete example of how to extend Jest 30 with custom functionality while maintaining full TypeScript support and following modern Jest patterns.
