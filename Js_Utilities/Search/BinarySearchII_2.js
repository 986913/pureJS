/* 
  This is a variation of binary search I
  Your are given a sorted scending array of number, but might have duplicates, 
  you are asked to return last index of a target number.  
  If not found return -1.

  note: Please don't use `Array.prototype.indexOf()`, it is not our goal. 
*/
/* --------------------- 用例测试 ----------------------- */
binarySearch([1, 2, 3, 4, 4, 4, 4, 100, 1000, 10000], 4); // 6
binarySearch([1, 1, 1], 1); // 2
binarySearch([10, 4, 9], 1); // -1

/* ------------------ Code solution ------------------ */
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let middle = left + Math.floor((right - left) / 2);

    if (arr[middle] < target) {
      left = middle + 1;
    } else if (arr[middle] > target) {
      right = middle - 1;
    } else {
      left = middle + 1; //不同点：别返回，要收缩左边界
    }
  }

  /*
    arr中没找到target:
		case 1: right一直往左走，越界了
		case 2: right一直往右走，走到了arr最后一项且还不等于target
  */
  if (right < 0 || arr[right] !== target) {
    return -1;
  }

  return right; //不同点：找到要return right
}
