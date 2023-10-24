/**
  Write a function `createCounter`. It should accept an initial integer `init`. It should return an object with three functions.
  The three functions are:
    - `increment()` increases the current value by 1 and then returns it.
    - `decrement()` reduces the current value by 1 and then returns it.
    - `reset()` sets the current value to `init` and then returns it.
    - `get()`: returns the current value.
 */
/*-------------------用例测试1--------------------*/
const counter = createCounter(5);
counter.increment(); // 6
counter.reset(); // 5
counter.decrement(); // 4

/*-------------------用例测试2--------------------*/
const counter2 = makeCounter();
counter2.get(); // 0
counter2.increment(); // 1
counter2.increment(); // 2
counter2.get(); // 2
counter2.reset(); // 0
counter2.decrement(); // -1

/*-------------------用例测试3--------------------*/
const counter3 = makeCounter(5);
counter3.get(); // 5
counter3.decrement(); // 4
counter3.decrement(); // 3
counter3.get(); // 3
counter3.reset(); // 5
counter3s.increment(); // 6

/* ---------------------  Code solution ----------------------- */
/**
 * @param {integer} init
 * @return { increment: Function, decrement: Function, reset: Function }
 */
const createCounter = (init = 0) => {
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
  function get() {
    return value;
  }

  return {
    increment,
    reset,
    decrement,
    get,
  };
};
