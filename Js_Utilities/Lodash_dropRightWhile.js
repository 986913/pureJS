// Lodash _.dropRightWhile documentation:  https://lodash.com/docs/4.17.15#dropRightWhile

/**
  Implement a function dropRightWhile(array, predicate) that creates a slice of array excluding elements dropped from the end. 
  Elements are dropped until predicate returns falsey. Your function should not modify the original array.
 */

/* -------------------用例测试--------------------*/
dropRightWhile([1, 2, 3, 4, 5], (value) => value > 3); // => [1, 2, 3]
dropRightWhile([1, 2, 3], (value) => value < 6); // => []
dropRightWhile([1, 2, 3, 4, 5], (value) => value > 6); // => [1, 2, 3, 4, 5]

/* -------------------------- Code Solution: -------------------------------- */
/**
 * @param {Array} array - The array to iterate over.
 * @param {Function} predicate - The function invoked per iteration.
 * @return {Array} Returns the slice of `array`.
 */
function dropRightWhile(array, predicate) {
  let idx = array.length - 1;

  while (idx >= 0 && predicate(array[idx], idx, array)) {
    idx--;
  }

  return array.slice(0, idx + 1);
}
