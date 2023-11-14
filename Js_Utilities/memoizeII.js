/**
  A memoize function is a higher-order function that takes in a function and returns a memoized version of it. 
  The memoized function caches the results of expensive function calls and returns the cached result when it receives the same inputs again. 
  This can significantly improve the performance of functions that involve complex processing / significant latency and are called with the same arguments repeatedly.

  Implement a function memoize(func) that takes in a function parameter func and returns a memoized version of the function. 
  You may assume that func only accepts strings or numbers as arguments.


 */

/*-------------------- 用例测试 -------------------------*/
function expensiveMul(a, b) {
  console.log('Computing...');
  return a * b;
}

// Create a memoized version of the function.
const memoizedExpensiveMul = memoize(expensiveMul);

// First call (computes and caches the result).
console.log(memoizedExpensiveMul(3, 7)); // Output: Computing... 21

// Second call with the same argument (returns the cached result).
console.log(memoizedExpensiveMul(3, 7)); // Output: 21

// Third call with a different argument (computes and caches the new result).
console.log(memoizedExpensiveMul(5, 8)); // Output: Computing... 40

// Fourth call with the same argument as the third call (returns the cached result).
console.log(memoizedExpensiveMul(5, 8)); // Output: 40

/* ------------------------- Code solution ------------------------------- */
/**
 * @param {Function} func
 * @returns Function
 */

function memoize(func) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = func.apply(this, args);
    cache.set(key, result);
    return result;
  };
}
