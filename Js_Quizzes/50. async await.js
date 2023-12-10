// This is a JavaScript Quiz from BFE.dev

async function async1() {
  console.log(1);
  await async2();
  console.log(2);
}

async function async2() {
  console.log(3);
}

console.log(4);

setTimeout(function () {
  console.log(5);
}, 0);

async1();

new Promise(function (resolve) {
  console.log(6);
  resolve();
}).then(function () {
  console.log(7);
});

console.log(8);

/**
  4
  1
  3
  6
  8
  2
  7
  5
 */

/**
  An async function is a function declared with the async keyword, and the await keyword is permitted within it. 
  The async and await keywords enable asynchronous, promise-based behavior.

  Key points to remember are-
    All synchronous code gets executed first
    The Promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value. Basically, it's a nonblocking block of code that executes when the call stack is empty
    The executor is called synchronously by the Promise constructor before even the Promise constructor returns the created object
    Promises create Microtask (.then) which has priority over the Macrotask created by setTimeout.
    If the value of the expression following the await operator is not a Promise, it's converted to a resolved Promise i.e. await will also trigger an item into microtask queue

  So all code execution can be explained in these steps-
    4 gets printed as its synchronous statement
    5 is a setTimeout get pushed to the Macrotask queue
    async1 gets called and 1 gets printed, then async2 is invoked and 3 gets printed. 2 gets queued to Microtask queue (✅await下一行的console.log(2)进入Microtask这是重点✅)
    6 gets printed as it's synchronous inside executer function of the promise while 7 gets queued to Microtask queue
    8 gets printed being synchronous
    Now since, the call stack is empty. Microtask queue is checked first and 2 and 7 gets printed
    Lastly, queued setTimeout get executed i.e. 5 will get printed
    Note that, this order may vary in browsers because of underlying implementations. For example, the same code in Safari prints 4,1,3,6,8,7,2,5
 */
