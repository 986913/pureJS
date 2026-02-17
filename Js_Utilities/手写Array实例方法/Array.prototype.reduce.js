/* --------------------- 用例测试 ----------------------- */
[1, 2, 3].myReduce((acc, curr) => acc + curr); // 6
[1, 2, 3].myReduce((acc, curr) => acc + curr, 0); // 6
[1, 2, 3].myReduce((acc, curr) => acc + curr, 4); // 10

/*
  👉🏻 考点：
  1. 通过this来获取数组
  2. 没有initialValue时，acc是arr[0]元素， cur是arr[1]元素,   startIndex是1
      有initialValue时，acc是initialValue，cur是arr[0]元素， startIndex是0
  3. throw error when array is empty and no initial value.
*/

/* --------------------- Code --------------------------------- */
/**
 * @callback callbackFn
 * @param {*} [initialValue]
 * @return {Array}
 */
Array.prototype.myReduce = function (callback, initialValue) {
  if (this.length === 0 && !initialValue) {
    throw new TypeError('Reduce of empty array with no initial value');
  }
  if (this.length === 0 && initialValue) {
    return initialValue;
  }

  let res;
  let startIdx;

  if (initialValue) {
    res = initialValue;
    startIdx = 0;
  } else {
    res = this[0];
    startIdx = 1;
  }

  for (let i = startIdx; i < this.length; i++) {
    if (Object.hasOwn(this, i)) {
      res = callback(res, this[i], i, this); //  acc, element, index, self-Array
    }
  }

  return res;
};
