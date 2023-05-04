/**
  Say you have multiple versions of a program, 
  write a program that will find and return the first bad revision given a isBad(version) function.
  Versions after first bad version are supposed to be all bad versions.

  notes:
    Inputs are all non-negative integers
    if none found, return -1
**/

/* -------------------------用例测试-------------------- */
firstBadVersion((i) => i >= 4)(100); // 4
firstBadVersion((i) => i >= 4)(4); // 4
firstBadVersion((i) => i >= 5)(3); //-1
firstBadVersion((i) => i >= 1)(1); //1
firstBadVersion((i) => i >= 1)(2); // 1

/* ------------------ Solution Code ---------------------------------------------------- */
/*  type IsBad = (version: number) => boolean */
/**
 * @param {IsBad} isBad
 */

function firstBadVersion(isBad) {
  // firstBadVersion receive a check function isBad and should return a closure which accepts a version number(integer)
  return (version) => {
    // write your code to return the first bad version
    let left = 0;
    let right = version;

    while (left <= right) {
      let mid = left + Math.floor((right - left) / 2);
      if (isBad(mid)) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    // if found first bad version then return left, if not found return -1
    return isBad(left) ? left : -1;
  };
}
