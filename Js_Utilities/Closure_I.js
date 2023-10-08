/**
  Implement a function makeCounter that accepts an optional integer value and returns a function. 
  When the returned function is called initially, it returns the initial value if provided, otherwise 0. 
  The returned function can be called repeatedly to return 1 more than the return value of the previous invocation.
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
/*-------------------用例测试3--------------------*/
const counter = makeCounter();
counter(); // 0
counter(); // 1
counter(); // 2

/* ---------------------  Code solution ----------------------- */
/**
 * @param {number} initialValue
 * @return {Function}
 */
function makeCounter(initialValue) {
  let result = !initialValue ? 0 : initialValue;
  let isFirstTimeCall = true;

  return function () {
    if (isFirstTimeCall) {
      isFirstTimeCall = false;
      return result;
    }
    return (result += 1);
  };
}
