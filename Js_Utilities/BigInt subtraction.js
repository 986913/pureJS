/**
  Luckily we already have built-in support of [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) in JavaScript, at least in some browsers.
  1000000000000000000000n - 999999999999999999999n // 1n
  Suppose BigInt cannot be used, can you implement a string subtraction function by yourself?
  All input are valid non-negative integer strings, and the result is guaranteed to be non-negative.
  Don't use BigInt directly, it is not our goal here.
 **/
/* --------------------- 用例测试 ----------------------- */
subtract('1000000000000000000000', '999999999999999999999'); // '1'
subtract('0', '0'); // '0'
subtract('1', '0'); // '1'
subtract('12345678912345678', '9876501263826299'); // '2469177648519379'

/* ------------------ Code solution ------------------ */
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
function subtract(num1, num2) {
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
