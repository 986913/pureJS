/**
  Given a string, please find the longest substring that has no repeated characters.
  If there are multiple result, any one substring is fine.
 */
/* ------------------- 用例测试 --------------------*/
longestUniqueSubstr('aaaaa'); // 'a'
longestUniqueSubstr('abcabc'); // 'abc', or 'bca', or 'cab'
longestUniqueSubstr('a12#2'); // 'a12#'

/* --------------------- Code solution： Sliding window ---------------------------- */
/**
 * @param {string} str
 * @return {string}
 */

function longestUniqueSubstr(str) {
  if (str.length == 0) return '';

  let windowStart = 0;
  longestSubstr = '';
  charFrequency = new Map();

  for (let windowEnd = 0; windowEnd < str.length; windowEnd++) {
    charFrequency.set(
      str[windowEnd],
      charFrequency.get(str[windowEnd]) + 1 || 1
    );

    // until you have unique characters
    while (charFrequency.get(str[windowEnd]) > 1) {
      let leftChar = str[windowStart]; // grab the left most character
      charFrequency.set(leftChar, charFrequency.get(leftChar) - 1); // decremenet by the count by 1
      if (charFrequency.get(leftChar) === 0) {
        charFrequency.delete(leftChar); // remove the character form hashmap if it's count is 0
      }
      windowStart += 1; // shrink the window
    }
    // get the length of characters in charFrequency by substracting the windowEnd from windowStart (1 is added as index is 0 based while we want length)
    longestSubstr =
      longestSubstr.length >= windowEnd - windowStart + 1
        ? longestSubstr
        : str.substring(windowStart, windowEnd + 1);
  }
  return longestSubstr;
}
