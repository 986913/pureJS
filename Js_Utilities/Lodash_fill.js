// Lodash _.dropRightWhile documentation: https://lodash.com/docs/4.17.15#dropWhile

/**
  Implement a function `fill(array, value, [start=0], [end=array.length])` that fills an array with values from `start` up to, but not including, `end`.
  Note: This method mutates `array`
 */

/* -------------------用例测试--------------------*/
fill([1, 2, 3], 'a'); // ['a', 'a', 'a']
fill([4, 6, 8, 10], '*', 1, 3); // [4, '*', '*', 10]
fill([4, 6, 8, 10, 12], '*', -3, -1); // [4, 6, '*', '*', 12]

/* -------------------------- Code Solution: -------------------------------- */
/**
 * @param {Array} array - The array to fill.
 * @param {*} value - The value to fill array with.
 * @param {number} [start=0] - The start position.
 * @param {number} [end=array.length] - The end position.
 * @return {Array} Returns the filled array.
 */
function fill(array, value, start = 0, end = array.length) {
  const length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : length + start;
  }

  if (end > length) {
    end = length + 1;
  }

  if (end < 0) {
    end += length;
  }

  for (let i = start; i < Math.min(end, array.length); i++) {
    array[i] = value;
  }

  return array;
}
