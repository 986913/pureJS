/****************** Lodash_.compact.js  DeepClone.js 的变形题 *****************/

/**
  Implement a function compact(value) that returns a new object with all falsey values removed, 
  including falsey values that are deeply-nested. 
  You can assume the value only contains JSON-serializable values (null, boolean, number, string, Array, Object) 
  and will not contain any other objects like Date, Regex, Map or Set.

  The values false, null, 0, '', undefined, and NaN are falsey (you should know this by heart!).
 */

/* -------------------用例测试--------------------*/
compact([0, 1, false, 2, '', 3, null]); // [1, 2, 3]
compact({ foo: true, bar: null }); // { foo: true }

/* -------------------------- Code Solution: -------------------------------- */
/**
 * @param {Array|Object} value
 * @return {Array|Object}
 */
function compact(value) {
  // Handle primitives.
  if (typeof value !== 'object' || value === null) return value;

  // Handle arrays, or Object.prototype.toString.call(value) === '[object Array]'
  if (Array.isArray(value)) {
    const arr = [];
    value.forEach((item) => {
      if (item) arr.push(compact(item)); // recursion here
    });
    return arr;
  }

  // Handle objects.
  if (Object.prototype.toString.call(value) === '[object Object]') {
    const obj = {};
    Object.entries(value).forEach(([key, val]) => {
      if (val) {
        obj[key] = compact(val); // recursion here
      }
    });
    return obj;
  }
}

/* ---------- Code Solution V2: shorter solution that adopts a more functional approach -------------- */
/**
 * @param {Array|Object} value
 * @return {Array|Object}
 */
function compact(value) {
  if (typeof value !== 'object' || value == null) return value;

  if (Array.isArray(value)) {
    return value.filter((item) => item).map((item) => compact(item));
  }

  return Object.fromEntries(
    Object.entries(value)
      .filter(([_, value]) => value)
      .map(([key, value]) => [key, compact(value)])
  );
}
