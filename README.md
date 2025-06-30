# Jest 30+ TypeScript Custom Matchers (ESM)

Modern Jest + TypeScript setup with custom matchers using ES Modules. Features full IDE support and type safety without `@types/jest`.

## Features

✅ **ES Modules** - Modern JavaScript module system  
✅ **Custom Matchers** - `toBeCloseTo`, `toBeAlphabetic`, `toHaveAllProperties`, `toBeInRange`  
✅ **Asymmetric Matchers** - Use with `toEqual` for complex matching  
✅ **Jest 30+ Compatible** - Uses `@jest/globals` (no `@types/jest` dependency)  
✅ **Full TypeScript Support** - Complete IDE autocompletion and type checking  
✅ **Minimal Configuration** - Ultra-clean setup with sensible defaults  

## Quick Start

```bash
npm install
npm test
```

## Configuration

### package.json
```json
{
  "type": "module"
}
```

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext", 
    "moduleResolution": "bundler",
    "declaration": true,
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"]
}
```

### jest.config.js
```javascript
export default {
  preset: 'ts-jest/presets/default-esm',
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts']
};
```

## Usage Examples

### Regular Matchers
```typescript
import { describe, it, expect } from '@jest/globals';

it('should use custom matchers', () => {
  expect(0.333).toBeCloseTo(1/3, 0.001);
  expect('Hello').toBeAlphabetic();
  expect('Hello123').not.toBeAlphabetic();
  expect({ id: 1, name: 'John' }).toHaveAllProperties(['id', 'name']);
  expect(5).toBeInRange(1, 10);
});
```

### Asymmetric Matchers
```typescript
it('should use asymmetric matchers', () => {
  const results = [3, 5, 7];
  expect(results).toEqual([
    expect.toBeInRange(1, 5),
    expect.toBeInRange(4, 8), 
    expect.toBeInRange(6, 10)
  ]);
});
```

## Key Implementation Details

### TypeScript Declaration (src/types/jest-custom.d.ts)
```typescript
declare module 'expect' {
  interface Matchers<R> {
    toBeCloseTo(expected: number, tolerance: number): R;
    toBeAlphabetic(): R;
    toHaveAllProperties(properties: string[]): R;
    toBeInRange(min: number, max: number): R;
  }
  
  interface AsymmetricMatchers {
    toBeInRange(min: number, max: number): AsymmetricMatcher;
    // ... other asymmetric matchers
  }
}

export {}; // 🔑 Crucial for module recognition
```

### Matcher Registration (src/setupTests.ts)
```typescript
import './customMatchers';
```

### 🔑 Key Insight
The `export {};` statement in the type declaration file is crucial - it makes TypeScript treat the file as a module and enables automatic discovery of custom matcher types.

## Project Structure
```
src/
├── customMatchers.ts       # Matcher implementations
├── setupTests.ts          # Registers matchers  
├── types/jest-custom.d.ts # TypeScript declarations
├── __tests__/             # Test files
└── index.ts               # Application code
```

## Scripts
```bash
npm test              # Run tests
npm run test:coverage # Run with coverage
npm run build         # Compile TypeScript
npm run clean         # Clean build artifacts
```

## Dependencies
- `@jest/globals` - Modern Jest globals (no `@types/jest` needed)
- `jest` + `ts-jest` - Testing framework with TypeScript support
- `typescript` - TypeScript compiler

## License
MIT
