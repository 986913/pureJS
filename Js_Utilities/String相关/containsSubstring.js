/**
  you will be implementing a function called containsSubstring(string, substring) that takes two arguments: a string and a substring. 
  The function should return true if the string contains the substring and false otherwise.
 */

/*-----------------用例测试--------------------*/
containsSubstring('Hello, world!', 'world'); // Output: true
containsSubstring('The quick brown fox', 'jumped'); // Output: false
containsSubstring('This is a test', 'is a'); // Output: true
containsSubstring('This is a test', ' '); // Output: true
containsSubstring('world', 'Hello, world!'); // Output: false

/* ----------------------------- Solution -------------------------------- */
/**
 * 时间是 O(n)，其中 n 是输入字符串的长度， 空间是O(1)
 */

export const containsSubstring = (string, substring) => {
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
