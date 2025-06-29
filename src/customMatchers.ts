// Custom Matchers
export const customMatchers = {
  toBeCloseTo(received: number, expected: number, tolerance: number) {
    const pass = Math.abs(received - expected) <= tolerance;
    
    if (pass) {
      return {
        message: () => 
          `expected ${received} not to be close to ${expected} within tolerance ${tolerance}`,
        pass: true,
      };
    } else {
      return {
        message: () => 
          `expected ${received} to be close to ${expected} within tolerance ${tolerance}, but difference was ${Math.abs(received - expected)}`,
        pass: false,
      };
    }
  },

  toBeAlphabetic(received: string) {
    const alphabeticRegex = /^[a-zA-Z]+$/;
    const pass = alphabeticRegex.test(received);
    
    if (pass) {
      return {
        message: () => `expected "${received}" not to be alphabetic`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected "${received}" to be alphabetic (only letters)`,
        pass: false,
      };
    }
  },

  toHaveAllProperties(received: any, properties: string[]) {
    const missingProperties = properties.filter(prop => !(prop in received));
    const pass = missingProperties.length === 0;
    
    if (pass) {
      return {
        message: () => 
          `expected object not to have all properties: ${properties.join(', ')}`,
        pass: true,
      };
    } else {
      return {
        message: () => 
          `expected object to have all properties: ${properties.join(', ')}, but missing: ${missingProperties.join(', ')}`,
        pass: false,
      };
    }
  },
};

// Custom Asymmetric Matchers
export const customAsymmetricMatchers = {
  numberInRange(min: number, max: number) {
    return {
      asymmetricMatch(actual: any) {
        return typeof actual === 'number' && actual >= min && actual <= max;
      },
      toString() {
        return `numberInRange(${min}, ${max})`;
      },
      toAsymmetricMatcher() {
        return `numberInRange(${min}, ${max})`;
      },
    };
  },

  // Note: stringMatching and objectContaining are built-in Jest asymmetric matchers
  // so they don't need custom implementations here
};
