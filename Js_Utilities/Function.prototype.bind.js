/* -------------------------用例测试1-------------------- */
function sayName() {
  return {
    name: this.name,
  };
}
const person = {
  name: 'ming',
};
console.log(sayName.myBind(person)()); // { name: "ming" }

/* -------------------------用例测试2-------------------- */
function sayName(a, b, c) {
  return {
    name: this.name,
    a,
    b,
    c,
  };
}

const person2 = {
  name: 'ming',
};

console.log(sayName.myBind(person2, 'like', 'Favorite')('homer'));
console.log(sayName.myBind(person2, 'like')('Favorite', 'homer'));
console.log(sayName.myBind(person2)('like', 'Favorite', 'homer'));
/*
  above 3 console.log output are same:
  {
    a: "like",
    b: "Favorite",
    c: "homer",
    name: "ming"
  }
*/

/* ------------------ Solution Code ---------------------------------------------------- */
Function.prototype.myBind = function (obj, ...boundArgs) {
  const originalFunction = this; //🟡这个this指向的是调用myBind的sayName函数，不是指向person obj的

  return function (...args) {
    return originalFunction.apply(obj, [...boundArgs, ...args]);
  };
};

/* ------------------ 加强版 Solution Code ------------------------------------------------ */
Function.prototype.myBind = function (obj, ...boundArgs) {
  const originalFunc = this;
  if (typeof originalFunc !== 'function') {
    throw new TypeError('Bind must be called on a function');
  }

  return function (...args) {
    //调用 originalFunc 函数，并将 obj 设置为函数执行时的上下文（即 this 值, 同时将 boundArgs 和 args 数组合并为一个参数数组，作为参数传递给 originalFunc。
    return Reflect.apply(originalFunc, obj, [...boundArgs, ...args]);
  };
};

/**
Reflect.apply()是JS的内置函数，用于调用指定函数并传递给定的参数：

  Reflect.apply(targetFunction, thisArgument, argumentsList)
      targetFunction：要调用的函数。
      thisArgument：指定函数执行时的上下文（即 this 值）。
      argumentsList：一个类数组对象，包含要传递给函数的参数。
 */
