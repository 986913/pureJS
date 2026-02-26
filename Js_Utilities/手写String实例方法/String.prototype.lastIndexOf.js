/**
  you will be implementing a function called findLastIndexOf(string, substring) that takes two arguments: a string and a substring. 
  The function should return the index of the last occurrence of the value in the string.
  If no element is found, return -1.
 */

/*-----------------用例测试--------------------*/
findLastIndexOf('hello world', 'o'); // Output: 7
findLastIndexOf('testing', 't'); // Output: 3
findLastIndexOf('abcdef', 'xyz'); // Output: -1

/* ----------------------------- Solution (和containsSubstring/String.prototype.includes很像) -------------------------------- */
/**
 * 时间是 O(n)，其中 n 是输入字符串的长度， 空间是O(1)
 */
export const findLastIndexOf = (string, substring) => {
  let lastIndex = -1;

  for (let i = 0; i < string.length; i++) {
    let match = true;
    for (let j = 0; j < substring.length; j++) {
      if (string[i + j] !== substring[j]) {
        match = false;
        break;
      }
    }
    if (match) lastIndex = i;
  }

  return lastIndex;
};
