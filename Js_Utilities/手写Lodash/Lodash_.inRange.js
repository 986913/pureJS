/**
 * Implement a function inRange(value, [start=0], end) to check if a number value is between start and up to, but not including, end.
 * If end is not specified, the start argument becomes end and start is set to 0.
 * If start is greater than end the parameters are swapped to support negative ranges.
 */

/* --------------------- 用例测试: 实现这种函数 (similar to 🟡 Lodash_Clamp)----------------------- */
inRange(3, 2, 4); // => true
inRange(4, 2, 4); // => false
inRange(4, 8); // => true       ie: inRange(4, 0, 8)
inRange(4, 2); // => false      ie: inRange(4, 0, 2)
inRange(2, 2); // => false      ie: inRange(2, 0, 2)
inRange(5.2, 4); // => false    ie: inRange(5.2, 0, 4)
inRange(-3, -2, -6); // => true

/* --------------------- Code solution ---------------------------- */
/**
 * @param {number} value The number to check.
 * @param {number} [start=0] The start of the range.
 * @param {number} end The end of the range.
 * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
 */
function inRange(value, start, end) {
  if (!end) {
    end = start;
    start = 0;
  }

  const min = Math.min(start, end);
  const max = Math.max(start, end);
  return value >= min && value < max;
}
