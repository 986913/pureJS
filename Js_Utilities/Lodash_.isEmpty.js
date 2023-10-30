// Lodash _.isEmpty documentation:  https://lodash.com/docs/4.17.15#isEmpty
/*
  Implement a function isEmpty(value) to check if a value is an empty object, collection, map, or set.
  Array-like values such as arguments objects, arrays, strings, or jQuery-like collections are considered empty if they have a length of 0. 
  Similarly, maps and sets are considered empty if they have a size of 0.
  However for this question, we only need to consider arrays, strings, objects, maps, and sets.
 */
/* -------------------用例测试--------------------*/
isEmpty(null); // => true
isEmpty(true); // => true
isEmpty(1); // => true
isEmpty([1, 2, 3]); // => false
isEmpty({ a: 1 }); // => false

/* -------------------------- Code Solution: -------------------------------- */
/**
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 */
function isEmpty(value) {
  // null, undefined case
  if (value === null || value === undefined) return true;
  // Map, set case
  if (value instanceof Map || value instanceof Set) return !value.size;
  // plain object case
  if (Object.prototype.toString.call(value) === '[object Object]') {
    return !Object.keys(value).length;
  }
  /* plain object case, 另一种写法：
    const prototype = Object.getPrototypeOf(value);
    if (prototype === null || prototype === Object.prototype) {
      return Object.keys(value).length === 0;
    }
  */

  // string, array case
  return !value.length;
}
