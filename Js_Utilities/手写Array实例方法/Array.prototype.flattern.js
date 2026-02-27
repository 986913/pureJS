/**
  JS中没有Array.prototype.flattern这个函数，而是有flat函数。
  但是这个题存在的意义相当于实现Array.prototype.flat之前的热身题🟡

  要求Array.prototype.flattern能把数组直接拉平成一维的，不管数组嵌套了多少层
 **/

/* -------------- usage test: -------------------------------- */
flattern([]); // []
flattern([1, [2], [3, [4]]]); // [1, 2, 3, 4]
flattern([5, [6, [7, [8]]], 9]); // [5, 6, 7, 8, 9]

/* -------------- Code:  Solution1 遍历型 Recursion -------------------------------- */
function flattern(arr) {
  if (arr.length == 0) return [];
  let res = [];

  const dfs = (input) => {
    //base condition: 或者 if(!Array.isArray(input))
    if (typeof input === 'number') {
      res.push(input);
    }

    // pre-order. recursion
    for (let i = 0; i < input.length; i++) {
      dfs(input[i]);
    }
  };

  dfs(arr);
  return res;
}

/* -------------- Code:  Solution2 分治型 Recursion -------------------------------- */
/**
 * 输入输出Contract:
 *   Input  : number | (number | nested array)[]
 *   Output : number[]  (a single-level array of all primitive numbers)

 * Recursive Model (Divide & Conquer):
 *   1. Base Case:
 *        If input is a number → return it as a single-element array.
 *   2. Subproblem 子问题:
 *        For an array input, recursively flatten each element.
 *   3. Combine 如何合并子问题:
 *        Concatenate all flattened child results into a single array.

 * Recurrence Relation:
 *   flatten(x) =
 *      [x]                      if x is a number
 *      concat(flatten(child_i)) if x is an array
 */
const flatten = (arr) => {
  if (typeof arr === 'number') return [arr];

  // pre-order
  let currLevel = [];
  for (let i = 0; i < arr.length; i++) {
    currLevel = [...currLevel, ...flatten(arr[i])]; //子问题是 flatten(arr[i]) ,在这里合并子问题们
  }
  //post-order
  return currLevel;
};

/* -------------- Code:  Solution3 分治型 Recursion + reduce -------------------------------- */
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
