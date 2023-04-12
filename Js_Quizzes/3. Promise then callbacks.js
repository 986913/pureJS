// This is a JavaScript Quiz from BFE.dev
// What does the code snippet to the right output by console.log?

Promise.resolve(1)
  .then(() => 2)
  .then(3)
  .then((value) => value * 3)
  .then(Promise.resolve(4))
  .then(console.log);

/**
 * 6
 */

//https://bigfrontend.dev/quiz/3-promise-then-callbacks/watch
/**
Promise.resolve(1) // initial resolve value is 1
  .then(() => 2) // return 2
  .then(3) // skipped, param is NOT a function
  .then((value) => value * 3) // last value of this promise is 2, return 2*3
  .then(Promise.resolve(4)) // skipped, param NOT a function
  .then(console.log) // console.log(current_value) => 6: last value of this Promise
  // finally this Promise object is "Fulfilled & resolved" with value "undefined"
  // because last `then()` didn't return any thing, only execute "console.log"
 */

/**
When we handle a settled promise using then it expects two optional callbacks viz. resolved and rejected handlers.
If the handler is not a function, it is internally replaced with an "Identity" function 
i.e. it just returns the received argument.
 */
