// Lodash _.countBy documentation: https://lodash.com/docs/4.17.15#countBy

/**
  Implement a function `countBy(array, iteratee)` that creates an object composed of keys generated from the results of running each element of `array` thru `iteratee`. 
  The corresponding value of each key is the number of times the key was returned by `iteratee`. `iteratee`s can either be:
    - Functions: `iteratee` functions is invoked with one argument: (value).
    - Strings: The property of an object. E.g. `'length'` can be used to return the number of elements of arrays.
 */

/* -------------------用例测试--------------------*/
countBy([6.1, 4.2, 6.3], Math.floor); // { '4': 1, '6': 2 }
countBy(['one', 'two', 'three'], 'length'); // { '3': 2, '5': 1 }

/* -------------------------- Code Solution: -------------------------------- */
/**
 * @param {Array} array The array to iterate over.
 * @param {Function|string} iteratee The function invoked per iteration.
 * @returns {Object} Returns the composed aggregate object.
 */
function countBy(array, iteratee) {
  let result = {};

  // Determine the iteratee function. If iteratee is already a function, we can use it as-is. Otherwise, if a string value was provided, a function is created to access that property on an element.
  const iterateeFn =
    typeof iteratee === 'function' ? iteratee : (val) => val[iteratee];

  array.forEach((item) => {
    const key = iterateeFn(item);
    /* set the value to 0 if key doesn't exist within result.  
      可以用result[key]??=0 代替下面这个if condition */
    if (!Object.prototype.hasOwnProperty.call(result, key)) {
      result[key] = 0;
    }
    result[key]++;
  });

  return result;
}
