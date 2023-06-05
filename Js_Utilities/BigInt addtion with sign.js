/**
  This is a follow-up on BigInt addition 
  You are asked to implement a string addition function, with possible negative integers. Also, '+' plus sign should also be supported

  Don't use BigInt directly, it is not our goal here.
 */
/* --------------------- 用例测试 ----------------------- */
add('-999999999999999999', '-1'); // '-1000000000000000000'
add('-999999999999999999', '+1'); // '-999999999999999998'
add('-1', '+1'); // 0
add('9', '+1'); // 10
add('9', '-1'); // 8
add('0', '-100'); // -100
add('-9', '-9'); // -18

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
// helper function 3:
function comparePositive(num1, num2) {
  if (num1.length > num2.length) return 1;
  else if (num1.length < num2.length) return -1;
  else {
    for (let i = 0; i < num1.length; i++) {
      if (num1[i] > num2[i]) return 1;
      else if (num1[i] < num2[i]) return -1;
    }
    return 0;
  }
}

/**
 * Main function:
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
function add(num1, num2) {
  const isNegative1 = num1[0] === '-';
  const isNegative2 = num2[0] === '-';
  num1 = num1.replace(/^[-|+]/, ''); //将num1字符串开头的+或-替换为空字符串，也就是将其去除。
  num2 = num2.replace(/^[-|+]/, ''); //将num2字符串开头的+或-替换为空字符串，也就是将其去除。

  // case 1.1, 1.2
  if (isNegative1 === isNegative2) {
    return `${isNegative1 ? '-' : ''}${addStrings(num1, num2)}`;
  }

  switch (comparePositive(num1, num2)) {
    case 0:
      /* for case like: add('123', '123') */
      return '0';
    case 1:
      return `${isNegative1 ? '-' : ''}${subtractStrings(num1, num2)}`; // case 2.1.2,  case 2.2.2
    case -1:
      return `${isNegative2 ? '-' : ''}${subtractStrings(num2, num1)}`; // case 2.1.1,  case 2.2.1,
  }
}
/*
case 1: Both same sign we just add numbers
    1.1: +,+
    1.2: -,- mark result -

case 2: Diff sign we subtract
    2.1 : (-,+)
        2.1.1    (n1 < n2) : subtractAbs result will be - , Ex: (-8)+(9) = + (remove '-' sign from final res)
        2.1.2    (n1 > n2) : subtractAbs result will be + , Ex: (-9)+(8) = - (add '-' sign to final res)
    2.2 : (+,-)
        2.2.1    (n1 < n2) : subtractAbs result will be - , Ex: (8)+(-9) = - (keep subtractAbs result as it is)
        2.2.2    (n1 > n2) : result will be - , Ex: (9)+(-8) = + (keep subtractAbs result as it is)
*/
