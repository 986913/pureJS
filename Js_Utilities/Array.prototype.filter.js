/* -------------- usage test: -------------------------------- */
[1, 2, 3, 4].myFilter((value) => value % 2 == 0); // [2, 4]
[1, 2, 3, 4].myFilter((value) => value < 3); // [1, 2]

/*
  👉🏻 考点：
    1. 用通过this来获取数组，个人理解因为是[1, 2, 3, 4] calling myFilter
    2. apply第1个参数用来改变this指向，后面你自由传参，但是用[]包起来
*/

/* -------------- Code: -------------------------------- */
/**
 * @callback callbackFn
 * @param {object} [thisArg]
 * @return {Array}
 */
Array.prototype.myFilter = function (callbackFn, thisArg) {
  let result = [];

  //通过this来获取数组
  for (let i = 0; i < this.length; i++) {
    /* call the callback on each array element with the following parameters: element, index, array, and this. */
    if (callbackFn.apply(thisArg, [this[i], i, this])) {
      result.push(this[i]);
    }
  }

  return result;
};
