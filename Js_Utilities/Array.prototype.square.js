/* --------------------- 用例测试 ----------------------- */
[-2].mySqaure(); // [4]
[1, 2, 3, 4].mySqaure(); // [1, 4, 9, 16]

/* 👉🏻 考点: 通过this来获取数组 */
/* --------------------- Code --------------------------------- */
/**
 * @return {Array<number>}
 */
Array.prototype.mySqaure = function () {
  let result = new Array(this.length);

  for (let i = 0; i < this.length; i++) {
    result[i] = this[i] * this[i];
  }

  return result;
};
