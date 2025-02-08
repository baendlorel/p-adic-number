import { describe } from '@jest/globals';
import { PAdicNumber } from '../src';

describe('四则运算', () => {
  test(`加法`, () => {
    const a = new PAdicNumber(10, [2, 3, 4]);
    const b = new PAdicNumber(10, [9]);
    return expect(a.plus(b).toString()).toEqual('441');
  });

  test(`减法`, () => {
    const a = new PAdicNumber(10, [2, 3, 4]);
    const b = new PAdicNumber(10, [9]);
    return expect(a.minus(b).toString()).toEqual('423');
  });
});
