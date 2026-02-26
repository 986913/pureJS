/**
  you will be implementing a function called includes(string, substring) that takes two arguments: a string and a substring. 
  The function should return true if the string contains the substring and false otherwise.
 */

/*-----------------用例测试--------------------*/
includes('Hello, world!', 'world'); // Output: true
includes('The quick brown fox', 'jumped'); // Output: false
includes('This is a test', 'is a'); // Output: true
includes('This is a test', ' '); // Output: true
includes('world', 'Hello, world!'); // Output: false

/* ----------------------------- Solution (和containsSubstring一模一样) -------------------------------- */
/**
 * 时间是 O(n)，其中 n 是输入字符串的长度， 空间是O(1)
 */

export const includes = (string, substring) => {
  for (let i = 0; i < string.length; i++) {
    let match = true;
    for (let j = 0; j < substring.length; j++) {
      if (string[i + j] !== substring[j]) {
        match = false;
        break;
      }
    }
    if (match) return true;
  }

  return false;
};
