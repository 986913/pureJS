/**
 * Composition is about creating small functions and creating bigger and more complete functions with them.
 * Think of a function as a brick, composition is how you would make those bricks work together to build a wall or a house.
 * The output of the precedent function becomes the input of the next.
 */

/**
  Implement a function **`compose`** that takes multiple functions as arguments and returns a new function that applies those functions in reverse order. 
  The output of one function becomes the input of the next function, creating a chain of function compositions.
  If there are no functions passed to the **`compose`** function, the default behavior is to return a new function that simply returns the input it receives. 
  In other words, the default behavior of **`compose`** without any functions results in a simple identity function.
  You may assume that all the functions accept a single parameter.
 */

/* --------------------- 用例测试 ----------------------- */
const add1 = (num) => num + 1;
const double = (num) => num * 2;
const subtract10 = (num) => num - 10;

const composedFn = compose(subtract10, double, add1);
composedFn(3); // (3 + 1) * 2 - 10 => -2

/* -------------------------- Solution 1: for-loop ----------------------------------------- */
/**
 * @param {...Function} args
 * @returns Function
 */
function compose(...fns) {
  return (arg) => {
    let result = arg;
    for (let i = fns.length - 1; i >= 0; i--) {
      result = fns[i](result);
    }
    return result;
  };
}
/* -------------------------- Solution 2: use reduceRight --------------------------- */
function compose(...fns) {
  return function (arg) {
    return fns.reduceRight((acc, cur) => cur(acc), arg);
  };
}
/* -------------------------- Solution 3: use recurrsion --------------------------- */
function compose(...fns) {
  return function (arg) {
    function apply(fn, ...rest) {
      if (rest.length === 0) return fn(arg);
      return fn(apply(...rest));
    }
    return apply(...fns);
  };
}
