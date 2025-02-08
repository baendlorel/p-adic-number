export class PAdicNumber extends Array {
  readonly p: number;
  hasInfinityDigits: boolean;

  constructor(p: number, digits: number[], hasInfinityDigits: boolean = false) {
    if (!Number.isInteger(p)) {
      throw new Error('给定的p不是整数');
    }
    if (!Array.isArray(digits)) {
      throw new Error('给定的digits必须是整数组成的数组，且每一位都小于p');
    }
    if (digits.filter((d) => !Number.isInteger(d) || d >= p).length > 0) {
      throw new Error('给定的Digits必须每一位都小于p，且每一位都必须是整数');
    }
    if (digits.length > PAdicNumber.MAX_DIGIT_SIZE) {
      throw new Error(`数字位数不能超过${PAdicNumber.MAX_DIGIT_SIZE}`);
    }
    if (digits.length === 0) {
      throw new Error(`必须至少有1位数字`);
    }

    super();

    for (let i = digits.length - 1; i > 0; i--) {
      if (digits[i] === 0) {
        digits.pop();
      } else {
        break;
      }
    }

    this.p = p;
    this.push(...digits);
    this.hasInfinityDigits = hasInfinityDigits;
  }

  static get MAX_DIGIT_SIZE() {
    return 50;
  }

  private static prepare(a: PAdicNumber, b: PAdicNumber) {
    if (a.p !== b.p) {
      throw new Error('不同进数不能相互计算，请转换后再试');
    }
    const length = Math.max(a.length, b.length);
    const dummy: number[] = [];
    const result = {
      length,
      p: a.p,
      a: dummy.concat(a, new Array(length - a.length).fill(0)),
      b: dummy.concat(b, new Array(length - b.length).fill(0)),
    };
    return result;
  }

  add(o: PAdicNumber): PAdicNumber {
    return this.plus(o);
  }

  plus(o: PAdicNumber): PAdicNumber {
    const { length, p, a, b } = PAdicNumber.prepare(this, o);
    let carry = 0;
    const r: number[] = [];
    for (let i = 0; i < length; i++) {
      let t = a[i] + b[i] + carry;
      if (t >= p) {
        carry = 1;
        t -= p;
      } else {
        carry = 0;
      }
      r.push(t);
    }

    let hasInfinityDigits = false;
    if (carry > 0) {
      if (r.length < PAdicNumber.MAX_DIGIT_SIZE) {
        r.push(carry);
      } else {
        hasInfinityDigits = true;
      }
    }
    return new PAdicNumber(p, r, hasInfinityDigits);
  }

  minus(o: PAdicNumber): PAdicNumber {
    const { length, p, a, b } = PAdicNumber.prepare(this, o);
    let carry = 0;
    const r: number[] = [];
    for (let i = 0; i < length; i++) {
      if (a[i] - carry > b[i]) {
        r.push(a[i] - carry - b[i]);
        carry = 0;
      } else {
        r.push(p + a[i] - carry - b[i]);
        carry = 1;
      }
    }

    if (carry === 1) {
      r.length = PAdicNumber.MAX_DIGIT_SIZE;
      r.fill(p - 1, length, PAdicNumber.MAX_DIGIT_SIZE);
    }

    return new PAdicNumber(p, r, carry === 1);
  }

  multiply(o: PAdicNumber): PAdicNumber {
    return this;
  }

  equals(b: PAdicNumber) {
    if (b.length !== this.length) {
      return false;
    }

    const loopTime = Math.max(b.length, this.length);
    for (let i = 0; i < loopTime; i++) {
      if (b[i] !== this[i]) {
        return false;
      }
    }

    return true;
  }

  convertTo(p: number): PAdicNumber {
    if (!Number.isInteger(p)) {
      throw new Error('给定的p不是整数');
    }

    return this;
  }

  toDemical() {}

  toString() {
    const dot = this.hasInfinityDigits ? '...' : '';
    const digits = this.reverse().join('');
    return `${dot}${digits}`;
  }
}
