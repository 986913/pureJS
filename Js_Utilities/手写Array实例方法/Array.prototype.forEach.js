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

Array.prototype.forEach = function (callbackFn, thisArg) {
  for (let i = 0; i < this.length; i++) {
    if (Object.hasOwn(this, i)) {
      callbackFn.apply(thisArg, [this[i], i, this]);
    }
  }
};
