/**
  Given a string, write a function to remove the duplicate characters to make sure that each character only occurs once.

  For example: 
    'xyzabcxyzabc'
  Each character appears twice, we could make it unique as follows:
    'xyzabc'
    'xyabcz'
    'xabcyz'
    'abcxyz'
    'abxyzc'
    .....

  Above all subsequences contains unique characters, but you need to return the smallest one in lexicographical order( 'a' -> 'z'), which is `'abcxyz'`.
  All input only contains valid lowercase alphabets only.
 */

/* -------------------用例测试--------------------- */
smallestUniqueSubstr('a'); // "a"
smallestUniqueSubstr('aba'); // "ab"
smallestUniqueSubstr('bab'); // "ab"
smallestUniqueSubstr('babac'); // "abc"
smallestUniqueSubstr('xyzabcxyzabc'); // "abcxyz"
smallestUniqueSubstr('xyzabc'); // "xyzabc"
smallestUniqueSubstr('bac'); // "bac"
smallestUniqueSubstr('baceaced'); // "baced"
smallestUniqueSubstr('cbacba'); // "acb"
smallestUniqueSubstr('xyzbab'); // "xyzab"

/* ------------------------------------ Solution : use Stack (leetcode 🟡 316) -------------------------------------------- */
//使用stack来维护一个最小的唯一子串。它通过比较字符的大小和最后出现位置来判断是否需要从栈中弹出元素，并保持栈中的元素按字典序递增。这样，最终栈中的元素就是最小的唯一子串
/**
 * @param {string} str
 * @return {string}
 */
function smallestUniqueSubstr(str) {
  let stack = [];
  let visited = new Set();
  let occurance = new Map(); //记录str中每个字符的最后出现位置

  for (let i = 0; i < str.length; i++) {
    occurance.set(str[i], i);
  }

  for (let i = 0; i < str.length; i++) {
    let char = str[i];

    if (!visited.has(char)) {
      while (
        stack.length &&
        stack[stack.length - 1] > char &&
        occurance.get(stack[stack.length - 1]) > i
      ) {
        visited.delete(stack.pop());
      }

      visited.add(char);
      stack.push(char);
    }
  }

  return stack.join('');
}
