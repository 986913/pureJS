/**
 * @param {Object} obj
 * @return {Function}
 */

/*********************************** 其实就是手写Function.prototype.bind *****************************************/
Function.prototype.bindPolyfill = function (obj, ...args) {
  const originalFn = this;
  return function (...otherArgs) {
    return Reflect.apply(originalFn, obj, [...args, ...otherArgs]);
  };
};

/**
Reflect.apply()是JS的内置函数，用于调用指定函数并传递给定的参数：

  Reflect.apply(targetFunction, thisArgument, argumentsList)
      targetFunction：要调用的函数。
      thisArgument：指定函数执行时的上下文（即 this 值）。
      argumentsList：一个类数组对象，包含要传递给函数的参数。
 */
