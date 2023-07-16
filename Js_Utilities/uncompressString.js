/* 
  Given a compressed string, return its original form.
    1. a number `k` followed by a pair of parenthesis, meaning to repeat the substring inside the parenthesis by `k` times, `k` is positive integer.
    2. inputs are guaranteed to be valid input like above example, there is no numerical digit in original form.
 */

/* --------------------- 用例测试 ----------------------- */
uncompress('3(ab)'); // 'ababab'
uncompress('3(ab2(c))'); // 'abccabccabcc'
uncompress('2(BFE)3(dev)'); // 'BFEBFEdevdevdev'
uncompress('1(BFE11(dev))'); // "BFEdevdevdevdevdevdevdevdevdevdevdev"

/* -------------------- Code solution -------------------- */
// helper function:
const isNumeric = (c) => !isNaN(parseFloat(c)) && isFinite(Number(c));

/**
 * @param {string} str
 * @return {string}
 * Main function:
 */
function uncompress(str) {
  const stack = [];

  for (const char of str) {
    if (char !== ')') {
      stack.push(char);
    } else {
      let word = '';
      let count = ''; // count初始化肯定是''

      // 1. 找字符串
      while (stack.length && stack[stack.length - 1] !== '(') {
        word = stack.pop() + word;
      }
      stack.pop();
      // 2.找重复次数
      while (stack.length && isNumeric(stack[stack.length - 1])) {
        count = stack.pop() + count;
        /* 可以正确地从stack中获取多位数的重复次数，并保持数字的正确顺序:
            如果我们使用 count = stack.pop()，则只能获取到一个单独的数字字符，而不是完整的多位数。
            例如，如果重复次数是 12，如果我们使用 count = stack.pop()，我们只能获得数字 2，而不是 12。
            通过使用 count = stack.pop() + count，我们将先获取数字 2，然后将其连接到 count 的开头，然后再次循环获取数字 1 并连接到 count 的开头，得到正确的重复次数 12。
        */
      }
      stack.push(word.repeat(Number(count)));
    }
  }

  return stack.join('');
}
