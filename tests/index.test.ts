import { describe } from '@jest/globals';
import { PAdicInteger } from '../src';

new PAdicInteger(10, [0]);

describe('加法', () => {
  test(`有限加法 432+9=423`, () => {
    const a = new PAdicInteger(10, [2, 3, 4]);
    const b = new PAdicInteger(10, [9]);
    return expect(a.plus(b).toString()).toEqual('441');
  });
});

describe('减法', () => {
  test(`有限减法 432-9=423`, () => {
    const a = new PAdicInteger(10, [2, 3, 4]);
    const b = new PAdicInteger(10, [9]);
    return expect(a.minus(b).toString()).toEqual('423');
  });

  test(`无限减法 0-1=...9999`, () => {
    const a = new PAdicInteger(10, [0]);
    const b = new PAdicInteger(10, [1]);
    const c = a.minus(b);
    expect(c.hasInfinityDigits).toBe(true);
    expect(c.toString()).toBe('...'.padEnd(3 + PAdicInteger.MAX_DIGIT_SIZE, '9'));
  });
});
