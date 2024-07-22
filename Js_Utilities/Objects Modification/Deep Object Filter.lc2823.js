/**
 * @param {Object|Array} obj
 * @param {Function} fn
 * @return {Object|Array|undefined}
 */

var deepFilter = function (obj, fn) {
  // base condition
  if (typeof obj !== 'object' || obj === null) {
    if (fn(obj)) return obj;
    return undefined;
  }

  let result = Array.isArray(obj) ? [] : {};

  for (let key in obj) {
    const filterd = deepFilter(obj[key], fn); // <-- recursion here
    if (filterd !== undefined) {
      if (Array.isArray(result)) result.push(filterd);
      else result[key] = filterd;
    }
  }
  // return result, based on result type
  if (Array.isArray(result)) {
    return result.length > 0 ? result : undefined;
  } else {
    return Object.keys(result).length > 0 ? result : undefined;
  }
};
