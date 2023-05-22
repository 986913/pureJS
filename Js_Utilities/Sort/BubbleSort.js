/* 
  Bubble Sort: 数组中有n个数，从第一个数开始，逐个比较相邻的两数，如果前面的大于后面的，交换位置，将比较大的数往后排

  Big O:
    best time complexity     O(n)
    average time complexity  O(n2)
    worst time complexity    O(n2)

    space complexity         O(1)
*/
/* ------------------------ usage test: -------------------------------- */
bubbleSort([4, 2, 100, 99, 10000, -1, 99, 2]); //[-1,2,2,4,99,99,100,10000]

/* -------------------------- Solution 1 : dummy version ------------------------------- */
function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
}
/* -------------------------- Solution 2 : Efficiency version ------------------------------- */
const bubbleSort = (arr) => {
  let done;
  for (let i = 0; i < arr.length - 1; i++) {
    done = true; //先默认true（即先假设内层循环中没有进行任何交换）
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]]; //swap arr[j+1] and arr[j]
        done = false; // 表示arr仍然无序。
      }
    }
    if (done) break;
  }
};
