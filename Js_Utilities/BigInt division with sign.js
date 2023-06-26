/**
  This is a follow-up on BigInt multiplication with sign.
  You are asked to create a BigInt division function.

  Don't use BigInt directly, it is not our goal here.
 */
/* --------------------- 用例测试 ----------------------- */
divide('1123456787654323456789', '1234567887654323456'); // '910'
divide('-1123456787654323456789', '1234567887654323456'); // '-910'
divide('5', '2'); // '2'
divide('-3', '2'); // '-1'
divide('3', '2'); // '1'
divide('0', '1'); // '0'
divide('1', '0'); //  should throw an exception.
divide('123456', '-999'); //'-123'
divide('1123456787654323456789', '1234567887654323456'); // '910'
divide('1123456787654323456789', '-1'); // '-1123456787654323456789'
divide(
  '-9999999999999999999999999999999999',
  '-9999999999999999999999999999999998'
); // '1'
divide('-5', '3'); // '-1'

/* ------------------------------ Code solution:  -------------------------------- */
function divide(a, b) {
  if (a === '0') return '0';
  if (b === '0') throw new Error('Division by zero');

  // Check for negative sign
  const isNegative =
    (a[0] === '-' && b[0] !== '-') || (a[0] !== '-' && b[0] === '-');

  // Remove the negative sign from a and b
  a = a.replace(/^-/, '');
  b = b.replace(/^-/, '');

  // Initialize the quotient and remainder
  let quotient = ''; //商
  let remainder = ''; //余数

  for (let i = 0; i < a.length; i++) {
    const curr = Number(a[i]);

    // Add the next digit to the remainder
    remainder += curr;

    // Perform division if the remainder is greater than or equal to the b
    if (Number(remainder) >= Number(b)) {
      const times = Math.floor(Number(remainder) / Number(b));
      quotient += times;
      remainder = (Number(remainder) - times * Number(b)).toString();
    } else {
      // Add a leading zero to the quotient if necessary
      if (quotient.length > 0) {
        quotient += '0';
      }
    }
  }

  // Add negative sign if applicable
  if (isNegative && quotient !== '0') quotient = `-${quotient}`;

  // Return the quotient
  return quotient;
}

/**
  当调用divide('5', '2')时, 执行以下步骤：
    1. 初始参数是 a = '5' 和 b = '2'。
    2. 首先，检查a是否为零。由于a不等于'0'，所以继续执行。
    3. 接下来，检查b是否为零。由于b也不等于'0'，所以继续执行。
    4. 根据a和b的正负号，确定最后的商是否为负数。在这种情况下, isNegative会被设置为false。
    5. 将a和b去除负号，得到a='5'和b='2'。
    6. 初始化商quotient为空字符串，初始化余数remainder为空字符串。
    7. 开始循环处理a的每一位数字：
        - 在第一次迭代中，当前数字curr等于5。
        - 将当前数字curr添加到余数remainder的末尾，此时remainder为'5'。
        - 检查余数remainder是否大于或等于b。由于5大于2，进入下一步。
        - 计算times，即Math.floor(5 / 2) = 2。
        - 将times添加到商quotient的末尾，此时quotient为'2'。
        - 计算新的余数，即5 - 2 * 2 = 1，并将其转换为字符串形式，得到'1'。
    8. 循环结束后，返回最终的商quotient，在这个例子中为'2'。
  因此，divide('5', '2')的结果是'2'。这意味着整数5除以2的商为2。
 */
