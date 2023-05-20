/* 
  This is a variation of binary search I
  Your are given a sorted ascending array of number, but might have duplicates, 
  you are asked to return the element right after last appearance of a target number
  If not found return `undefined`.

  note: Please don't use `Array.prototype.indexOf()`, it is not our goal. 
*/

/* --------------------- 用例测试 ----------------------- */
binarySearch([1, 2, 3, 4, 4, 4, 4, 100, 1000, 10000], 4); // 100
binarySearch([1, 1, 1], 1); // undefined
binarySearch([100, 1000, 1000], 1); // undefined

/* ------------------ Code solution ------------------ */
