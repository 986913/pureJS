/**
  You have to implement the minStack class, which will have a min() function. 
  Whenever min() is called, the minimum value of the stack is returned in O(1) time. 
  The element is not popped from the stack; its value is simply returned.
 */

/* --------------------- 用例测试 ----------------------- */
var stack = new minStack();
stack.push(5);
stack.push(2);
stack.push(4);
stack.push(1);
stack.push(3);
stack.push(9);
stack.min(); // 1
stack.pop();
stack.pop();
stack.pop();
stack.min(); // 2

/* -------------------------- Solution --------------------------- */
class minStack {
  constructor() {
    this.mainStack = new Stack(); // to hold original values
    this.minStack = new Stack(); //minStack to hold minimum values, Top of minStack always be the minimum value from mainStack
  }

  pop() {
    this.minStack.pop(); //  Pop element from minStack to make it sync with mainStack,
    return this.mainStack.pop();
  }

  push(value) {
    this.mainStack.push(value);

    //If the pushed value is greater than the value of top, then push top in minStack
    //else push the value in minStack  (ie: always put the small one)
    if (value > this.minStack.getTop() && !this.minStack.isEmpty())
      this.minStack.push(this.minStack.getTop());
    else this.minStack.push(value);
  }

  //Returns the minimum value from newStack in O(1) Time
  min() {
    return this.minStack.getTop();
  }
}

// helper class:
class Stack {
  constructor() {
    this.items = [];
    this.top = null;
  }
  getTop() {
    if (this.items.length == 0) return null;
    return this.top;
  }
  isEmpty() {
    return this.items.length == 0;
  }
  size() {
    return this.items.length;
  }
  push(element) {
    this.items.push(element);
    this.top = element;
  }
  pop() {
    if (this.items.length != 0) {
      if (this.items.length == 1) {
        this.top = null;
        return this.items.pop();
      } else {
        this.top = this.items[this.items.length - 2];
        return this.items.pop();
      }
    } else return null;
  }
}
