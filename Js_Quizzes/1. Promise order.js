// This is a JavaScript Quiz from BFE.dev
// What does the code snippet to the right output by console.log?

console.log(1);
const promise = new Promise((resolve) => {
  console.log(2);
  resolve();
  console.log(3);
});

console.log(4);

promise
  .then(() => {
    console.log(5);
  })
  .then(() => {
    console.log(6);
  });

console.log(7);

setTimeout(() => {
  console.log(8);
}, 10);

setTimeout(() => {
  console.log(9);
}, 0);

/**
  1
  2
  3
  4
  7
  5
  6
  9
  8
 */

//https://bigfrontend.dev/quiz/1-promise-order/watch
/**

Key points to remember are:
  - The Promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value. Basically, it's a non blocking block of code that executes when the call stack is empty
  - The executor is called synchronously by the Promise constructor before even the Promise constructor returns the created object
  - Promises create Microtask which has priority over the Macrotask created by setTimeout.

In this example:
  1 gets printed, 
  then 2 and 3 are printed as they get called synchronously even though written inside a promise. 
  4 is printed in a synchronous manner as well.
  5 and 6 get queued in the Microtask queue
  7 gets printed synchronously
  8 and 9 get queued to macro task queue (9 gets queued before 8 as its duration is less)
  Once the call stack is empty, Microtask Queue contains 5,6 which have higher priority Macrotask Queue contains 9,8
  5, 6 is then printed. Once the Microtask queue is empty then 9 and 8 gets printed

*/
