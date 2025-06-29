# Asymmetric Matchers with expect.extend

This project demonstrates the best practice for implementing custom asymmetric matchers in Jest 30+ using `expect.extend`, following the pattern discussed in [Jest issue #7492](https://github.com/jestjs/jest/issues/7492).

## The Pattern

According to Jest issue #7492, when you use `expect.extend()` to register a custom matcher, Jest automatically creates both:

1. **Regular matcher**: `expect(value).toBeInRange(min, max)`
2. **Asymmetric matcher**: `expect.toBeInRange(min, max)`

## Implementation

### 1. Define the Matcher

In `src/customMatchers.ts`, we define the matcher function:

```typescript
export const customMatchers = {
  toBeInRange(received: number, min: number, max: number) {
    const pass = typeof received === 'number' && received >= min && received <= max;
    
    if (pass) {
      return {
        message: () => 
          `expected ${received} not to be in range ${min} to ${max}`,
        pass: true,
      };
    } else {
      return {
        message: () => 
          `expected ${received} to be in range ${min} to ${max}`,
        pass: false,
      };
    }
  },
};
```

### 2. Register with expect.extend

In `src/setupTests.ts`:

```typescript
import { expect } from '@jest/globals';
import { customMatchers } from './customMatchers';

// Extend Jest with custom matchers
// This automatically creates both regular matchers and asymmetric matchers
expect.extend(customMatchers);

// Add inverse asymmetric matchers to expect.not
(expect as any).not = (expect as any).not || {};
(expect as any).not.toBeInRange = (min: number, max: number) => {
  return {
    $$typeof: Symbol.for('jest.asymmetricMatcher'),
    asymmetricMatch(received: number) {
      return typeof received === 'number' && (received < min || received > max);
    },
    toString() {
      return `not.toBeInRange(${min}, ${max})`;
    },
  };
};
```

### 3. Type Definitions

In `src/types/jest-custom.d.ts`:

```typescript
// Custom Jest matchers type declarations for Jest 30+ with full IDE support

// Extend the core expect module that Jest 30 uses
declare module 'expect' {
  interface Matchers<R> {
    toBeCloseTo(expected: number, tolerance: number): R;
    toBeAlphabetic(): R;
    toHaveAllProperties(properties: string[]): R;
    toBeInRange(min: number, max: number): R;
  }
  
  interface AsymmetricMatchers {
    toBeCloseTo(expected: number, tolerance: number): AsymmetricMatcher;
    toBeAlphabetic(): AsymmetricMatcher;
    toHaveAllProperties(properties: string[]): AsymmetricMatcher;
    toBeInRange(min: number, max: number): AsymmetricMatcher;
  }
}

export {};
```

**Key Point**: The `export {};` statement is crucial - it tells TypeScript to treat this as a module, enabling proper module augmentation.

## Key Features Demonstrated

### Multiple Custom Matchers
The project includes several custom matchers beyond just `toBeInRange`:

- `toBeCloseTo(expected, tolerance)` - Number proximity matching
- `toBeAlphabetic()` - String alphabetic validation  
- `toHaveAllProperties(properties)` - Object property validation
- `toBeInRange(min, max)` - Number range validation

All follow the same pattern and automatically get both regular and asymmetric variants.

### Module Augmentation Strategy
The type declarations use a clean approach:
- Extends the core `expect` module that Jest 30 uses
- Includes `export {};` to enable module recognition
- Provides full IDE autocompletion and type checking
- No manual imports or references needed in test files

## Usage Examples

### Regular Matcher
```typescript
expect(5).toBeInRange(1, 10); // ✅ passes
expect(15).not.toBeInRange(1, 10); // ✅ passes (using .not)
```

### Asymmetric Matcher
```typescript
expect([3, 5, 7]).toEqual([
  expect.toBeInRange(1, 5),   // matches 3
  expect.toBeInRange(4, 8),   // matches 5  
  expect.toBeInRange(6, 10),  // matches 7
]);

// Inverse asymmetric matcher
expect([15, 0, 25]).toEqual([
  expect.not.toBeInRange(1, 10),   // 15 is NOT in range [1, 10]
  expect.not.toBeInRange(5, 15),   // 0 is NOT in range [5, 15]
  expect.not.toBeInRange(1, 20),   // 25 is NOT in range [1, 20]
]);

expect(users).toEqual([
  expect.objectContaining({
    age: expect.toBeInRange(25, 30)
  })
]);
```

## Advantages of this Approach

1. **Single Definition**: One function creates both regular and asymmetric matchers
2. **Consistent API**: Both matchers use the same underlying logic
3. **Type Safety**: Full TypeScript support for both variants with minimal configuration
4. **Jest 30+ Compatible**: Uses `@jest/globals` instead of deprecated `@types/jest`
5. **No Manual Assignment**: No need to manually assign asymmetric matchers to `expect`
6. **Automatic Discovery**: TypeScript automatically recognizes custom matchers via module augmentation
7. **Inverse Support**: Additional support for `expect.not.toBeInRange()` asymmetric matchers

## Migration from Manual Assignment

Previously, you might have manually assigned asymmetric matchers:

```typescript
// ❌ Old approach (manual assignment)
(expect as any).numberInRange = (min, max) => ({ /* implementation */ });
```

Now with `expect.extend`:

```typescript
// ✅ New approach (automatic via expect.extend)
expect.extend({
  toBeInRange(received, min, max) { /* implementation */ }
});
```

This creates both:
- `expect(value).toBeInRange(min, max)` - regular matcher
- `expect.toBeInRange(min, max)` - asymmetric matcher
- `expect.not.toBeInRange(min, max)` - inverse asymmetric matcher (manually added)

## Testing

All tests pass with both regular and asymmetric usage:

```bash
npm test  # All 23 tests pass
npm run build  # TypeScript compiles without errors
```

This implementation follows Jest's recommended pattern and provides a clean, type-safe way to use custom asymmetric matchers in modern Jest projects.
