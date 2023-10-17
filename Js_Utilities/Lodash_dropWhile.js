// Lodash _.dropRightWhile documentation: https://lodash.com/docs/4.17.15#dropWhile

/**
  Implement a function dropWhile(array, predicate) that creates a slice of array excluding elements dropped from the beginning. 
  Elements are dropped until predicate returns falsey. Your function should not modify the original array.
 */

/* -------------------用例测试--------------------*/
dropWhile([1, 2, 3, 4, 5], (value) => value < 3); // => [3, 4, 5]
dropWhile([1, 2, 3], (value) => value < 6); // => []

/* -------------------------- Code Solution: -------------------------------- */
/**
 * @param {Array} array - The array to iterate over.
 * @param {Function} predicate - The function invoked per iteration.
 * @return {Array} Returns the slice of `array`.
 */
function dropWhile(array, predicate) {
  let idx = 0;
  while (idx <= array.length - 1 && predicate(array[idx], idx, array)) {
    idx++;
  }
  return array.slice(idx);
}
