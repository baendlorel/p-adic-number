export class PAdicInteger extends Array {
  readonly p: number;
  hasInfinityDigits: boolean;

  constructor(p: number, digits: number[], hasInfinityDigits: boolean = false) {
    if (!Number.isInteger(p) || p < 2) {
      throw new Error('给定的p必须是大于等于2的正整数');
    }
    if (
      !Array.isArray(digits) ||
      digits.filter((d) => !Number.isInteger(d) || d >= p || d < 0).length > 0
    ) {
      throw new Error('给定的digits必须是正整数组成的数组，每一位都小于p，且每一位都必须是正整数');
    }

    // 获取正确的数组长度
    let realLength = 0;
    for (realLength = digits.length - 1; realLength >= 1; realLength--) {
      if (digits[realLength] !== 0) {
        break;
      }
    }
    realLength++;

    // 下面是和数组长度有关的判断
    if (realLength > PAdicInteger.MAX_DIGIT_SIZE) {
      throw new Error(`数字实际位数不能超过${PAdicInteger.MAX_DIGIT_SIZE}`);
    }
    if (realLength === 0) {
      throw new Error(`必须至少有1位数字`);
    }
    if (hasInfinityDigits && realLength < PAdicInteger.MAX_DIGIT_SIZE) {
      throw new Error(`若包含无穷位数则给定的digits长度必须封顶等于${PAdicInteger.MAX_DIGIT_SIZE}`);
    }

    super();

    this.p = p;
    this.push(...digits.slice(0, realLength));
    this.hasInfinityDigits = hasInfinityDigits;
  }

  static get MAX_DIGIT_SIZE() {
    return 50;
  }

  private static prepare(a: PAdicInteger, b: PAdicInteger) {
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

  add(o: PAdicInteger): PAdicInteger {
    return this.plus(o);
  }

  plus(o: PAdicInteger): PAdicInteger {
    const { length, p, a, b } = PAdicInteger.prepare(this, o);
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
      if (r.length < PAdicInteger.MAX_DIGIT_SIZE) {
        r.push(carry);
      } else {
        hasInfinityDigits = true;
      }
    }
    return new PAdicInteger(p, r, hasInfinityDigits);
  }

  minus(o: PAdicInteger): PAdicInteger {
    const { length, p, a, b } = PAdicInteger.prepare(this, o);
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
      r.length = PAdicInteger.MAX_DIGIT_SIZE;
      r.fill(p - 1, length, PAdicInteger.MAX_DIGIT_SIZE);
    }

    return new PAdicInteger(p, r, carry === 1);
  }

  multiply(o: PAdicInteger): PAdicInteger {
    return this;
  }

  equals(b: PAdicInteger) {
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

  convertTo(p: number): PAdicInteger {
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
