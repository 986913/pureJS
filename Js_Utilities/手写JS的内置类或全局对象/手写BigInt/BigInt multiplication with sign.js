/**
  This is a follow-up on BigInt addition with sign.
  You are asked to create a function that multiplies two big integers in string.

  Don't use BigInt directly, it is not our goal here.
 */
/* --------------------- 用例测试 ----------------------- */
multiply('1123456787654323456789', '1234567887654323456'); // '1386983673205309924427166592431045142784'
multiply('0', '1'); // '0'
multiply('-999', '123456'); // '-123332544'
multiply('1123456787654323456789', '-1'); // '-1123456787654323456789'
multiply('-99999999999999999', '-99999999999999999'); // '9999999999999999800000000000000001'

/* ------------------------------ Code solution:  -------------------------------- */
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
function multiply(a, b) {
  if (a === '0' || b === '0') return '0';

  const isNegative1 = a[0] === '-';
  const isNegative2 = b[0] === '-';
  a = a.replace(/^[-|+]/, ''); //将a字符串开头的+或-替换为空字符串，也就是将其去除。
  b = b.replace(/^[-|+]/, ''); //将b字符串开头的+或-替换为空字符串，也就是将其去除。
  let sign =
    (isNegative1 && !isNegative2) || (!isNegative1 && isNegative2) ? '-' : '';
  let result = new Array(a.length + b.length).fill(0);

  // 从低位开始：当我们在进行两个数的乘法运算时，我们需要对每一位进行逐个相乘，并将结果进行累加。这就需要使用到两个嵌套的循环来处理
  for (let i = a.length - 1; i >= 0; i--) {
    for (let j = b.length - 1; j >= 0; j--) {
      const m = i + j + 1; // 表示index of 乘积的结果
      const n = i + j; // 表示index of 表示进位

      const s = +a[i] * +b[j] + result[m]; //乘积的结果s = 当前位数字相乘的结果 + result[m]（即之前已经计算的进位）
      result[m] = s % 10; //将s对10取模的结果保存到result[m]中，这是因为s可能大于9，我们只保留个位数。
      result[n] += Math.floor(s / 10); //将s除以10并向下取整的结果加到result[n]中，这是因为s可能大于9，我们要将进位加到高位上。
    }
  }

  //用于去除结果数组result开头的所有零位。这是因为在乘法运算中，结果的高位可能存在多余的零。
  while (result[0] === 0) {
    result.shift();
  }

  return `${sign}${result.join('')}`;
}

/**
  以 multiply('3', '12')为例，过一下code:
  
    初始状态：
      a = '3'
      b = '12'
      result = [0, 0, 0]（初始长度为 a.length + b.length，即 3）

    第一次外部循环（i = 0）：
      内部循环（j = 1）：
        m = i + j + 1 = 2
        n = i + j = 1
        s = +a[i] * +b[j] + result[m] = 3 * 2 + 0 = 6
        result[m] = s % 10 = 6 % 10 = 6
        result[n] += Math.floor(s / 10) = 0
      内部循环（j = 0）：
        m = i + j + 1 = 1
        n = i + j = 0
        s = +a[i] * +b[j] + result[m] = 3 * 1 + 0 = 3
        result[m] = s % 10 = 3 % 10 = 3
        result[n] += Math.floor(s / 10) = 0
    循环结束后：result = [0, 3, 6]
    循环结束后，我们得到了最终的结果数组 result 为 [0, 3, 6]。

    接下来，我们移除结果数组开头的所有零位：
      result = [0, 3, 6]（不满足循环条件）
    
    最终结果数组为 [3, 6]
    最后，根据结果数组中的数字和输入的正负号，构建最终的结果字符串: "36"
 */
