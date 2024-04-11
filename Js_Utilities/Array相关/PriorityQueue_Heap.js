class Heap {
  constructor(size, type) {
    this.data = new Array(size); // SC: O(k)
    this.type = type;
  }

  size() {
    return this.data.length;
  }

  build(arr) {
    // O(nlogk)
    let i = 0;
    for (i = 0; i < this.size(); ++i) {
      this.data[i] = arr[i]; // O(k)
    }
    for (let j = Math.floor((this.size() - 2) / 2); j >= 0; --j) {
      // O(klogk)
      this._heapify(j);
    }
    while (i < arr.length) {
      // O((n - k) * logk)
      // if heap top is less than next entry, replace the heap top
      if (this.compare(this.data[0], arr[i])) {
        this.data[0] = arr[i];
        this._heapify(0);
      }
      ++i;
    }
  }

  _heapify(idx) {
    // O(logk)
    const leftIndex = 2 * idx + 1;
    const rightIndex = 2 * idx + 2;
    let p = idx;

    if (
      leftIndex < this.size() &&
      this.compare(this.data[leftIndex], this.data[p])
    ) {
      p = leftIndex;
    }
    if (
      rightIndex < this.size() &&
      this.compare(this.data[rightIndex], this.data[p])
    ) {
      p = rightIndex;
    }
    if (p !== idx) {
      // swap
      [this.data[p], this.data[idx]] = [this.data[idx], this.data[p]];
      this._heapify(p);
    }
  }

  compare(a, b) {
    // O(1)
    switch (this.type) {
      case 'MIN': // MinHeap
        if (typeof a !== 'object' && typeof b !== 'object') {
          // a,b are number, string etc..
          return a < b;
        } else {
          // a and b structor is {key: '' , priority: 1}
          // if freq of a < freq of b OR if freq is same but a is lexicographically greater than b then a should be the parent node
          return (
            a.priority < b.priority ||
            (a.priority === b.priority && a.key > b.key)
          );
        }
      case 'MAX': //MaxHeap
        if (typeof a !== 'object' && typeof b !== 'object') {
          return a > b;
        } else {
          return (
            // if freq of a > freq of b OR if freq is same but a is lexicographically smaller than b then a should be the parent node
            a.priority > b.priority ||
            (a.priority === b.priority && a.key < b.key)
          );
        }
      default:
        return '';
    }
  }

  get() {
    // until the heap is empty, create the resultant array by removing elements from the top
    const result = [];
    while (this.size()) {
      const top = this.data[0];
      [this.data[0], this.data[this.size() - 1]] = [
        this.data[this.size() - 1],
        this.data[0],
      ];
      this.data.pop();
      this._heapify(0);
      result.push(top);
    }
    return result;
  }

  insert(item) {
    this.data.push(item);
    this.build(this.data);
  }

  removeRoot() {
    let root = this.data[0];
    let last = this.data.pop();

    if (this.data.length > 0) {
      this.data[0] = last;
      this.build(this.data);
    }
    return root;
  }

  peek() {
    return this.data[0];
  }
}

export class MinHeap extends Heap {
  constructor(size) {
    super(size, 'MIN');
  }
}
export class MaxHeap extends Heap {
  constructor(size) {
    super(size, 'MAX');
  }
}

/*
  测试使用MinHeap/MaxHeap:
  top k issues: https://dev.to/986913/top-k-elements-js-13e0

  https://leetcode.com/problems/top-k-frequent-elements/
  https://leetcode.com/problems/top-k-frequent-words/
  https://leetcode.com/problems/kth-largest-element-in-an-array/
*/
const arr = [34, 1, -3, 100, 0, -4, 200];
const heap2 = new MinHeap(7);

heap2.build(arr);
heap2.insert(-199);
console.log(heap2.removeRoot());
console.log(heap2.removeRoot());
