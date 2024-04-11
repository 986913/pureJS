/**
  Implement a function findBin(n), 
  which will generate binary numbers from  1 to n in the form of a string using a queue. 
 */

/* --------------------- 用例测试 ----------------------- */
findBin(3); // ["1","10","11"]
findBin(5); // ["1","10","11","100","101"]

/* -------------------------- Solution --------------------------- */
function findBin(n) {
  let result = [];

  let myQueue = new Queue();
  myQueue.enqueue('1');
  let s1, s2;
  for (let i = 0; i < n; i++) {
    result.push(myQueue.dequeue());
    s1 = result[i] + '0';
    s2 = result[i] + '1';
    myQueue.enqueue(s1);
    myQueue.enqueue(s2);
  }

  return result;
}

class Queue {
  constructor() {
    this.items = new DoublyLinkedList();
  }
  isEmpty() {
    return this.items.length == 0;
  }
  getFront() {
    if (!this.isEmpty()) {
      return this.items.getHead();
    } else return null;
  }
  size() {
    return this.items.length;
  }
  enqueue(element) {
    return this.items.insertTail(element);
  }
  dequeue() {
    return this.items.removeHead();
  }
}
