/**
  Given an array of numbers, pick any two numbers a and b, we could get the difference by Math.abs(a - b).
  Can you write a function to get the largest difference?
 */

/*------------- 用例测试 ---------------*/
largestDiff([-1, 2, 3, 10, 9]); // 11,  obviously Math.abs(-1 - 10) is the largest
largestDiff([]); // 0
largestDiff([1]); // 0
largestDiff([1, 2, 3, -100, -Infinity]); // Infinity;
largestDiff([1, 2, 3, -100, Infinity]); // Infinity
largestDiff([1, 2, 3, -100, 100]); // 200

/* ------------------------- Code solution1 : double for-loop ------------------------------- */
/**
 * @param {number[]} arr
 * @return {number}
 */
function largestDiff(arr) {
  let result = 0;

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      result = Math.max(result, Math.abs(arr[i] - arr[j]));
    }
  }

  return Number.isFinite(result) ? result : Infinity;
}

/* ------------------------- Code solution2 : sort ------------------------------- */
/**
 * @param {number[]} arr
 * @return {number}
 */
function largestDiff(arr) {
  if (arr.length <= 1) return 0;

  arr.sort((a, b) => a - b);
  const result = Math.abs(arr[arr.length - 1] - arr[0]);
  return Number.isFinite(result) ? result : Infinity;
}

/* ------------------------- Code solution3 : Math.min + Math.max ------------------------------- */
/**
 * @param {number[]} arr
 * @return {number}
 */
function largestDiff(arr) {
  if (arr.length <= 1) return 0;
  return Math.abs(Math.max(...arr) - Math.min(...arr));
}
