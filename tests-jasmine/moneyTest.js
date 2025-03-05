import {formatCurrency} from '../scripts/utils/money.js';

describe('Test Suite: formatCurrency', () => {
  it('Converts cents into dollars', () => {
    expect(formatCurrency(1095)).toEqual('10.95');
  });
  it('works with 0', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  });
  describe('rounding', () => {
  it('check if rounds up correctly to nearest cent', () => {
  expect(formatCurrency(205.5)).toEqual('2.06');
  });
  it('check if rounds down correctly to nearest cent', () => {
    expect(formatCurrency(205.4)).toEqual('2.05');
  });
});
  
});