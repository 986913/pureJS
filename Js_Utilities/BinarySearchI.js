/**
  You are given an unique & ascending array of integers, please search for its index with Binary Search.
  If not found, return -1;

  note: don't use Array.prototype.indexOf(), it is not our goal.
 */

/* --------------------- 用例测试 ----------------------- */
binarySearch([1, 2, 3, 4, 100, 1000, 10000], 4); // 3
binarySearch([1], 1); // 0
binarySearch([100, 1000, 1000], 2); // -1

/* ------------------ Code solution ------------------ */
/**
 * @param {number[]} arr - ascending unique array
 * @param {number} target
 * @return {number}
 */
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1; // 定义target在左闭右闭的区间里，[left, right]

  while (left <= right) {
    // 当left==right，区间[left, right]依然有效，所以用 <=
    let middle = left + Math.floor((right - left) / 2); // 防止溢出 等同于(left + right)/2

    if (arr[middle] < target) {
      left = middle + 1; // target 在右区间，所以[middle + 1, right]
    } else if (arr[middle] > target) {
      right = middle - 1; // target 在左区间，所以[left, middle - 1]
    } else {
      // arr[middle] === target
      return middle; // 数组中找到目标值，直接返回下标
    }
  }

  return -1; // 未找到目标值
}
