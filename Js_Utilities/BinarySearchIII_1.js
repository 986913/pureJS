/* 
  This is a variation of binary search I
  Your are given a sorted ascending array of number, but might have duplicates, 
  you are asked to return the element right before first appearance of a target number
  If not found return `undefined`.

  note: Please don't use `Array.prototype.indexOf()`, it is not our goal. 
*/

/* --------------------- 用例测试 ----------------------- */
elementBefore([1, 2, 3, 4, 4, 4, 4, 100, 1000, 10000], 4); // 3
elementBefore([1, 1, 1], 1); // undefined
elementBefore([100, 1000, 1000], 1); // undefined

/* ------------------ Code solution ------------------ */
function elementBefore(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let middle = left + Math.floor((right - left) / 2);

    if (arr[middle] < target) {
      left = middle + 1;
    } else if (arr[middle] > target) {
      right = middle - 1;
    } else {
      right = middle - 1; //不同点：别返回，要收缩右边界
    }
  }

  /*
    arr中没找到target:
		case 1: left一直往右走，越界了
		case 2: left一直往左走，走到了arr的第一项且还不等于target
  */
  if (left >= arr.length || arr[left] !== target) {
    return undefined;
  }

  return arr[left - 1]; //不同点：找到要return arr[left-1]
}
