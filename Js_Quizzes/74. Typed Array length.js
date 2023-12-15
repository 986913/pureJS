// This is a JavaScript Quiz from BFE.dev

class MyArray extends Uint8Array {
  get length() {
    return 3;
  }
}

const arr1 = new MyArray(10);
console.log(arr1.length); // 3

const arr2 = new Uint8Array(10);
console.log(arr2.length); // 10

/**
  This is quite similar to this previous problem(#72.Array length) 
  but the difference being we are extending from Uint8Array typed array that uses ArrayBuffer
  and in this case Subclass constructors may over-ride it to change the constructor assignment
 */
