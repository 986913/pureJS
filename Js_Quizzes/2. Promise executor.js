// This is a JavaScript Quiz from BFE.dev
// What does the code snippet to the right output by console.log?

new Promise((resolve, reject) => {
  resolve(1);
  resolve(2);
  reject('error');
}).then(
  (value) => {
    console.log(value);
  },
  (error) => {
    console.log('error');
  }
);

/**
  1
 */

// When a promise gets settled (resolved or rejected) additional calls to resolve() or reject() will not have any effect.
// promise状态一旦改变就不能再改变了
