/* --------------------- 用例测试 ----------------------- */
[1, 2, 3].myReduce((acc, curr) => acc + curr); // 6
[1, 2, 3].myReduce((acc, curr) => acc + curr, 0); // 6
[1, 2, 3].myReduce((acc, curr) => acc + curr, 4); // 10

/*
  👉🏻 考点：
  1. 通过this来获取数组
  2. 没有initialValue时，acc是arr[0]元素， acc是arr[1]元素,   startIndex是1
      有initialValue时，acc是initialValue，acc是arr[0]元素， startIndex是0
  3. throw error when array is empty and no initial value.
*/

/* --------------------- Code --------------------------------- */
/**
 * @callback callbackFn
 * @param {*} [initialValue]
 * @return {Array}
 */

Array.prototype.myReduce = function (callbackFn, initialValue) {
  const len = this.length;
  const argsLength = arguments.length;

  //下面的argsLength===1 就是代表 没有initialValue
  if (argsLength === 1 && len === 0) {
    throw new TypeError('Reduce of empty array with no initial value');
  }

  let acc = argsLength === 1 ? this[0] : initialValue;
  let startIndex = argsLength === 1 ? 1 : 0;

  for (let i = startIndex; i < this.length; i++) {
    if (Object.hasOwn(this, i)) {
      acc = callbackFn(acc, this[i], i, this); // acc, element, index, self-Array
    }
  }

  return acc;
};
