/**
  Array.prototype.flat()特性总结:
    - `Array.prototype.flat()` 用于将嵌套的数组“拉平”，变成一维的数组。该方法返回一个新数组，对原数据没有影响。
    - 不传参数时，默认“拉平”一层，可以传入一个整数，表示想要“拉平”的层数。
    - 传入 `<=0` 的整数将返回原数组，不“拉平”
    - `Infinity` 关键字作为参数时，无论多少层嵌套，都会转为一维数组
    - 如果原数组有空位，`Array.prototype.flat()` 会跳过空位
 **/

/* -------------- usage test: -------------------------------- */
const arr = [1, [2], [3, [4]]];
flat(arr); // [1, 2, 3, [4]]
flat(arr, 1); // [1, 2, 3, [4]]
flat(arr, 2); // [1, 2, 3, 4]
flat([5, [6, [7, [8]]], 9], Infinity); // [5,6,7,8,9]

/*
  👉🏻 考点：
*/

/* -------------- Code:  Solution 1 -------------------------------- */
/**
 * @param { Array } arr
 * @param { number } depth
 * @returns { Array }
 */
function flat(arr, depth = 1) {
  let result = [];

  const helper = (input, depthInput) => {
    /* 关键在这: depthInput <= 0 听着recursion, 且 ...input, spread operator只展开一层 
      比如 const arr = [1,2,3,[4,[5]]]  那么, console.log(...arr) 等于 123[4,[5]]  */
    if (depthInput <= 0) {
      result = [...result, ...input];
      return;
    } else {
      input.forEach((i) => {
        if (!Array.isArray(i)) result.push(i);
        else helper(i, depth - 1);
      });
    }
  };

  helper(arr, depth);
  return result;
}

/* -------------- Code:  Solution 2  -------------------------------- */
function flat(arr, depth = 1) {
  // if depth <= 0, return arr directly
  if (depth <= 0) return arr.slice();

  // if depth > 0:
  const result = arr.reduce((acc, cur) => {
    return acc.concat(Array.isArray(cur) ? flat(cur, depth - 1) : cur);
  }, []);
  return result;
}
