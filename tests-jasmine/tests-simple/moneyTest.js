import {formatCurrency} from '../../scripts/utils/money.js';

console.log('Test Suite: formatCurrency');

console.log('converts cents into dollars');
if(formatCurrency(1095) === '10.95'){
console.log('Passed');
} else {
  console.log('Failed');
}

console.log('test when value is 0');
if(formatCurrency(0) === '0.00'){
  console.log('Passed');
  } else {
    console.log('Failed');
  }

console.log('test cents if it rounds up to the nearest cent');
if(formatCurrency(100.5) === '1.01'){
  console.log('Passed');
  } else {
    console.log('Failed');
  }

console.log('test cents if it rounds down to the nearest cent'); 
if(formatCurrency(100.4) === '1.00'){
  console.log('Passed');
  } else {
    console.log('Failed');
  }
