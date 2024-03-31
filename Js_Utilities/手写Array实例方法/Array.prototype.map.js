/* --------------------- 用例测试1 ----------------------- */
[1, 2, 3, 4].myMap((i) => i); // [1, 2, 3, 4]
[1, 2, 3, 4].myMap((i) => i * i); // [1, 4, 9, 16]
[1, 2, , 4].myMap((i) => i * i); // [1, 4, undefined, 16]

/* --------------------- 用例测试2 ----------------------- */
const person = {
  name: 'John',
  age: 30,
};
const numbers = [1, 2, 3, 4];

const mappedNumbers = numbers.myMap(function (number, index, array) {
  console.log(this.name); // 输出 'John'
  return number * 2;
}, person);
//console.log(mappedNumbers); // [2,4,6,8]

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
  let len = this.length; // this is [1，2，3，4] array in this case
  let result = new Array(len);

  for (let i = 0; i < this.len; i++) {
    // Ignore index if value is not defined for index, or you can write as:  if (i in this)
    if (Object.hasOwn(this, i)) {
      result[i] = callbackFn.apply(thisArg, [this[i], i, this]);
    }
  }

  return result;
};
