/**
 * Implement a function inRange(value, [start=0], end) to check if a number value is between start and up to, but not including, end.
 * If end is not specified, the start argument becomes end and start is set to 0.
 * If start is greater than end the parameters are swapped to support negative ranges.
 */

/* --------------------- 用例测试: 实现这种函数 ----------------------- */
inRange(3, 2, 4); // => true
inRange(4, 8); // => true
inRange(4, 2); // => false
inRange(2, 2); // => false
inRange(1.2, 2); // => true
inRange(5.2, 4); // => false
inRange(-3, -2, -6); // => true

/* --------------------- Code solution ---------------------------- */
/**
 * @param {number} value The number to check.
 * @param {number} [start=0] The start of the range.
 * @param {number} end The end of the range.
 * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
 */
function inRange(value, start, end) {
  throw 'Not implemented';
}
