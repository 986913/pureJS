/**
  Given two sorted array of integers, please return the median： `median([1,2],[3,4,5])   // 3`
  If there are even numbers, return the average： `median([1,2],[3,4])    // 2.5`

  follow-up： What is the time & space cost of your approach? Could you do better?
 */

/* ------------------------- Code solution ------------------------------- */
/**
 * @param {number[]} arr1 - sorted integer array
 * @param {number[]} arr2 - sorted integer array
 * @returns {number}
 */
function median(arr1, arr2) {
  let arr = [...arr1, ...arr2].sort((a, b) => a - b);
  let len = arr.length;
  let midIdx = len / 2;

  if (len % 2 !== 0) return arr[Math.floor(midIdx)];
  return (arr[midIdx] + arr[midIdx - 1]) / 2;
}
