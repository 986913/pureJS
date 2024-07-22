/**
  JS中没有Array.prototype.flattern这个函数，而是有flat函数。
  但是这个题存在的意义相当于实现Array.prototype.flat之前的热身题🟡

  要求Array.prototype.flattern能把数组直接拉平成一维的，不管数组嵌套了多少层
 **/

/* -------------- usage test: -------------------------------- */
flattern([1, [2], [3, [4]]]); // [1, 2, 3, 4]
flattern([5, [6, [7, [8]]], 9]); // [5, 6, 7, 8, 9]

/* -------------- Code:  Solution 1  -------------------------------- */
function flattern(arr) {
  let result = [];

  const helper = (input) => {
    input.forEach((i) => {
      if (!Array.isArray(i)) {
        result.push(i); // when i is not array;
        return;
      } else {
        helper(i); // when i is array
      }
    });
  };

  helper(arr);
  return result;
}

/* -------------- Code:  Solution 2  -------------------------------- */
function flattern(arr) {
  const result = arr.reduce((acc, cur) => {
    return acc.concat(Array.isArray(cur) ? flattern(cur) : cur);
  }, []);
  return result;
}

/*
  👉🏻 考点: 
    1. recursion
    2. 如何判断是数组Array.isArray(）
*/
