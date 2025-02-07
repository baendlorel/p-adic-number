export class PAdicNumber {
  readonly p: number;
  readonly digits: number[];
  constructor(p: number, digits: number[]) {
    if (!Number.isInteger(p)) {
      throw new Error('给定的p不是整数');
    }
    if (digits.filter((d) => !Number.isInteger(d) || d >= p).length > 0) {
      throw new Error('给定的Digits必须每一位都小于p，且每一位都必须是整数');
    }

    for (let i = digits.length - 1; i > 0; i--) {
      console.log({ i, digits: digits[i] });
      if (digits[i] === 0) {
        digits.pop();
      } else {
        break;
      }
    }

    this.p = p;
    this.digits = digits;
  }

  add(a: PAdicNumber): PAdicNumber {
    if (this.p !== a.p) {
      throw new Error('不同进数不能相互计算，请转换后再试');
    }

    return this;
  }

  multiply(a: PAdicNumber): PAdicNumber {
    return this;
  }

  convertTo(newP: number) {}

  toString() {
    return this.digits.reverse().join('');
  }
}
