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
