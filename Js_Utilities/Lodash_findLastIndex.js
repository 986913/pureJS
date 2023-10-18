// Lodash _.findLastIndex documentation: https://lodash.com/docs/4.17.15#findLastIndex

/**
  Implement a function findLastIndex(array, predicate, [fromIndex=array.length-1]) that takes an array of values, 
  a function predicate, and an optional fromIndex number argument, 
  and returns the index of the last element in the array that satisfies the provided testing function predicate. 
  The elements of the array are iterated from right to left.
 */

/* -------------------用例测试--------------------*/
const arr = [5, 4, 3, 2, 1];

// Search for the last value in the array that is greater than 3 and return the index.
findLastIndex(arr, (num) => num > 3); // => 1

// Start searching from index 3 (inclusive).
findLastIndex(arr, (num) => num > 1, 3); // => 3

// Start searching from index 3 (inclusive).
findLastIndex(arr, (num) => num < 1, 3); // => -1

// Start searching from index 2.
findLastIndex(arr, (num) => num > 2, -3); // => 2

findLastIndex(arr, (num) => num % 2 === 0, -3); // => 1

// Start from the last index if fromIndex >= array.length.
findLastIndex(arr, (num) => num > 0, 10); // => 4

// Search leftwards from index that's already out of bounds,
// which will always result in -1.
findLastIndex(arr, (num) => num > 2, -10); // => -1

/* -------------------------- Code Solution: -------------------------------- */
/**
 * This function returns the index of the last element in the array that satisfies the provided testing function.
 * Otherwise, it returns -1.
 *
 * @param {Array} array - The array to search.
 * @param {Function} predicate - The function invoked per iteration.
 * @param {number} [fromIndex=array.length-1] - The index to start searching from.
 * @returns The index of the found element, else -1.
 */
function findLastIndex(array, predicate, fromIndex = array.length - 1) {
  let len = array.length;
  // 注意startIndex handle：
  let startIndex =
    fromIndex >= 0
      ? Math.min(fromIndex, len - 1)
      : Math.max(len + fromIndex, 0);

  //从后往前循环
  for (let i = startIndex; i >= 0; i--) {
    if (predicate(array[i], i, array)) return i;
  }

  return -1;
}
