/* 
  Selection Sort 🙅‍♀️: 没有bubble sort和insertion sort好使

  Big O:
    best time complexity     O(n2) 🙅‍♀️ 
    average time complexity  O(n2)
    worst time complexity    O(n2)

    space complexity         O(1)

  选择排序是一种简单直观的排序算法，无论什么数据进去都是 O(n²) 的时间复杂度。
  所以用到它的时候，数据规模越小越好。唯一的好处可能就是不占用额外的内存空间了吧

  算法步骤
    1.首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置
    2.再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。
    3.重复第二步，直到所有元素均排序完毕。

  动画：https://sort.hust.cc/2.selectionsort
*/
/* ------------------------ usage test: -------------------------------- */
selectionSort([4, 2, 100, 99, 10000, -1, 99, 2]); //[-1,2,2,4,99,99,100,10000]

/* ---------------------------- Solution ------------------------------- */
const selectionSort = (arr) => {
  /* outer loop control how many round should have (arr.length), i is sorting index */
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;
    /* inner loop control updating minumn values's index */
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    /*swap the sorting index and minValue index after each round finishd. (when they are not equal) */
    if (i !== minIndex) {
      [arr[minIndex], arr[i]] = [arr[i], arr[minIndex]];
    }
  }
  return arr;
};
