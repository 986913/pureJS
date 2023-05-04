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
pipe([])(1); // 1
pipe([times(2)])(1); //2
pipe([times(2), times(3)])(2); //12                      ie: 2x2x3
pipe([times(2), times(3), plus(4)])(2); // 16            ie: 2x2x3+4
pipe([times(2), subtract(3), divide(4)])(2); // 0.25     ie:(2x2-3)/4

/* -------------------------- Solution 1 ----------------------------------------- */
/**
 * @param {Array<(arg: any) => any>} funcs
 * @return {(arg: any) => any}
 */

function pipe(funcs) {
  return (arg) => {
    let result = arg;
    funcs.forEach((fn) => {
      result = fn(result);
    });
    return result;
  };
}
/* -------------------------- Solution 2: use reducer--------------------------- */
function pipe(funcs) {
  return (arg) => {
    return funcs.reduce((acc, cur) => {
      return cur(acc);
    }, arg);
  };
}
