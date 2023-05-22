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
const leftChildIdx = (index) => index * 2 + 1;
const rightChildIdx = (index) => index * 2 + 2;
const getParentIndex = (index) => Math.floor((index - 1) / 2);
class PriorityQueue {
  /**
   * @param {(a: any, b: any) => -1 | 0 | 1} compare -
   * compare function, similar to parameter of Array.prototype.sort
   * Default min heap
   */
  constructor(compare = (a, b) => a - b) {
    this._compare = (a, b) => compare(a, b) > 0; // we just compare if a > b
    this.heap = [];
  }
  /**
   * return {number} amount of items
   */
  size() {
    return this.heap.length;
  }

  /**
   * returns the head element
   */
  peek() {
    // the root is always the highest priority item
    return this.heap[0];
  }

  /**
   * @param {number} i
   * @param {number} j
   */
  _swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  /**
    Insert
        Insert pushes an element on to our heap.
        After we have inserted the element, we correctly position the element in our heap by comparing the values of the newly inserted element with its parent over and over again.
        If the newly inserted elements priority is greater, then the newly inserted element is swapped with its parent. 
        This is recursively called until the element is rightly positioned.
    */
  add(element) {
    // 1. push element to the end of the heap
    this.heap.push(element);
    // 2. compare new-added element and it's parent
    if (this.heap.length > 1) {
      this._bubbleUp(this.heap.length - 1); //因为新加的element在heap数组后头，所以bubbleUp start from the end of array
    }
    console.log(`add ${element}, now items are ${this.heap}`);
  }
  _bubbleUp(index) {
    if (index === 0) return; //当比较到0时候就停止， 因为最顶层的parent index就是0嘛

    const parentIdx = getParentIndex(index);
    // if the element is greater than its parent: swap element with its parent, keep doing until elt is at its right pos
    if (this._compare(this.heap[parentIdx], this.heap[index])) {
      this._swap(parentIdx, index);
      this._bubbleUp(parentIdx);
    }
  }

  /**
   * poll extracts the root from the heap and calls heapify(sinkdown）to reposition the rest of the heap,
   * placing the next highest priority item at the root.
   */
  poll() {
    // 1. remove the first element(root) from the heap
    const root = this.heap.shift();

    // 2. put the last element to the front of the heap
    // and remove the last element from the heap as it now
    // sits at the front of the heap
    this.heap.unshift(this.heap[this.heap.length - 1]);
    this.heap.pop();

    // 3. then compare root with children iteratively (sink down) --- correctly re-position heap
    this._heapify(0); //因为去掉的element是heap第一个element，所以heapify(sink down) start from 0;

    console.log(`remove root ${root}, now items are ${this.heap}`);
    // 4. return the root;
    return root;
  }
  /**
    Heapify re-positions the heap by comparing the left and right child of a specific node and swapping them as necessary.
    This is recursively called until the heap is correctly repositioned.} index 
    */
  _heapify(index) {
    const childIdx = this._getChildIdx(index); // get the child index with which we need to swap
    if (!childIdx) return; // recursion stop here. when no child need to swap

    // if the value of index has changed, then some swapping needs to be done
    // and this method needs to be called again with the swapped element
    if (index !== childIdx) {
      this._swap(index, childIdx);
      this._heapify(childIdx);
    }
  }
  //返回具有最高优先级（左子节点或右子节点）的子节点的index
  // if the left child has higher priority than the node we are looking at
  // Min heap: a-b : index-Left > 0 means index > left and so we have to give priority to left
  // Max heap: b-a: Left-index > 0 means left > index and so we have to give priority to left
  _getChildIdx(index) {
    let left = leftChildIdx(index);
    let right = rightChildIdx(index);

    if (
      left < this.heap.length &&
      this._compare(this.heap[index], this.heap[left])
    ) {
      index = left;
    }

    // if the right child has higher priority than the node we are looking at
    if (
      right < this.heap.length &&
      this._compare(this.heap[index], this.heap[right])
    ) {
      index = right;
    }

    return index;
  }
}

function findKThLargest(arr, k) {
  const pq = new PriorityQueue((a, b) => a - b);
  arr.forEach((item) => pq.add(item));

  while (pq.size() > k) {
    pq.poll();
  }

  return pq.peek();
}
