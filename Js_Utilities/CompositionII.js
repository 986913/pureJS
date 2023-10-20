/**
 * Composition is about creating small functions and creating bigger and more complete functions with them.
 * Think of a function as a brick, composition is how you would make those bricks work together to build a wall or a house.
 * The output of the precedent function becomes the input of the next.
 */

/**
  Here you are asked to create a pipe() function,  which chains multiple functions together to create a new function.
  Suppose we have some simple functions like this:
    const times = (y) =>  (x) => x * y
    const plus = (y) => (x) => x + y
    const subtract = (y) =>  (x) => x - y
    const divide = (y) => (x) => x / y
  Your pipe() would be used to generate new functions:
    pipe([ times(2), times(3)])               // x * 2 * 3
    pipe([ times(2), plus(3), times(4)])      // (x * 2 + 3) * 4
    pipe([ times(2), subtract(3), divide(4)]) // (x * 2 - 3) / 4  
  
  notes: to make things simple, functions passed to pipe() will all accept 1 argument
  
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
