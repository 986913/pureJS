/**
  Given an integer, count "1" in its binary form.
  1. If you use built-in string methods in JavaScript, please do understand the time complexity, they are not free.
  2. Actually this could be easily done by counting the digit one by one. Could you think of some other approaches?
 */

/* --------------------- 用例测试 ----------------------- */
countOne(1); // 1,  "1"
countOne(257799); // 12, "111110111100000111"

/* -------------------------- Solution1: bite operation --------------------------- */
/**
 * @param {number} num - integer
 * @return {number} count of 1 bit
 */
function countOne(num) {
  let count = 0;
  while (num !== 0) {
    // num & 1 checks if last digit of num is 1 because it will perform '&' on last digit of num
    if ((num & 1) === 1) {
      count++;
    }

    // consider it as a loop incrementer.
    num = num >> 1; // right shifts number (cuts from right and adds 0 from left)
  }
  return count;
}

/* -------------------------- Solution2: reg expression --------------------------- */
/**
 * @param {number} num - integer
 * @return {number} count of 1 bit
 */
function countOne(num) {
  return (num.toString(2).match(/1/g) || []).length;
}
