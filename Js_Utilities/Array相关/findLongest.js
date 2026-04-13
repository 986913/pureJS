/**
Longest string in the array
In this coding challenge, you will be implementing a function called findLongest(array) that takes an array of strings array as the argument. The function should return the longest string in the array.

Directions
If the input array is empty, then return ''.
If two or more strings have the same length, return the one with a lower index.

 */

/*-----------------用例测试--------------------*/
findLongest(['cat', 'dog', 'elephant']); // Output: 'elephant'
findLongest(['apple', 'banana', 'pear']); // Output: 'banana'
findLongest(['', 'a', 'aa', 'aaa']); // Output: 'aaa'
findLongest([]); // Output: ''

/* ----------------------------- Solution: ForLoop -------------------------------- */
// 时间O(n)，空间O(1)
const findLongest = (array) => {
  if (array.length === 0) return '';

  let maxLen = -Infinity;
  let res = '';

  for (let i = 0; i < array.length; i++) {
    let str = array[i];
    let len = str.length;
    if (len > maxLen) {
      maxLen = len;
      res = str;
    }
  }

  return res;
};
