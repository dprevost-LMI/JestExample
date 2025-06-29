# Jest TypeScript Example with Custom Matchers

This project demonstrates how to use **Jest 30** with TypeScript, including custom matchers and asymmetric matchers, utilizing the modern `@jest/globals` package **without relying on `@types/jest`**. This follows the latest Jest documentation recommendations for TypeScript projects.

## Features

- **Jest 30.0.3**: Latest Jest version with improved performance and features
- **@jest/globals**: Modern Jest approach providing direct imports of Jest functions
- **No @types/jest dependency**: Uses the official `@jest/globals` package instead
- **Explicit imports**: Clear and explicit imports from `@jest/globals`
- **TypeScript Configuration**: Properly configured TypeScript with Jest 30
- **Custom Matchers**: Custom Jest matchers with proper TypeScript declarations
- **Asymmetric Matchers**: Custom asymmetric matchers for flexible testing
- **Comprehensive Tests**: Examples showing all features in action
- **No Babel required**: Pure TypeScript + Jest 30 setup

## Modern Jest 30 + @jest/globals Approach

✅ **Using Jest 30.0.3** - Latest Jest version with enhanced performance  
✅ **@jest/globals for TypeScript support** - Official Jest TypeScript package  
✅ **Explicit imports from @jest/globals** - Clear and explicit testing imports  
✅ **No @types/jest dependency** - Following official Jest documentation  
✅ **Custom TypeScript declarations** - Proper typing for custom matchers  
✅ **Full functionality** - All custom matchers and asymmetric matchers work perfectly  
## Project Structure

```
src/
├── index.ts                    # Main source code (Calculator and User classes)
├── customMatchers.ts           # Custom matcher implementations
├── setupTests.ts              # Jest setup file
├── types/
│   └── jest-custom.d.ts       # TypeScript declarations for custom matchers
└── __tests__/
    └── index.test.ts          # Comprehensive test examples using @jest/globals imports
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

## Modern Jest 30 Setup Guide

This project demonstrates the proper way to use Jest 30 with TypeScript following the official Jest documentation:

### Dependencies Used:
- ✅ `@jest/globals@^30.0.3` (official Jest package for TypeScript)
- ❌ `@types/jest` (not needed with @jest/globals)
- ✅ `jest@^30.0.3` (latest Jest version)
- ✅ `ts-jest@^29.1.1` (TypeScript transformer for Jest)

### Configuration Details:
- **Jest Config**: Clean configuration without `injectGlobals` (using explicit imports)
- **TypeScript**: Custom module declarations extending `@jest/globals`
- **Test Files**: Explicit imports from `@jest/globals` for clarity and type safety
### Key Benefits:
- ✨ **Explicit imports**: Clear imports from `@jest/globals` for better IDE support
- 🚀 **Latest Jest features**: Performance improvements and new Jest 30 functionality  
- 📝 **Full TypeScript support**: Complete type checking and IntelliSense
- 🔧 **No Babel required**: Pure TypeScript + Jest 30 setup
- 🎯 **Custom matchers work perfectly**: All custom functionality preserved
- 📦 **Official approach**: Following Jest's recommended TypeScript setup

### Test File Example:
```typescript
/// <reference types="../types/jest-custom" />

import { describe, it, expect, beforeEach } from '@jest/globals';
import { Calculator } from '../index';

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

The project includes proper TypeScript declarations for all custom matchers in `src/types/jest-custom.d.ts`. This file extends the `@jest/globals` module to provide full IntelliSense support and type checking for your custom matchers.

**Note**: Custom matchers require type assertions (`as any`) in test files when using `@jest/globals`. This is the standard approach for custom Jest matchers and ensures compatibility with Jest's type system while maintaining functionality.

The custom matchers work seamlessly with the modern Jest typing system, providing excellent developer experience and type safety with the latest Jest features.

## Test Examples

The test file (`src/__tests__/index.test.ts`) contains comprehensive examples of:

- Basic Jest matchers with explicit `@jest/globals` imports
- Custom matchers in various scenarios  
- Asymmetric matchers with complex objects
- Combining multiple custom matchers
- Error testing and edge cases
- Modern Jest 30 patterns and best practices

## Key Files Explained

- **`package.json`**: Uses `@jest/globals` without `@types/jest` dependency
- **`customMatchers.ts`**: Contains the implementation of all custom matchers
- **`jest-custom.d.ts`**: TypeScript module declarations extending `@jest/globals`
- **`setupTests.ts`**: Jest setup extending `expect` from `@jest/globals`
- **`index.test.ts`**: Comprehensive test examples with explicit `@jest/globals` imports
- **`jest.config.js`**: Clean Jest 30 configuration using explicit imports

This project serves as a complete example of how to extend Jest 30 with custom functionality while maintaining full TypeScript support and following the official Jest documentation recommendations for TypeScript projects.
