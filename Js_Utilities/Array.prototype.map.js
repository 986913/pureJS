/* --------------------- 用例测试 ----------------------- */
[1, 2, 3, 4].myMap((i) => i); // [1, 2, 3, 4]
[1, 2, 3, 4].myMap((i) => i * i); // [1, 4, 9, 16]
[1, 2, , 4].myMap((i) => i * 1); // [1, 4, undefined, 16]

/*
  👉🏻 考点：
  1. 看你知不知道通过this来获取array..
  2. 特殊case(sparse array)考虑:  hasOwn(instance, prop)
*/

/* -------------- Code: -------------------------------- */
/**
 * @callback callbackFn
 * @param {object} [thisArg]
 * @return {Array}
 */

Array.prototype.myMap = function (callbackFn, thisArg) {
  let result = new Array(this.length); // this is [1，2，3，4] array in this case

  for (let i = 0; i < this.length; i++) {
    // Ignore index if value is not defined for index
    if (Object.hasOwn(this, i)) {
      result[i] = callbackFn.apply(thisArg, [this[i], i, this]);
    }
  }

  return result;
};
