/**
  Validate Passwords
  Write a function called validatePasswords(first, second), which takes two string arguments called first and second. 
  Your function needs to check if:
    passwords are equal
    passwords follow the provided password policy.
    If both the conditions are met then return true, otherwise return false.

  Password policy: “Minimum 8 characters long, at least 1 letter, 1 number and 1 special character”
  Directions: If the input string is empty, then it’s not a valid email address
 */

/* -------------------用例测试--------------------*/
validatePasswords('1234567', '1234567'); // Output: false
validatePasswords('abcdefgH1@', 'abcdefgH1@'); // Output: true
validatePasswords('abcdefghi', 'abcdefgH1@'); // Output: false

/* --------------------  Solution: 正则 -------------------- */
const validatePasswords = (first, second) => {
  if (first !== second) return false;

  const validPsdRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
  return validPsdRegex.test(first);
};
/**
 * 拆解这个正则表达式：
 * /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/
 *
 * Password Policy:
 * - 至少8个字符
 * - 至少1个字母
 * - 至少1个数字
 * - 至少1个特殊字符
 *
 * --------------------------------------------------
 *
 * ^ : 匹配字符串开头。
 * 👉 【作用】：从整个字符串开始检查密码规则。
 *
 * --------------------------------------------------
 *
 * (?=.*[A-Za-z])
 *
 * (?=...) : Positive Lookahead（正向先行断言）
 *           只检查条件，不消耗字符。
 *
 * .*      : 任意字符出现任意次（0次或多次）。
 *
 * [A-Za-z]
 *         : 任意一个英文字母（大小写均可）。
 *
 * 👉 【解决规则】：
 * 从当前位置往后看，必须至少能找到一个字母。
 *
 * 例如：
 * "123abc!"  ✅
 * "123456!"  ❌
 *
 * --------------------------------------------------
 *
 * (?=.*\d)
 *
 * \d       : 任意一个数字（0-9）。
 *
 * 👉 【解决规则】：
 * 从当前位置往后看，必须至少能找到一个数字。
 *
 * 例如：
 * "abc123!"  ✅
 * "abcdef!"  ❌
 *
 * --------------------------------------------------
 *
 * (?=.*[^A-Za-z\d])
 *
 * [^...]   : 排除字符集合。
 *
 * [^A-Za-z\d]
 *          : 任何不是字母且不是数字的字符。
 *
 * 例如：
 * ! @ # $ % ^ & * 等。
 *
 * 👉 【解决规则】：
 * 从当前位置往后看，必须至少能找到一个特殊字符。
 *
 * 例如：
 * "abc123!"  ✅
 * "abc123"   ❌
 *
 * --------------------------------------------------
 *
 * .{8,}
 *
 * .        : 任意字符。
 *
 * {8,}     : 至少出现8次。
 *
 * 👉 【解决规则】：
 * 整个密码长度必须 >= 8。
 *
 * 例如：
 * "abc1!"      ❌ (长度5)
 * "abc1234!"   ✅ (长度8)
 *
 * --------------------------------------------------
 *
 * $ : 匹配字符串结尾。
 *
 * 👉 【作用】：
 * 配合 ^ 使用，确保整个字符串都满足规则，
 * 而不是只匹配其中的一部分。
 *
 * --------------------------------------------------
 *
 * 最终效果：
 *
 * ✓ 至少一个字母
 * ✓ 至少一个数字
 * ✓ 至少一个特殊字符
 * ✓ 长度至少8位
 *
 * 示例：
 *
 * "abcdefgH1@"  ✅
 * "12345678!"   ❌ (没有字母)
 * "abcdefgh!"   ❌ (没有数字)
 * "abcdefgH1"   ❌ (没有特殊字符)
 * "abc1!"       ❌ (长度不足8)
 */
