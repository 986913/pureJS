/*
  Suppose you have a Queue, which has only follow interface:
    class Queue {
      enqueue(element) { // add element to queue, similar to Array.prototype.push  }
      peek() { // get the head element }
      dequeue() { // remove the head element, similar to Array.prototype.pop  }
      size() { // count of elements  }
    }

  Could you implement a Stack by using only above Stack? A Stack must have following interface:
    class Stack {
      push(element) { // add element to stack  }
      peek() { // get the top element  }
      pop() { // remove the top element }
      size() { // count of elements }
    }
  
  note: you can only use Queue as provided, Array should be avoided for the purpose of practicing.
*/

/* ---------------------- Solution: Leetcode 225🟡原题(minor difference) -------------------------- */
class Stack {
  constructor() {
    this.queue = new Queue();
  }
  // push an element into the stack
  push(element) {
    this.queue.enqueue(element);
  }
  // get the top element
  peek() {
    const ele = this.pop();
    this.queue.enqueue(ele);
    return ele;
  }
  // remove top element from stack
  pop() {
    let size = this.queue.size(); // 这个size是相当于this.queue.length的定格
    // 之所以while(size>1) 是因为要保留queue最后一个元素 将来要成为第一个元素 （要被弹出去）
    while (size > 1) {
      this.queue.enqueue(this.queue.dequeue()); //把queue的最前面元素放到queue最后头
      size--; //基于之前定格的length--
    }
    return this.queue.dequeue(); // 最后再把queue中第一个元素弹出去
  }
  // return count of elements
  size() {
    return this.queue.size();
  }
}
