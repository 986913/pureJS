/**
 * Converts all lowercase ASCII letters (a–z) in a string
 * to their uppercase equivalents using manual ASCII manipulation.
 *
 * This function only handles standard English letters.
 * Non-alphabetic characters are preserved.
 *
 * ASCII Insight:
 * Lowercase letters (97–122) are exactly 32 greater than
 * their uppercase counterparts (65–90). Therefore,
 * uppercase = lowercase - 32.
 *
 * @throws {TypeError} If input is not a string.
 */

/* -------------------用例测试--------------------- */
getUpperCase('abc'); // "ABC"
getUpperCase('hello'); // "HELLO"
getUpperCase('abcXYZ123!'); // "ABCXYZ123!"
getUpperCase(''); // ""

/**
 ************************************ Solution - 将字符串转换为大写 ************************************
 * @param {string} word - 要转换的字符串
 * @returns {string} - 转换后的大写字符串
 */
export const getUpperCase = (word) => {
  if (typeof word !== 'string') {
    throw new TypeError('Input must be a string');
  }

  let str = '';

  for (let i = 0; i < word.length; i++) {
    const charCode = word.charCodeAt(i);

    // Check if the character is a lowercase letter a-z
    if (charCode >= 97 && charCode <= 122) {
      str += String.fromCharCode(charCode - 32);
    } else {
      str += word[i];
    }
  }

  return str;
};
