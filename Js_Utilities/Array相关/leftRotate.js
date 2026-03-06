/**
  Problem Statement:
  A  operation on a circular array shifts each of the array's elements  unit to the left. 
  The elements that fall off the left end reappear at the right end. Given an integer , 
  rotate the array that many steps to the left and return the result.

  Example1: d = 2,  and the arr = [1,2,3,4,5], function should return [3,4,5,1,2]
    After 1 rotation,   arr = [2,3,4,5,1]
    After 2 rotations,  arr = [3,4,5,1,2]
  
  Example2: d = 14, and the arr = [1,2,3,4,5], function should return [5,1,2,3,4]
    After 1 rotation,   arr = [2,3,4,5,1]
    After 2 rotations,  arr = [3,4,5,1,2]
    ...
    After 14 rotations, arr = [5,1,2,3,4]
**/

/*********************************** Solution 1: Brute Force ***********************************/
// time : O(d*n), d is number of rotations, n is array length
// space: O(1)
function rotateLeft(d, arr) {
  let len = arr.length;
  let times = d % arr.length;

  while (times > 0) {
    // arr.push(arr.shift())
    let first = arr[0];
    for (let i = 0; i < len; i++) {
      arr[i] = arr[i + 1];
    }
    arr[len - 1] = first;
    times--;
  }

  return arr;
}

/*********************************** Solution 2: 三次反转法 ***********************************/
// time : O(n), n is array length
// space: O(1)
function rotateLeft(d, arr) {
  let len = arr.length;
  let times = d % len;

  reverse(arr, 0, times - 1); // reverse [0, times-1]
  reverse(arr, times, len - 1); // reverse [times, len-1]
  reverse(arr, 0, len - 1); // reverse whole array

  return arr;
}

// helper function - reverse [start, end] inside arr
const reverse = (arr, start, end) => {
  let left = start;
  let right = end;
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
};
