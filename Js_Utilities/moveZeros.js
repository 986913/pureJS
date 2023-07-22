/**
  Given an array of integers, move zeros to the end while keeping the order of the rest.
  You should make the **in-place** change.

  What is the time & space complexity of your approach?
 */

/* ---------------用例测试 ----------------- */
moveZeros([1, 0, 0, 2, 3]); // [1,2,3,0,0]
moveZeros([1, 2, 3, 0, 0, 0, 6]); // [1,2,3,6,0,0,0]
moveZeros([0, 0, 0, 1, 0, 0, 2, 0, 0, 3, 0, 0, 0, 6, 0, 0]); // [1,2,3,6,0,0,0,0,0,0,0,0,0,0,0,]

/* -------------------------- Code Solution: -------------------------------- */
/**
 * @param {Array<any>} list
 * @returns {void}
 */
function moveZeros(list) {
  let slow = (fast = 0);
  let len = list.length;

  while (fast < len) {
    //只有当list[fast]不等于0时候，才会swap和slow++
    if (list[fast] !== 0) {
      [list[fast], list[slow]] = [list[slow], list[fast]];
      slow++;
    }

    fast++; // fast是持续++的
  }
}
