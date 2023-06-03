/**
  Write a function `createCounter`. It should accept an initial integer `init`. It should return an object with three functions.
  The three functions are:
    - `increment()` increases the current value by 1 and then returns it.
    - `decrement()` reduces the current value by 1 and then returns it.
    - `reset()` sets the current value to `init` and then returns it.
 */
/*-------------------用例测试--------------------*/
const counter = createCounter(5);
counter.increment(); // 6
counter.reset(); // 5
counter.decrement(); // 4

/* ---------------------  Code solution ----------------------- */
/**
 * @param {integer} init
 * @return { increment: Function, decrement: Function, reset: Function }
 */
var createCounter = function (init) {
  let value = init;
  function increment() {
    return (value += 1);
  }
  function reset() {
    value = init;
    return value;
  }
  function decrement() {
    return (value -= 1);
  }

  return {
    increment,
    reset,
    decrement,
  };
};
