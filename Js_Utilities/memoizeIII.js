/**
  Memoization is a common technique to boost performance. If you use React, you definitely have used React.memo before.
  Memoization is also commonly used in algorithm problem, when you have a recursion solution, in most cases, you can improve it by memoization, and then you might be able to get a Dynamic Programming approach.

  So could you implement a general memo() function, which caches the result once called, 
  so when same arguments are passed in, the result will be returned right away.

  The arguments are arbitrary, so memo should accept an extra resolver parameter, which is used to generate the cache key, like what _.memoize() does. 
  Default cache key could be just Array.from(arguments).join('_')

  note: It is a trade-off of space for time, so if you use this in an interview, 
  please do analyze how much space it might cost.
*/

/*-------------------- 用例测试1 -------------------------*/
const add = (arg1, arg2) => arg1 + arg2;

const memoed = memo(add);
memoed(1, 2); // 3, add is called
memoed(1, 2); // 3 is returned right away without calling add
memoed(1, 3); // 4, new arguments, so add is called

/*-------------------- 用例测试2 -------------------------*/
const memoed2 = memo(add, () => 'samekey');
memoed2(1, 2); // 3, add is called, 3 is cached with key 'samekey'
memoed2(1, 2); // 3, since key is the same, 3 is returned without calling add
memoed2(1, 3); // 3, since key is the same, 3 is returned without calling add

/*-------------------------- 用例测试3 ------------------------------*/
function add(a, b) {
  return a + b;
}
const memoizedAdd = memo(add);

memoizedAdd(1, 2);
// add function: is called
// [new value returned: 3]

memoizedAdd(1, 2);
// add function: not called
// [cached result is returned: 3]

memoizedAdd(2, 3);
// add function: is called
// [new value returned: 5]

memoizedAdd(2, 3);
// add function: not called
// [cached result is returned: 5]

memoizedAdd(1, 2);
// add function: not called
// [new value returned: 3]

/* ------------------------- Code solution ------------------------------- */
/**
 * @param {Function} func
 * @param {(args:[]) => string }  [resolver] - cache key generator
 */

function memo(func, resolver) {
  const cache = new Map();

  return function (...args) {
    const cacheKey = resolver ? resolver(...args) : JSON.stringify(args);

    // if cacheKey can find inside cache, return value directly
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }

    // if cacheKey can not find inside cache, need run func to calc value and add it to cache
    const result = func.apply(this, args);
    cache.set(cacheKey, result);
    return result;
  };
}
