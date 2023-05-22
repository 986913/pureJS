/*
  Quick sort:

    原理:
    Quick sort is an efficient, in-place, recursive sorting algorithm that selects a "pivot" element and partitions all other elements into 2 subarrays:
      Elements that are smaller than the pivot are added in 1 subarray that is placed before the pivot.
      Elements that are larger than the pivot are added in 1 subarray that is placed after the pivot.
    The quick sort is then recursively applied to each subarray. and once the subarrays are sorted they are then merged back with the pivot element between them as per above.

    Big O：
      best time complexity     O(n log n)
      average time complexity  O(n log n)
      worst time complexity    O(n²)
      space complexity         O(log n)

  quick sort思路: https://www.youtube.com/watch?v=5nXrEBhBFpU&ab_channel=%E6%84%9B%E8%93%81AiZhen
  youtube:        https://www.youtube.com/watch?v=P6XGSKO2RzI&ab_channel=JustinKim
 */
/* ---------------------------------------- 用例测试 ------------------------------------------------------------ */
var sortedArray = quickSort([100, -3, 2, 300, 4, 6, 9, 1, 2, 5, 3, 23, 200]);
console.log(sortedArray);

/* ---------------------------------------- Implemention ------------------------------------------------------ */
function quickSort(arr) {
  if (arr.length <= 1) return arr; // recursion end here

  const copiedArr = arr.slice(0, arr.length - 1); //make an copy of arr
  const pivot = arr[arr.length - 1]; // use last element as pivot
  const leftArr = []; // to save all elements < pivot
  const rightArr = []; // to save all elements > pivot

  // loop through copiedArr to update leftArr or rightArr
  for (const ele of copiedArr) {
    ele < pivot ? leftArr.push(ele) : rightArr.push(ele);
  }

  return [...quickSort(leftArr), pivot, ...quickSort(rightArr)]; // recursion here
}
