/**
  This is a follow-up on BigInt addition 
  You are asked to implement a string substraction function, with possible negative integers. Also, '+' plus sign should also be supported

  Don't use BigInt directly, it is not our goal here.
 */

/* --------------------- 用例测试 ----------------------- */
subtract('-999999999999999999', '-1'); // '-999999999999999998'
subtract('-999999999999999999', '+1'); // '-1000000000000000000'

/* ----------------------- Code solution: combined BigInt addition and BigInt substraction -------------------------------- */
// helper function 1:
function addStrings(num1, num2) {
  let i = num1.length - 1;
  let j = num2.length - 1;

  let result = [];
  let carry = 0; //要么是0 要么是1

  //从低位开始加（从个位数开始加）
  while (i >= 0 || j >= 0 || carry) {
    let n1 = num1[i] || 0;
    let n2 = num2[j] || 0;

    let curSum = parseInt(n1) + parseInt(n2) + carry; //计算sum
    let reminder = curSum % 10; //取个位数
    result.unshift(reminder);

    carry = curSum >= 10 ? 1 : 0;

    i--;
    j--;
  }

  return result.join('');
}
// helper function 2:
function subtractStrings(num1, num2) {
  let i = num1.length - 1;
  let j = num2.length - 1;

  let result = [];
  let carry = 0; //要么是0 要么是1

  //从低位开始减（从个位数开始减）
  while (i >= 0 || j >= 0 || carry) {
    let n1 = num1[i] || 0;
    let n2 = num2[j] || 0;

    let curSub = parseInt(n1) - parseInt(n2) + carry + 10; //计算Sub
    let reminder = curSub % 10; //取个位数
    result.unshift(reminder);

    carry = Math.floor(curSub / 10) > 0 ? 0 : -1;

    i--;
    j--;
  }

  /* 对类似这些的cases: 
    1. 比如num1='100', num2='100'，得到的result为[0，0，0], 所以要while loop将其变成[0] 
    2. 比如num1='30', num2='25', 得到的result为[0，5], 所以要while loop将其变成[5] 
  */
  while (result.length > 1 && parseInt(result[0]) === 0) {
    result.shift();
  }

  return result.join('');
}

function subtract(num1, num2) {
  const isNegative1 = num1[0] == '-';
  const isNegative2 = num2[0] == '-' ? false : true; // Check if num2 is negative (treat as positive if no sign)
  num1 = num1.replace(/^[+|-]/, '');
  num2 = num2.replace(/^[+|-]/, '');

  if (isNegative1 == isNegative2) {
    // Both numbers have the same sign, so perform addition
    return (isNegative1 ? '-' : '') + addStrings(num1, num2); // Add the numbers and append sign if necessary
  } else {
    // Numbers have different signs, so perform subtraction
    const res = subtractStrings(num1, num2); // Subtract num2 from num1
    if (res[0] == '-' && isNegative1) return res.slice(1); // If the result is negative and num1 is negative, remove the negative sign
    return (isNegative1 && res[0] != '0' ? '-' : '') + res; // Append sign if necessary (handle -9 - (-9) case to avoid -0)
  }
}
