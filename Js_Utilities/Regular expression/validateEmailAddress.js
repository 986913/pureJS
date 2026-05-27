/**
  Validate Email Address
  In this coding challenge, you will be implementing a function called validateEmailAddress(email) that takes in a string argument called email. The goal of the function is to validate whether the provided string has a valid email format.

  The function should return true if the email is valid and false otherwise. 
  A valid email should meet the following requirements:
    The string should contain exactly one "@" symbol.
    The "@" symbol should not be the first or last character of the string.
    The string should contain at least one period (".") after the "@" symbol.
    The period should not be the first or last character after the "@" symbol.
    The period should not immediately follow the "@" symbol.
  
  Directions: If the input string is empty, then it’s not a valid email address
 */

/* -------------------用例测试--------------------*/
validateEmailAddress('test-test@example.com'); //  true
validateEmailAddress('test@@test.com'); //  false
validateEmailAddress('test@.com'); //  false
validateEmailAddress('test@example.com'); //  true

/* --------------------  Solution: 正则 -------------------- */
const validateEmailAddress = (email) => {
  if (!email) return false;
  return /^[^@]+@[^@\.]+\.[^@]+$/.test(email);
  /**
   * 拆解这个正则表达式：/^[^@]+@[^@]+\.[^@]+$/
   * * ^       : 匹配字符串的开头。
   * * [^@]+   : 中括号里的 ^ 表示“非/排除”。[^@] 表示“只要不是 @ 的任意字符”。
   * 后面的 + 表示“至少得有一个（1次或多次）”。
   * 👉 【解决规则】：确保 @ 前面必须有内容，即 @ 不能在开头！
   *
   * * @       : 匹配有且仅有一个的 "@" 符号。
   * 👉 【解决规则】：因为前后都被限制死不能有其他 @，所以确保了全局只有唯一一个 @。
   *
   * * [^@\.]+ : （为了极致严谨，中间加了 \. 排除点号）匹配至少一个既不是 @ 也不是点号的字符。
   * 👉 【解决规则】：确保 @ 和 . 之间必须有其他字符，即点号不能紧跟在 @ 后面！
   *
   * * \.      : 匹配一个真正的点号 "."（反斜杠用于转义，否则点号在正则里代表任意字符）。
   * 👉 【解决规则】：确保 @ 后面至少有一个点号。
   *
   * * [^@]+   : 再次匹配至少一个不是 @ 的字符。
   *
   * * $       : 匹配字符串的结尾。
   * 👉 【解决规则】：因为结尾 $ 前面必须有 [^@]+（至少一个字符），
   * 这就倒推证明了 点号(.) 后面必须还有内容，即点号不能在末尾！
   */
};
