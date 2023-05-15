/**
  This problem is related to [Sequence](https://www.notion.so/Sequence-7cd7b2fbfa6a447d867a4cc227120c2c). 
  You are asked to implement an async function helper, `parallel()` which works like `Promise.all()`. 
  Different from `sequence()`, the async function doesn't wait for each other, rather they are all triggered together.
  
  All async functions have following interface:
    type Callback = (error: Error, data: any) => void

    type AsyncFunc = (
      callback: Callback,
      data: any
    ) => void

  Your `parallel()` should **accept AsyncFunc array**, and return a new function which triggers its own callback when all async functions are done or an error occurs.

  Suppose we have an 3 async functions
    const async1 = (callback) => {
      setTimeout(() => callback(undefined, 1), 300)
    }
    const async2 = (callback) => {
      setTimeout(() => callback(undefined, 2), 100)
    }
    const async3 = (callback) => {
      setTimeout(() => callback(undefined, 3), 200)
    }

  Your `parallel()` should be able to accomplish this:
    const all = parallel(
      [
        async1,
        async2,
        async3
      ]
    )   
    all((error, data) => {
      console.log(data) // [1, 2, 3]
    }, 1)


  When error occurs, only first error is passed down to the last. Later errors or data are ignored.
**/
/* --------------------- 用例测试 ----------------------- */
const async1 = (callback) => {
  setTimeout(() => callback(undefined, 1), 300);
};
const async2 = (callback) => {
  setTimeout(() => callback(undefined, 2), 100);
};
const async3 = (callback) => {
  setTimeout(() => callback(undefined, 3), 200);
};

const all = parallel([async1, async2, async3]);
all((error, data) => {
  console.log(data); // [1, 2, 3]  note: data is array. 数组每一项是对应的promise结果
}, 1);

/*---------------------------- Solution 1 : use Promise --------------------------------- */
/*
type Callback = (error: Error, data: any) => void

type AsyncFunc = (
  callback: Callback,
  data: any
) => void
*/

/**
 * @param {AsyncFunc[]} funcs
 * @return {(callback: Callback) => void}
 */

function promisify(callback) {
  //这里的input就是对应sequence里面的input， return function 就是为了能够传值，传input
  return function (input) {
    return new Promise((resolve, reject) => {
      callback((err, data) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(data);
      }, input);
    });
  };
}

function parallel(funcs) {
  return (callback, input) => {
    Promise.all(funcs.map((fn) => promisify(fn)(input)))
      .then((outputs) => callback(undefined, outputs))
      .catch((err) => callback(err, undefined));
  };
}

/**
Promise.all的介绍和使用：

  Promise.all() 是一个用于处理多个 Promise 对象的方法，它接受一个 Promise 对象数组作为参数，并返回一个新的 Promise 对象。
  这个新的 Promise 对象将在所有的 Promise 对象都已经被解决（resolved）或有一个被拒绝（rejected）时解决或拒绝。
  使用 Promise.all() 可以同时执行多个异步任务，并等待它们全部完成后再进行下一步操作。
  下面是使用 Promise.all() 的基本语法：
    Promise.all([promise1, promise2, ...])
      .then((results) => {
        // 所有 Promise 对象都已解决时执行的操作
        console.log(results);
      })
      .catch((error) => {
        // 任何一个 Promise 对象被拒绝时执行的操作
        console.error(error);
      });
  在上面的代码中，Promise.all() 接受一个 Promise 对象数组作为参数。
  当所有的 Promise 对象都被解决时，.then() 中的回调函数将会被调用，并且传递一个包含所有 Promise 对象解决结果的数组。
  如果任何一个 Promise 对象被拒绝，.catch() 中的回调函数将会被调用，并且传递被拒绝的错误信息。

  以下是一个使用 Promise.all() 的示例，假设有两个异步任务 fetchData1() 和 fetchData2()：
    const promise1 = fetchData1();
    const promise2 = fetchData2();

    Promise.all([promise1, promise2])
      .then((results) => {
        // 两个异步任务都已完成
        const data1 = results[0];
        const data2 = results[1];
        console.log(data1, data2);
      })
      .catch((error) => {
        // 任何一个异步任务被拒绝
        console.error(error);
      });
  上面的代码中，fetchData1() 和 fetchData2() 分别返回两个 Promise 对象。使用 Promise.all() 可以等待这两个异步任务都完成后，获取它们的结果并进行下一步操作。
  请注意，Promise.all() 的返回值是一个新的 Promise 对象，因此可以通过链式调用 .then() 和 .catch() 方法来进行后续处理。
 */

/*------------------------------------- Solution 2 --------------------------------------- */
