/**
  You are given a list of sorted non-descending integer arrays, write a function to merge them into one sorted non-descending array.
**/
/*-------------------- 用例测试 -------------------------*/
merge([
  [1, 1, 1, 100, 1000, 10000],
  [1, 2, 2, 2, 200, 200, 1000],
  [1000000, 10000001],
  [2, 3, 3],
]); // [1,1,1,1,2,2,2,2,3,3,100,200,200,1000,1000,10000,1000000,10000001]

/* ------------------------- Code solution: MergeSort🟡的变形题 ------------------------------- */
// helper function:
function merge2Lists(arr1, arr2) {
  let p1 = 0;
  let p2 = 0;

  let res = [];

  while (p1 < arr1.length && p2 < arr2.length) {
    if (arr1[p1] < arr2[p2]) {
      res.push(arr1[p1]);
      p1++;
    } else {
      res.push(arr2[p2]);
      p2++;
    }
  }

  while (p1 < arr1.length) {
    res.push(arr1[p1]);
    p1++;
  }
  while (p2 < arr2.length) {
    res.push(arr2[p2]);
    p2++;
  }

  return res;
}
/**
 * Main function:
 * @param {number[][]} arrList
 * non-descending integer array
 * @return {number[]}
 */
function merge(arrList) {
  if (arrList.length === 0) return [];
  if (arrList.length === 1) return arrList[0];
  if (arrList.length === 2) return merge2Lists(arrList[0], arrList[1]);

  let mid = Math.floor(arrList.length / 2);
  let left = merge(arrList.slice(0, mid));
  let right = merge(arrList.slice(mid));

  return merge2Lists(left, right);
}
