/**
  Given an array of integers, all integers appear twice except one integer, could you quickly target it ?
  What is time & space cost of your approach ? Could you do better ?
 */

/*------------- 用例测试 ---------------*/
findSingle([10, 2, 2, 1, 0, 0, 10]); // 1
findSingle([2, 2, 1]); // 1
findSingle([1, 1, -2]); // -2
findSingle([
  [67, 65, 64, 63, 62, 61, 60, -60, 59, 67, 65, 64, 63, 62, 61, 60, -60],
]); // 59

/* -------------------------- Code Solution 1: Map -------------------------------- */
/**
 * @param {number[]} arr
 * @returns number
 */
function findSingle(arr) {
  let map = new Map();
  arr.forEach((n) => map.set(n, map.get(n) + 1 || 1));

  for (let [key, value] of map) {
    if (value === 1) return key;
  }
}

/* -------------------------- Code Solution 2: XOR -------------------------------- */
/**
 * @param {number[]} arr
 * @returns number
 */

function findSingle(arr) {
  let res = 0;
  arr.forEach((num) => (res ^= num));
  return res;
}
/**
  The basic idea :
    0 ^ 0 = 0;
    1 ^ 1 = 0;
    1 ^ 0 = 1;
    0 ^ 1 = 1;
  so only the single element will go through our 'bit sieve'
 */
