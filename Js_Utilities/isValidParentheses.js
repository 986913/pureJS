/**
  Given a string containing only following characters:
    1. parentheses : `(` or `)`
    2. brackets: `[` or `]`
    3. braces: `{` or `}`
  write a function to **determine if they are valid**. By 'valid', it means all should be rightly paired, and with the valid order.
  Follow-up:  What is time & space complexity of your approach ? Can you do it better?
 */

/*-----------------用例测试--------------------*/
isValid('{}[]()'); // true
isValid('{[()]}'); // true
isValid('{[}]'); // false, they are not in the right order
isValid('{}}'); // false, last `}` is not paired with `{`

/* --------------------------- 👍👍👍:  use stack ------------------ */
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  let stack = [];

  for (let char of s) {
    // 碰到左括号，给栈放右括号
    switch (char) {
      case '(':
        stack.push(')');
        break;
      case '{':
        stack.push('}');
        break;
      case '[':
        stack.push(']');
        break;
      //碰到s中的右括号时，如果不匹配stack pop元素 则就不匹配, 直接返回false
      default:
        if (char !== stack.pop()) return false;
    }
  }

  return stack.length === 0; //stack中要有对于元素的话，说明s中有多余的左括号或者右括号
};
