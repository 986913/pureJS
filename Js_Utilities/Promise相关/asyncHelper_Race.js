/**

This problem is related to [async helper - Parallel]
You are asked to implement an async function helper, `race()` which works like [Promise.race()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race). 
Different from `parallel()` that waits for all functions to finish, `race()` will finish when any function is done or run into error.

All async functions have following interface
  type Callback = (error: Error, data: any) => void
  type AsyncFunc = (
    callback: Callback,
    data: any
  ) => void


Your `race()` should accept AsyncFunc array**, and return a new function which triggers its own callback when **any** async function is done or an error occurs.

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


Your `race()` should be able to accomplish this
  const first = race(
    [
      async1,
      async2,
      async3
    ]
  )
  first((error, data) => {
    console.log(data) // 2, since 2 is the first to be given. 注意：返回的data不再像parallel返回数组了....
  }, 1)

When error occurs, only first error is passed down to the last. Later errors or data are ignored.
 */

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

const first = race([async1, async2, async3]);
first((error, data) => {
  console.log(data); // 2, since 2 is the first to be given. 注意：返回的data不再像parallel返回数组了....
}, 1);

/*---------------------------- Solution : use Promise.race --------------------------------- */
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
function race(funcs) {
  return function (callback, data) {
    //使用了Promise.race，接受array为参数
    Promise.race(funcs.map((fn) => promisify(fn)(data)))
      .then((output) => callback(undefined, output))
      .catch((err) => callback(err, undefined));
  };
}

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

/*------------------------------------- Solution 2: without use Promise.race --------------------------------------- */
