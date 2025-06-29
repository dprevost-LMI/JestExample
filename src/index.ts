export class Calculator {
  add(a: number, b: number): number {
    return a + b;
  }

  subtract(a: number, b: number): number {
    return a - b;
  }

  multiply(a: number, b: number): number {
    return a * b;
  }

  divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error('Division by zero is not allowed');
    }
    return a / b;
  }

  power(base: number, exponent: number): number {
    return Math.pow(base, exponent);
  }
}

export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public age: number
  ) {}

  isAdult(): boolean {
    return this.age >= 18;
  }

  getInfo(): { id: number; name: string; email: string } {
    return {
      id: this.id,
      name: this.name,
      email: this.email
    };
  }
}
