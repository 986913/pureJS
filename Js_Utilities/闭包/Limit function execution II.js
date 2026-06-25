/**
Limit function execution II
  you will be implementing a function that accepts a callback function and a number n, which limits how many times the callback can be called. 
  The callbackAtMostN function should return a new function that can be called at most n times.
  The returned function should behave like the original callback function, except that it should only be called at most n times. 
  After the function has been called n times, any further calls to the function should do nothing and return undefined.

  The returned function should take any number of arguments, which should be passed on to the original callback function when it is called.

Directions
  The maximum number of times the callback can be called should be a positive integer.
  The original callback function should be called with the same arguments as the returned function, except for any arguments that are ignored after the maximum number of calls has been reached.
  Any return values from the original callback function should be ignored after the maximum number of calls has been reached.
  The returned function should not modify any external state or variables.
**/

/*-------------------用例测试--------------------*/
const callback = (a, b) => console.log(a + b);
const callbackAtMostTwo = callbackAtMostN(callback, 2);
callbackAtMostTwo(1, 2); // logs 3
callbackAtMostTwo(3, 4); // logs 7
callbackAtMostTwo(5, 6); // does nothing

/*---------------- Code solution -------------------*/
const callbackAtMostN = (callback, n) => {
  let count = 0;
  return function (...args) {
    //  ↑ 普通函数：this 由调用方决定，在运行时动态绑定
    if (count >= n) return;
    count++;
    return callback.apply(this, args);
    //                     ↑ 把调用方的 this 原封不动转发给 callback
  };
};
