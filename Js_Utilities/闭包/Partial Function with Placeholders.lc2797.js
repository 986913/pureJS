/*
  Input: fn = (a, b, c) => b + a - c, args = ["_", 5], restArgs = [5, 20]
  Output: -10
  Explanation: 
    const partialFn = partial(fn, args)
    const result = partialFn(...restArgs)
    console.log(result) // -10

  Input: fn = (...args) => args, args = [1,2,"_",4,"_",6], restArgs = [3,5]
  Output: [1,2,3,4,5,6]
  Explanation: 
    const partialFn = partial(fn, args) 
    const result = partialFn(...restArgs) 
    console.log(result) // [1,2,3,4,5,6] 

  Input: fn = (...args) => args, args = [2,4,6], restArgs = [8,10]
  Output: [2,4,6,8,10]
    Explanation: 
    const partialFn = partial(fn, args)
    const result = partialFn(...restArgs) 
    console.log(result) // [2,4,6,8,10]
  There are no placeholders "_" in args therefore restArgs is just added at the end of args. 
  Then the elements of the args are passed as separate arguments to fn, 
  which returns passed arguments as an array.
 */

/**
 * @param {Function} fn
 * @param {Array} args
 * @return {Function}
 */

var partial = function (fn, args) {
  return function (...restArgs) {
    let finalParams = [];
    for (let i = 0; i < args.length; i++) {
      if (args[i] === '_') {
        finalParams.push(restArgs.shift());
      } else {
        finalParams.push(args[i]);
      }
    }
    if (restArgs.length > 0) finalParams = [...finalParams, ...restArgs];

    return fn.apply(this, finalParams);
  };
};
