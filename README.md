# Jest TypeScript Example with Custom Matchers

This project demonstrates how to use **Jest 30** with TypeScript, including custom matchers and asymmetric matchers, utilizing the `@types/jest` package for TypeScript definitions. **Jest globals are available automatically in test files without explicit imports!**

## Features

- **Jest 30.0.3**: Latest Jest version with improved performance and features
- **@types/jest 30.0.0**: Latest Jest typing definitions with full IntelliSense support
- **No explicit imports needed**: Jest globals are available automatically in test files
- **TypeScript Configuration**: Properly configured TypeScript with Jest
- **Custom Matchers**: Custom Jest matchers with TypeScript declarations
- **Asymmetric Matchers**: Custom asymmetric matchers for flexible testing
- **Comprehensive Tests**: Examples showing all features in action
- **No Babel required**: Pure TypeScript + Jest 30 setup

## Key Configuration for @types/jest 30

✅ **Using Jest 30.0.3** - Latest Jest version with enhanced performance  
✅ **@types/jest 30.0.0 for TypeScript support** - Latest type definitions  
✅ **No explicit imports required** - Jest globals are available automatically  
✅ **Modern Jest configuration** - Optimized for Jest 30 features  
✅ **Custom TypeScript declarations** for custom matchers  
✅ **Full functionality** of custom matchers and asymmetric matchers

## Project Structure

```
src/
├── index.ts                    # Main source code (Calculator and User classes)
├── customMatchers.ts           # Custom matcher implementations
├── setupTests.ts              # Jest setup file
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

## Migration Notes: Using @types/jest 30

This project demonstrates the proper way to use Jest 30 with TypeScript using the `@types/jest` version 30 approach:

### Dependencies Used:
- ✅ `@types/jest@^30.0.0` (latest Jest type definitions for Jest 30)
- ✅ `jest@^30.0.3` (latest Jest version)
- ✅ `ts-jest@^29.1.1` (TypeScript transformer for Jest)

### Configuration Details:
- **Jest Config**: Modern Jest 30 configuration with optimized settings
- **TypeScript**: Includes `jest` in types array for global Jest functions
- **Test Files**: No imports needed - Jest functions are available globally!

### Key Benefits:
- ✨ **No explicit imports**: Write tests like classic Jest (no imports needed)
- 🚀 **Latest Jest features**: Performance improvements and new Jest 30 functionality
- 📝 **Full TypeScript support**: Complete type checking and IntelliSense
- 🔧 **No Babel required**: Pure TypeScript + Jest 30 setup
- 🎯 **Custom matchers work perfectly**: All custom functionality preserved
- 💪 **Cutting-edge**: Latest `@types/jest` for Jest 30 compatibility

### Test File Example:
```typescript
import { Calculator } from '../index';

// No need to import describe, it, expect, beforeEach!
// @types/jest provides these globally
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

The project includes proper TypeScript declarations for all custom matchers in `src/types/jest-custom.d.ts`. This provides full IntelliSense support and type checking for your custom matchers when using `@types/jest` version 30.

The custom matchers work seamlessly with the Jest 30 typing system, providing excellent developer experience and type safety with the latest Jest features.

## Test Examples

The test file (`src/__tests__/index.test.ts`) contains comprehensive examples of:

- Basic Jest matchers with Jest 30
- Custom matchers in various scenarios  
- Asymmetric matchers with complex objects
- Combining multiple custom matchers
- Error testing and edge cases
- Modern Jest 30 patterns and best practices

## Key Files Explained

- **`package.json`**: Uses `@types/jest` version 30 for Jest 30 type definitions
- **`customMatchers.ts`**: Contains the implementation of all custom matchers
- **`jest-custom.d.ts`**: TypeScript declarations for custom matchers (works with @types/jest 30)
- **`setupTests.ts`**: Jest setup extending global expect with custom matchers
- **`index.test.ts`**: Comprehensive test examples using Jest 30 approach
- **`jest.config.js`**: Modern Jest 30 configuration for TypeScript projects

This project serves as a complete example of how to extend Jest 30 with custom functionality while maintaining full TypeScript support using the latest `@types/jest` version 30 approach.
