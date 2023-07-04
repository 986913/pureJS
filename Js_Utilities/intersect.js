/**
  Given 2 sorted array of integers, find the elements that exist in both arrays.
    1. The arrays might have duplicate numbers.
    2. The order of returning result doesn't matter.
    3. What is the time & space cost of your approach? Could you improve it?
 */

/* -------------------用例测试--------------------*/
intersect([1, 2, 2, 3, 4, 4], [2, 2, 4, 5, 5, 6, 2000]); // [2,2,4]

/* -------------------------- Code Solution: 2 pointers ------------------------------- */
/**
 * @param {number[]} arr1 - integers
 * @param {number[]} arr2 - integers
 * @returns {number[]}
 */
function intersect(arr1, arr2) {
  let result = [];
  let p1 = 0;
  let p2 = 0;

  while (p1 < arr1.length && p2 < arr2.length) {
    if (arr1[p1] < arr2[p2]) {
      p1++;
    } else if (arr1[p1] > arr2[p2]) {
      p2++;
    } else {
      result.push(arr1[p1]);
      p1++;
      p2++;
    }
  }

  return result;
}
