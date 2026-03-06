/**
Problem Statement 
Implement a function rightRotate(arr,n) that will rotate the given array by n.

Input :An array and a number by which to rotate that array
Output :The given array rotated by n element

rightRotate( [1,2,3,4,5], 2) --->   [4,5,1,2,3]
rightRotate( [300,-1,3,0], 3) -->   [-1,3,0,300]
 */

/*-----------Solution 1:  in place ----------------- */
function rightRotate(arr, n) {
  let len = arr.length;
  if (n === len || len === 0) return arr;
  let rotatetimes = n > len ? n - len : n;

  while (rotatetimes) {
    // arr.unshift(arr.pop())
    const lastElement = arr[len - 1]; // 存储最后一个元素
    // 从倒数第二个元素开始，将每个元素向右移动一个位置
    for (let i = arr.length - 2; i >= 0; i--) {
      arr[i + 1] = arr[i];
    }
    arr[0] = lastElement; // 将最后一个元素放在数组的第一个位置

    rotatetimes--;
  }

  return arr;
}

/*-----------Solution 2:  use splice ----------------- */
function rightRotate(arr, n) {
  return arr.splice(arr.length - n).concat(arr.splice(0, arr.length));
}
