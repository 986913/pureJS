// Lodash _.groupBy documentation: https://lodash.com/docs/4.17.15#groupBy

/**
Implement a function groupBy(array, iteratee) that takes a array and an iteratee function or a property name string, 
and groups the values in the array based on the iteratee.
  iteratees can either be:
    Functions: iteratee functions is invoked with one argument: (value).
    Strings: The property of an object. E.g. 'length' can be used to return the number of elements of arrays.
 */

/* -------------------用例测试--------------------*/

/* -------------------------- Code Solution: -------------------------------- */
/**
 * @param {Array} array The array to iterate over.
 * @param {Function|string} iteratee The iteratee to transform keys.
 * @returns {Object} Returns the composed aggregate object.
 */
function groupBy(array, iteratee) {
  const result = {};

  const iterateeFn =
    typeof iteratee === 'function' ? iteratee : (val) => val[iteratee];
  array.forEach((item) => {
    const key = iterateeFn(item);
    /* 这个condition相当于下面的result[key] ??= []
      if(!Object.prototype.hasOwnProperty.call(result, key)){
        result[key] = [];
      } 
    */
    result[key] ??= [];
    result[key].push(item);
  });

  return result;
}
