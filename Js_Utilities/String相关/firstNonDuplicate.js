/**
  Write a function firstCharacter(str) which takes a string str as an input. 
  This function has to find the first non-repeating character in the input string. 
  If no such character is found, the function should return null. 
  The solution should be able to handle all types of strings, including empty strings, strings with only one character, and strings with all repeating characters.

  Directions
  If no non-repeating character is found, return null.
  str can consist of any alphanumeric characters.
 */

/*-----------------用例测试--------------------*/
firstCharacter('hello'); // "h"
firstCharacter('dad'); // "a"
firstCharacter('aabbcc'); // null
firstCharacter(''); // null
firstCharacter('foobar123baz456qux789'); // "f"

/* ----------------------------- Solution Code: Map -------------------------------- */
/**
 * @param {string} str
 * @return {string | null}
 * 时空复杂度都是 O(n)，其中 n 是输入字符串的长度
 */
export const firstCharacter = (str) => {
  if (str.length === 0) return null;

  let map = new Map();
  for (let char of str) {
    map.set(char, map.get(char) + 1 || 1);
  }

  for (let i = 0; i < str.length; i++) {
    if (map.get(str[i]) === 1) return str[i];
  }

  return null;
};
