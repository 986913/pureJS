/*
  merge Sort:

  merge Sort 是利用merge的思想实现的排序方法
  原理： 假设初始序列有n个记录，就可以看成是n个有序的子序列，每个子序列的长度为1，然后两两merge,
        得到n/2个长度为2或1的有序子序列，再两两merge, 如此重复， 直到得到一个长度为n的有序序列为止
        这种方法被称为 2路merge sort

  Big O：
    best time complexity     O(n log n)
    average time complexity  O(n log n)
    worst time complexity    O(n log n)
    space complexity         O(n)
*/

/* ---------------------------------------- Solution: (Not in-place) ------------------------------------------------------ */
// Main function:
function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  let mid = Math.floor(arr.length / 2);
  let left = mergeSort(arr.slice(0, mid));
  let right = mergeSort(arr.slice(mid));

  return merge(left, right); // helper function
}
// helper function: merges two sorted arrays (use 2 pointer)
function merge(arr1, arr2) {
  let results = [];
  let i = 0;
  let j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr2[j] > arr1[i]) {
      results.push(arr1[i]);
      i++;
    } else {
      results.push(arr2[j]);
      j++;
    }
  }
  while (i < arr1.length) {
    results.push(arr1[i]);
    i++;
  }
  while (j < arr2.length) {
    results.push(arr2[j]);
    j++;
  }
  return results;
}

/* ---------------------------------------- Solution: (In-place) ------------------------------------------------------ */

/*********************  变形题🟡 -> https://bigfrontend.dev/problem/merge-sorted-arrays ******************/
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
function merge(arrList) {
  if (arrList.length === 0) return [];
  if (arrList.length === 1) return arrList[0];
  if (arrList.length === 2) return merge2Lists(arrList[0], arrList[1]);

  let mid = Math.floor(arrList.length / 2);
  let left = merge(arrList.slice(0, mid));
  let right = merge(arrList.slice(mid));

  return merge2Lists(left, right);
}
