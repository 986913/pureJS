/*
  Suppose you have a stack, which has only follow interface:
    class Stack {
      push(element) { // add element to stack  }
      peek() { // get the top element  }
      pop() { // remove the top element }
      size() { // count of elements }
    }

  Could you implement a Queue by using only above Stack? A Queue must have following interface:
    class Queue {
      enqueue(element) { // add element to queue, similar to Array.prototype.push  }
      peek() { // get the head element }
      dequeue() { // remove the head element, similar to Array.prototype.pop  }
      size() { // count of elements  }
    }
  
  note: you can only use Stack as provided, Array should be avoided for the purpose of practicing.
*/

/* ---------------------- Solution: Leetcode 232🟡原题(minor difference) -------------------------- */
class Queue {
  constructor() {
    this.stackIn = new Stack();
    this.stackOut = new Stack();
  }
  // add new element to the rare
  enqueue(element) {
    this.stackIn.push(element);
  }
  // return count of element
  size() {
    return this.stackIn.size() + this.stackOut.size();
  }
  // remove the head element
  dequeue() {
    if (this.stackOut.size()) {
      return this.stackOut.pop();
    }

    while (this.stackIn.size()) {
      this.stackOut.push(this.stackIn.pop());
    }
    return this.stackOut.pop();
  }
  // get the head element
  peek() {
    let ele = this.dequeue();
    this.stackOut.push(ele);
    return ele;
  }
}
