/* -------------- usage test: -------------------------------- */
const numbers = [1, 2, 3, 4, 5];
const index = numbers.myFindIndex((num) => num > 3); // 3
[].myFindIndex((num) => num === 3); // -1

const context = { threshold: 10 };
const arr = [2, 5, 12, 7];
arr.myFindIndex(function (num) {
  return num > this.threshold; // 这里的 this 指向 context，所以 this.threshold 就是 10
}, context); // 2

/*
  👉🏻 考点：
    1. 数组获取：内部通过 `this` 拿到调用它的原数组。
    2. 上下文绑定：`apply/call` 的第 1 个参数传入 `thisArg`，以此改变回调函数内部的 `this` 指向。

  ⚠️ 避坑（连环问）：
    1. 为什么不能 `...thisArg`？普通对象不可迭代，用 `...` 展开会直接报错崩溃。
    2. 箭头函数特例：若用户传入箭头函数，`thisArg` 必定失效（因为箭头函数 `this` 无法被改变），此乃语言特性而非代码 Bug。
*/

/* -------------- Code: -------------------------------- */
/**
 * @callback callbackFn
 * @param {object} [thisArg]
 * @return {Boolean}
 */

Array.prototype.myFindIndex = function (callback, thisArg) {
  //通过this来获取数组
  for (let i = 0; i < this.length; i++) {
    /* call the callback on each array element with the following parameters: element, index, array, and this. */
    if (callback.apply(thisArg, [this[i], i, this])) {
      return i;
    }
  }
  return -1;
};
