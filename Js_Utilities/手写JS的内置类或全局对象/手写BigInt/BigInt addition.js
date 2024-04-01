/**
  Luckily we have [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) in JavaScript so handle big numbers.

  What if we need to do it by ourselves for older browsers? 
  You are asked to implement a string addition function, with all non-negative integers in string
  Don't use BigInt directly, it is not our goal here.
 */

/* --------------------- 用例测试 ----------------------- */
add('999999999999999999', '1'); // '1000000000000000000'
add('0', '1'); // '1'
add('0', '0'); // '0'
add('9', '9'); // '18'

/* ------------------ Code solution ------------------ */
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */

var addStrings = function (num1, num2) {
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
};
