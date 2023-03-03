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
    return Reflect.apply(originalFunc, obj, [...boundArgs, ...args]);
  };
};
