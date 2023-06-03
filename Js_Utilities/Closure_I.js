/**
 * Given an integer n, return a counter function.
 * This counter function initially returns n and then returns 1 more than the previous value every subsequent time it is called (n, n + 1, n + 2, etc).
 */
/*-------------------用例测试1--------------------*/
const counter = createCounter(10);
counter(); // 10
counter(); // 11
counter(); // 12
/*-------------------用例测试2--------------------*/
const counter = createCounter(-2);
counter(); // -2
counter(); // -1
counter(); // 0

/* ---------------------  Code solution ----------------------- */
/**
 * @param {number} n
 * @return {Function} counter
 */

var createCounter = function (n) {
  let result = n;
  let isFirstTimeCall = true;

  return function () {
    if (isFirstTimeCall) {
      isFirstTimeCall = false;
      return n;
    } else {
      return (result += 1);
    }
  };
};
