# Jest 30+ TypeScript Custom Matchers Example

This project demonstrates how to implement and provide full TypeScript support for custom Jest matchers in Jest 30+, including both regular matchers and asymmetric matchers, with complete IDE autocompletion and type checking.

## Features

✅ **Custom Matchers**: `toBeCloseTo`, `toBeAlphabetic`, `toHaveAllProperties`, `toBeInRange`  
✅ **Asymmetric Matchers**: `expect.toBeInRange(min, max)` for use with `toEqual`  
✅ **Jest's Built-in .not**: Use `.not` with regular matchers for inverse logic  
✅ **Full TypeScript Support**: Complete type safety and IDE autocompletion  
✅ **Jest 30+ Compatible**: Uses `@jest/globals` (no `@types/jest` dependency)  
✅ **No Type Casting**: All matchers work without `as any` or type assertions  
✅ **Simple Configuration**: Minimal setup with just module augmentation and `export {}`  

## Installation

```bash
npm install
```

## Usage

### Regular Custom Matchers

```typescript
import { describe, it, expect } from '@jest/globals';

describe('Custom Matchers', () => {
  it('should use custom matchers', () => {
    // toBeCloseTo - number proximity with tolerance
    expect(0.333).toBeCloseTo(1/3, 0.001);
    
    // toBeAlphabetic - string contains only letters
    expect('Hello').toBeAlphabetic();
    expect('Hello123').not.toBeAlphabetic();
    
    // toHaveAllProperties - object has all specified properties
    const user = { id: 1, name: 'John', email: 'john@test.com' };
    expect(user).toHaveAllProperties(['id', 'name', 'email']);
    
    // toBeInRange - number within range (inclusive)
    expect(5).toBeInRange(1, 10);
    expect(15).not.toBeInRange(1, 10);
  });
});
```

### Asymmetric Matchers

```typescript
describe('Asymmetric Matchers', () => {
  it('should use custom asymmetric matchers', () => {
    const results = [3, 5, 7];
    
    // Use with toEqual for complex object matching
    expect(results).toEqual([
      expect.toBeInRange(1, 5),   // 3 is in range [1, 5]
      expect.toBeInRange(4, 8),   // 5 is in range [4, 8]
      expect.toBeInRange(6, 10),  // 7 is in range [6, 10]
    ]);
    
    // Inverse asymmetric matchers
    const outOfRange = [15, 0, 25];
    expect(outOfRange).toEqual([
      expect.not.toBeInRange(1, 10),   // 15 is NOT in range
      expect.not.toBeInRange(5, 15),   // 0 is NOT in range
      expect.not.toBeInRange(1, 20),   // 25 is NOT in range
    ]);
  });
});
```

## Project Structure

```
src/
├── customMatchers.ts       # Custom matcher implementations
├── setupTests.ts          # Jest setup file (registers matchers)
├── types/
│   └── jest-custom.d.ts   # TypeScript declarations for custom matchers
├── __tests__/
│   └── index.test.ts      # Test examples using custom matchers
└── index.ts               # Main application code
```

## TypeScript Configuration

### Key Files

1. **`src/types/jest-custom.d.ts`** - Contains TypeScript declarations for custom matchers
2. **`tsconfig.json`** - Configured with `typeRoots` pointing to `src/types`  
3. **`jest.config.js`** - Sets up Jest with `setupFilesAfterEnv`

### Type Declaration Strategy

The solution uses a minimal and elegant approach with module augmentation:

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

export {}; // This line is crucial - makes TypeScript treat this as a module
```

## 🔑 Key Insight

The crucial element that makes TypeScript recognize custom Jest matchers is the **`export {};` statement** at the end of the type declaration file. This simple line:

- **Enables Module Recognition**: Tells TypeScript to treat the file as a module
- **Activates Module Augmentation**: Allows `declare module 'expect'` to work properly  
- **Provides Automatic Discovery**: No manual imports or references needed in test files
- **Ensures IDE Support**: Full autocompletion and type checking work out of the box

Without `export {};`, TypeScript treats the file as a script and module augmentation doesn't work correctly.

### IDE Support

For full IDE support with autocompletion and type checking:

1. **Ensure TypeScript Configuration**: The `tsconfig.json` must include `"typeRoots": ["./node_modules/@types", "./src/types"]`
2. **Module Export**: The type declaration file must include `export {};` to be treated as a module
3. **Automatic Discovery**: TypeScript will automatically discover and apply the type declarations
4. **No Manual References Needed**: With proper configuration, no triple-slash references are required

**IDE Features Available**:
- Full autocompletion for `expect(value).toBeCloseTo(expected, tolerance)`
- Type checking for all custom matchers
- IntelliSense for asymmetric matchers like `expect.toBeInRange(min, max)`
- Error highlighting for incorrect usage

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Build TypeScript
npm run build

# Run with development server
npm run dev
```

## Custom Matcher Implementations

### Regular Matchers

All custom matchers follow Jest's matcher API:

```typescript
export const customMatchers = {
  toBeInRange(received: number, min: number, max: number) {
    const pass = typeof received === 'number' && received >= min && received <= max;
    
    if (pass) {
      return {
        message: () => `expected ${received} not to be in range ${min} to ${max}`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be in range ${min} to ${max}`,
        pass: false,
      };
    }
  },
  // ... other matchers
};
```

### Asymmetric Matchers

Asymmetric matchers are automatically created by `expect.extend()`. For inverse logic, use Jest's built-in `.not` modifier with regular matchers:

```typescript
// Use Jest's built-in .not for inverse logic
expect(value).not.toBeInRange(min, max);  // Recommended approach
```

## Troubleshooting

### IDE Not Showing Custom Matchers

1. **Restart TypeScript Language Service**: In VS Code: `Cmd+Shift+P` → "TypeScript: Restart TS Server"
2. **Verify Type Configuration**: Check that `tsconfig.json` includes `"typeRoots": ["./node_modules/@types", "./src/types"]`
3. **Check Export Statement**: Ensure `export {};` is present at the end of `jest-custom.d.ts`
4. **Clear TypeScript Cache**: Delete `node_modules/.cache` and restart IDE

### Type Errors During Build

1. **Module Augmentation**: Ensure `declare module 'expect'` is used correctly
2. **Missing AsymmetricMatcher Import**: Add `import { AsymmetricMatcher } from '@jest/expect-utils';` if needed
3. **Export Statement**: The `export {};` statement is crucial for module recognition

### Runtime Errors

1. **Matcher Registration**: Verify `expect.extend(customMatchers)` is called in `setupTests.ts`
2. **Jest Setup**: Ensure `setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts']` in Jest config
3. **Asymmetric Matcher Symbol**: Check that `$$typeof: Symbol.for('jest.asymmetricMatcher')` is correct

## Dependencies

This project uses Jest 30+ with minimal dependencies:

- **`@jest/globals`** - Modern Jest globals (replaces `@types/jest`)
- **`jest`** - Testing framework  
- **`ts-jest`** - TypeScript support for Jest
- **`typescript`** - TypeScript compiler

No `@types/jest` dependency is needed, as this project uses the native Jest 30 types.

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT
