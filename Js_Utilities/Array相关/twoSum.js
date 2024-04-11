/**
  Given an array of integers, find two number that sums up to 0, return their indices.
  There might be multiple pairs, any of them would do. If not found, return `null`
 */
/*-----------------用例测试--------------------*/
findTwo([1, 2, 3, -1]); // [0,3]
findTwo([1, 2, 3, -1, -2, 0]); // [0,3] or [1,4] or [5, 5]
findTwo([1, 2, 3, 4]); // null

/* ------------------- Soltion: hash map -------------------------------- */
/**
 * @param {number[]} arr
 * @return {number[]}
 */
function findTwo(arr) {
  let map = new Map();
  // DO NOT use arr.forEach here.  because return doesn't work within a forEach loop to return a value
  arr.forEach((n, index) => {
    if (map.has(-n)) return [index, map.get(-n)];
    map.set(n, index);
  });
  return null;
}
