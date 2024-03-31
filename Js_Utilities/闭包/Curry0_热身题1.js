/*-------用例测试--------------------*/
sum(1)(); // 1
sum(1)(2)(); // 3
sum(1)(2)(-3)(); // 0

/*-------- Code solution -----------*/
/**
 * @param {number} num
 * @return {Function}
 */
function sum(num) {
  return function (newNum) {
    return newNum === undefined ? num : sum(num + newNum); //这个递归过程会不断地将传入的参数累加起来，直到不再传入参数时返回最终的累加结果。
  };
}
