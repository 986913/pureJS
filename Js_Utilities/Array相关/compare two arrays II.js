/**
 * Checks whether two arrays contain the same elements
 * (including duplicate frequency), regardless of order.
 *
 * The input arrays are not modified.
 *
 * @param {Array<number|string>} array1 - The first array of primitive values.
 * @param {Array<number|string>} array2 - The second array of primitive values.
 * @returns {boolean} Returns true if both arrays contain the same elements
 * with identical frequency; otherwise, returns false.
 *
 * @example
 * haveSameElements([1, 2, 3, 4], [4, 3, 2, 1]) // true
 * haveSameElements([1, 2], [4, 3, 2, 1])       // false
 * haveSameElements([1, 2, 2], [2, 2, 2])       // false
 * haveSameElements([1, 2, 3], [1, 2, 4])       // false
 *
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 */

export const haveSameElements = (array1, array2) => {
  if (array1.length !== array2.length) return false;

  let freqMap = new Map();
  array1.forEach((item) => freqMap.set(item) + 1 || 1);

  for (let i = 0; i < array2.length; i++) {
    let num = array2[i];
    if (!freqMap.has(num)) return false;
    freqMap.set(num, freqMap.get(num) - 1);
    if (freqMap.get(num) < 0) return false;
  }

  return true;
};
