/* 
  Insertion sort：
  插入排序的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。
  
  Big O：
    best time complexity     O(n)
    average time complexity  O(n²)
    worst time complexity    O(n²)
    space complexity         O(1)

  算法步骤 in general:
    将第一待排序序列第一个元素看做一个有序序列，把第二个元素到最后一个元素当成是未排序序列。
    从头到尾依次扫描未排序序列，将扫描到的每个元素插入有序序列的适当位置。（如果待插入的元素与有序序列中的某个元素相等，则将待插入元素插入到相等元素的后面。）

  算法步骤 in details:
    1.把 n 个待排序的元素看成为一个有序表和一个无序表，开始时有序表中只包含一个元素，无序表中包含有n-1个元素
    2.开始寻找插入点： 
      排序过程中每次从无序表中取出第一个元素arr[i]存下来命为currValue，然后对currValue和currValue之前所有的元素进行比对：
      因为这是一个持续的过程所以要用while, 如果之前任意的元素比currValue大，那么前面大的元素要shift to arr[i]坑的位置，然后把坑往前移动，
      重复以上动作直到之前的元素小于currValue退出while.
    3.插入点找到后，就把之前存的currValue插入进去 使之成为新的有序表

    https://www.youtube.com/watch?v=i-SKeOcBwko&ab_channel=mycodeschool
*/
/* ------------------------ usage test: -------------------------------- */
insertionSort([4, 2, 100, 99, 10000, -1, 99, 2]); //[-1,2,2,4,99,99,100,10000]

/* ---------------------------- Solution ------------------------------- */
const insertionSort = (arr) => {
  /* 1. 外层for loop控制轮数，范围1到n */
  for (let i = 1; i < arr.length; i++) {
    let currValue = arr[i]; // save the value that need to be inserted to somewhere

    /* 2. find the insert index: while控制shifting */
    while (arr[i - 1] > currValue) {
      arr[i] = arr[i - 1]; // use arr[i - 1] to fill up hole, when arr[i - 1] > currValue
      i--; // continue to move hole to the left
    }

    /* 3. found the insert index is i --> fill up hole with currentValue(每轮结束会insert value) */
    arr[i] = currValue;
  }

  return arr;
};
