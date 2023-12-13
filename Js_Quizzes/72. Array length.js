// This is a JavaScript Quiz from BFE.dev

class MyArray extends Array {
  get length() {
    return 3; // this will not override parent's length
  }
}

const arr1 = new MyArray(10);
console.log(arr1.length); // 10

const arr2 = new Array(10);
console.log(arr2.length); // 10

/**
  The parent's length is an instance property, and it overshadows the child class's length property, 
  which is part of the instance's prototype. Basically, you will not be able to override the parent class's properties.

  I think this behavior might be because variable overriding might break methods inherited from the Parent 
  if we change its type in the Child class.
 */
