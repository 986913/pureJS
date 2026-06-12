/**
  Limit function execution I
    you will be implementing a function callbackAtMostOnce(callback) that accepts a callback function and returns a new function that can be called at most once. 
    The returned function should behave like the original callback function, except that it should only be called at most once. 
    After the function has been called once, any further calls to the function should do nothing and return undefined.

  The returned function should take any number of arguments, which should be passed on to the original callback function when it is called.

  Directions
    The original callback function should be called with the same arguments as the returned function, except for any arguments that are ignored after the first call has been made.
    Any return values from the original callback function should be ignored after the first call has been made.
    The returned function should not modify any external state or variables.
**/

/*-------------------用例测试--------------------*/
const callbackAtMostOnceFn = callbackAtMostOnce((a, b) => console.log(a + b));
callbackAtMostOnceFn(1, 2); // logs 3
callbackAtMostOnceFn(3, 4); // does nothing

/*---------------- Code solution -------------------*/
const callbackAtMostOnce = (callback) => {
  let res;
  let hasCalled = false;

  // 这里使用regular function 是为了 usage会有上下文
  return function (...args) {
    if (hasCalled) return;

    res = callback.apply(this, args);
    hasCalled = true;
    return res;
  };
};
