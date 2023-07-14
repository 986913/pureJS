/**
  Given an unsorted array of integers which might have duplicates, return the top k integers in non-ascending order.
  What is the time & space cost of your code ? Could you do better ?
 */
/* ---------------------------- 用例测试 --------------------------------- */
topK([1, 10, 8, 9, 10, 2, 3, 4, 8, 8, 6], 4); // [10, 10, 9, 8]

/* -------------------------- Solution --------------------------------- */
import { MinHeap } from './PriorityQueue_Heap';

function topK(arr, k) {
  if (arr.length <= 1) return arr;

  // build a min-heap with k length
  let minheap = new MinHeap(k);
  minheap.build(arr);

  return minheap.get().reverse();
}
