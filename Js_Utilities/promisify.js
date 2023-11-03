/* 实现 promisify 函数：可以将一个使用回调函数的异步操作 转换 为使用 Promise 的形式 */

/* --------------------- 用例测试1 ----------------------- */
// 原始的使用回调函数的异步操作:
function asyncOperation(input, callback) {
  // 模拟异步操作，1秒后返回结果
  setTimeout(() => {
    if (input) {
      callback(null, 'Success');
    } else {
      callback(new Error('Error occurred'));
    }
  }, 1000);
}
// 使用 promisify 转换异步操作为 Promise 形式
const promisified = promisify(asyncOperation);
// 使用 Promise 的方式处理异步操作结果
promisified(true)
  .then((result) => {
    console.log('Async operation succeeded:', result);
  })
  .catch((error) => {
    console.error('Async operation failed:', error);
  });

/* --------------------- 用例测试2 ----------------------- */
function readFile(filePath, callback) {
  // 模拟异步读取文件操作
  setTimeout(() => {
    if (filePath === 'file.txt') {
      callback(null, 'File content');
    } else {
      callback(new Error('File not found'));
    }
  }, 1000);
}
// 使用 promisify 转换异步操作为 Promise 形式
const promisifie2 = promisify(readFile);
// 使用 Promise 的方式处理异步操作结果
promisified2('file.txt')
  .then((content) => {
    console.log('File content:', content);
  })
  .catch((error) => {
    console.error('Error reading file:', error);
  });
/* ------------- 用例测试3,4,5见 🟡 sequence, parallel and race  --------------- */

/*--------------------------Solution : return an function that take para and wrap promise ------------------------- */
/*
  type func = (error: Error, data: any) => void
*/

function promisify(func) {
  /* 这里的input就是对应上面例子的'file.txt'和true
     return function 就是为了能够传值 --> 传input */
  return function (input) {
    return new Promise((resolve, reject) => {
      func((err, data) => {
        err ? reject(err) : resolve(data);
      }, input);
    });
  };
}

/* 上述的promifify可以简化为下面这种写法：
    const promisify = (fn) => (input) =>
      new Promise((res, rej) => {
        fn((err, output) => (err ? rej(err) : res(output)), input);
      });
*/

/**
  这个函数的作用是将一个使用回调函数的异步操作转换为使用Promise的异步操作。
  它接受一个回调函数作为参数，并返回一个新的函数，该函数接受一个输入参数input,并返回一个Promise。

  在返回的函数内部，它创建了一个新的Promise对象，并在异步操作完成时调用resolve或reject函数来决定Promise的状态。
  原始的回调函数被包装在一个新的回调函数中，并在调用时传入输入参数。
    如果回调函数中出现错误，将调用 reject 函数，并传递错误作为 Promise 的拒绝原因；
    如果没有错误，则调用 resolve 函数，并传递异步操作的结果作为 Promise 的解决值。

  通过这种方式，使用该函数包装的异步操作可以以 Promise 的方式进行处理，使用 then、catch 或 async/await 来处理异步结果，
  使代码更易读、可维护，并且更符合现代 JavaScript 中处理异步操作的常用方式。
 */
