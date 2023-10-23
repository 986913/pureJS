// Lodash _.get documentation:  https://lodash.com/docs/4.17.15#compact

/**
  Implement a function compact(array) that creates an array with all falsey values removed. 
  The values false, null, 0, '', undefined, and NaN are falsey (you should know this by heart!).
 */

/* -------------------用例测试--------------------*/
compact([0, 1, false, 2, '', 3, null]); // => [1, 2, 3]
compact(['hello', 123, [], {}, function () {}]); // => ['hello', 123, [], {}, function() {}]

/* -------------------------- Code Solution: -------------------------------- */
/**
 * @param {Array} array: The array to compact.
 * @return {Array} Returns the new array of filtered values.
 */
function compact(array) {
  return array.filter(Boolean);
}
