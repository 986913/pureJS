/**
  You are given an unsorted array of numbers, which might have duplicates, find the K-th largest element.

  The naive approach would be sort it first, but it costs O(nlogn), could you find a better approach?
  Maybe you can recall what is happening in Quick Sort or Priority Queue
 */
/* ---------------------------- 用例测试 --------------------------------- */
findKThLargest([1, 2, 3, 4], 1); // 4
findKThLargest([1, 2, 3, 4, 5], 3); // 3
findKThLargest([1, 2, 3, 4, 4, 4, 5], 3); //4
findKThLargest([4, 4, 1, 3, 4, 4, 2, 5], 3); //4
findKThLargest([-1, -2, 100, 1000, 4, 4, 1, 3, 4, 4, 2, 5], 4); //4

/* ----------------------------  Code solution: ---------------------------- */
import { PriorityQueue } from './PriorityQueuev2';

function findKThLargest(arr, k) {
  const pq = new PriorityQueue((a, b) => a - b);
  arr.forEach((item) => pq.add(item));

  while (pq.size() > k) {
    pq.poll();
  }

  return pq.peek();
}
