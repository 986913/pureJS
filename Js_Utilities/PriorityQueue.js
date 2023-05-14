/**
  [Priority Queue](https://storm.cis.fordham.edu/~yli/documents/CISC2200Spring15/Graph.pdf) is a commonly used data structure in algorithm problem. 
  Especially useful for **Top K** problem with a huge amount of input data, since it could avoid sorting the whole but keep a fixed-length sorted portion of it.

  Since there is no built-in Priority Queue in JavaScript, in a real interview, you should tell interview saying that "Suppose we already have a Priority Queue Class I can use", there is no time for you to write a Priority Queue from scratch.
  But it is a good coding problem to practice, so please implement a Priority Queue with following interface:
    class PriorityQueue {
      // compare is a function defines the priority, which is the order
      // the elements closer to first element is sooner to be removed.
      constructor(compare) {
      
      }
      
      // add a new element to the queue
      // you need to put it in the right order
      add(element) {

      }

      // remove the head element and return
      poll() {
      
      }

      // get the head element
      peek() {

      }

      // get the amount of items in the queue
      size() {

      }
    }
  
  Heaps are a tree-based data structure, usually implemented as an array, which represent a priority queue
 */

/*---------------------------- 用例测试1 (Top-k issue) ---------------------------------*/
const pq = new PriorityQueue((a, b) => a - b); // min heap usage
/*
  (a, b) => a - b means
  returns        1    if    a    has    higher    priority,
  returns        0    if    both    have    the    same    priority
  returns        -1    if    b    has    higher    priority.
  
  smaller numbers are closer to index:0
  which means smaller number are to be removed sooner
 */
pq.add(5);
pq.add(3);
pq.add(1);
pq.add(4);
pq.add(2);
pq.poll(); //1
pq.poll(); //2
pq.poll(); //3
pq.poll(); //4
pq.poll(); //5

/*---------------------------- 用例测试2 (Top-k issue) ---------------------------------*/
const pq2 = new PriorityQueue((a, b) => b - a); // max heap usage
pq2.add(1);
pq2.peek(); // 1
pq2.size(); // 1

pq2.add(3);
pq2.peek(); // 3
pq2.size(); // 2

pq2.add(4);
pq2.peek(); // 4
pq2.size(); // 3

pq2.poll(); //4
pq2.peek(); // 3
pq2.size(); // 2

pq2.poll(); //3
pq2.poll(); //1
pq2.size(); // 0
pq2.poll(); // undefined
/*---------------------------- 用例测试3 ---------------------------------*/
// customize usage
const pq3 = new PriorityQueue((a, b) => {
  if (a % 2 === 1 && b % 2 === 1) {
    return b;
  } else if (a % 2 === 1) {
    return -1;
  } else if (b % 2 === 1) {
    return 1;
  } else {
    return b - a;
  }
});
pq3.add(0);
pq3.add(1);
pq3.add(2);
pq3.add(3);
pq3.add(4);
pq3.add(5);
pq3.add(6);

pq3.poll(); // 5
pq3.poll(); // 3
pq3.poll(); // 1
pq3.poll(); // 6
pq3.poll(); // 4
pq3.poll(); // 2
pq3.poll(); // 0

/***************************************************************************************************************/
/**********************************************  Code solution: ************************************************/

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
