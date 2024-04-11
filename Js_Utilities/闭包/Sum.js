/*-------用例测试--------------------*/
sum(1)(); // 1
sum(1)(2)(); // 3
sum(1)(2)(-3)(); // 0

/*-------- Code solution -----------*/
/**
 * @param {number} number
 * @return {Function}
 */

function sum(number) {
  return function (num) {
    return num === undefined ? number : sum(number + num);
  };
}
