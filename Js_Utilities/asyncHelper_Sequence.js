/**
  This problem is similar to Composition(https://www.notion.so/Composition-64a3ba58a71546b3ba3aa1b8606b4c0b). 
  You are asked to implement an async function helper, `sequence()` which chains up async functions, like what `pipe()` does.

  All async functions have following interface:
    type Callback = (error: Error, data: any) => void
    type AsyncFunc = (
      callback: Callback,
      data: any
    ) => void

  Your `sequence()` should accept AsyncFunc array, and chain them up by passing new data to the next AsyncFunc through data in Callback.

  Suppose we have an async func which just multiple a number by 2
    const asyncTimes2 = (callback, num) => {
      setTimeout(() => callback(null, num * 2), 100)
    }

  Your `sequence()` should be able to accomplish this:
    const asyncTimes4 = sequence(
      [
        asyncTimes2,
        asyncTimes2
      ]
    )
    asyncTimes4((error, data) => {
      console.log(data) // 4
    }, 1)

  Once an error occurs, it should trigger the last callback without triggering the uncalled functions.
  Follow up: Can you solve it with and without Promise?
 */

/* --------------------- 用例测试1 ----------------------- */
const asyncTimes2 = (callback, num) => {
  setTimeout(() => callback(null, num * 2), 100);
};
const asyncTimes4 = sequence([asyncTimes2, asyncTimes2]);
asyncTimes4((error, data) => {
  console.log(data); // 4
}, 1);
/* --------------------- 用例测试2 ----------------------- */
const thunk = sequence([times2, times3, plus2]);
thunk((error, data) => {
  console.log(data); // 8
}, 1);
/* --------------------- 用例测试2 ----------------------- */
const thunk2 = sequence([times2, plus2, times3]);
thunk2((error, data) => {
  console.log(data); // 12
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
function sequence(funcs) {
  return function (callback, data) {
    let promise = Promise.resolve(data); // 1. init promise

    /* 2. construct promise with promiseFuncs: 
      遍历promiseFuncs数组中的每个函数,我们将其通过.then方法将fn添加到promise链中。
      注意，这里使用了赋值表达式 (promise = promise.then(fn))，目的是将 promise 更新为当前添加了新函数的 Promise。
      这样，在下一次循环时，新的 Promise 就会成为前一个 Promise 的后续操作。最终 整个链式操作会在最后一个Promise完成后结束。
    */
    const promiseFuncs = funcs.map((fn) => promisify(fn));
    promiseFuncs.forEach((fn) => (promise = promise.then(fn)));

    //3. handle resolved or rejected promise
    promise
      .then((input) => {
        callback(undefined, input);
      })
      .catch(callback);
  };
}

//promisify函数的作用是将一个使用常见回调模式的函数转换为返回Promise的函数，使得我们可以更方便地使用 Promise 的链式调用和错误处理机制。
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
/**
  sequence函数的作用是将一系列的函数串联起来执行，并按照顺序传递数据。
  具体来说，它的输入是一个函数数组(funcs)。数组中的每个函数都会被转换成一个 Promise，这是通过 promisify 函数实现的。
  然后，sequence 函数返回一个新的函数，这个函数接受一个回调函数和数据作为参数。
    在返回的函数内部，它会按照数组中函数的顺序依次执行这些 Promise，并将数据作为初始值传递给第一个Promise。
    每个 Promise 的执行结果会作为下一个 Promise 的输入，实现了函数串联的效果。
  当所有的 Promise 都执行完毕后，如果都成功执行，将会调用传入的回调函数，并将最终的数据作为第二个参数传递给回调函数。
  如果在执行过程中出现错误，将会调用回调函数并将错误作为第一个参数传递给回调函数。
  sequence函数的作用在于简化函数串联的操作，特别是当每个函数都是异步操作时，可以使用这个函数来更方便地控制函数的执行顺序和数据传递

  
  在 promisify 函数中，我们希望将这样的回调函数转换为返回 Promise 的函数
  因此，我们将回调函数作为参数传递给 promisify 函数，并在返回的函数中使用这个回调函数。
  返回的函数会接受一个输入参数input，并在内部创建一个 Promise 对象。
  在这个 Promise 的执行函数中，我们调用原始的回调函数，并根据回调函数的结果来决定 Promise 的状态。
    如果回调函数的第一个参数 err 存在，表示有错误发生，我们将 Promise 的状态设置为 rejected，并将 err 作为错误的原因。
    如果没有错误，我们将 Promise 的状态设置为 resolved，并将 data 作为 Promise 的结果。
  上述的promifify可以简化为下面这种写法：
    const promisify = fn => input => new Promise((res, rej) => {
      fn((err, output) => err ? rej(err) : res(output), input)
    })
 */

/* -------------------------- Solution 2: without use Promise and asyn/await --------------------------------- */
function sequence(funcs) {
  return function (callback, data) {
    let nextFnIndex = 0;
    const callNextFn = (data) => {
      // when no more function is to be called
      if (nextFnIndex === funcs.length) {
        callback(undefined, data);
        return;
      }

      const nextFn = funcs[nextFnIndex];
      nextFnIndex++;

      nextFn((error, newData) => {
        if (error) {
          // if error, callback right away
          callback(error, undefined);
        } else {
          // if not error, recursively callNextFn
          callNextFn(newData);
        }
      }, data);
    };
    callNextFn(data);
  };
}

/*--------------------------Solution 3: use Async/Await ------------------------- */
// input data from prev call
function promisify(func, inputData) {
  return new Promise((resolve, reject) => {
    // respData after processing the callback when time out is done
    func((err, respData) => {
      err ? reject(err) : resolve(respData);
    }, inputData);
  });
}

function sequence(funcs) {
  return async function (callback, data) {
    let ret = data;

    try {
      for (let func of funcs) {
        ret = await promisify(func, ret);
      }
    } catch (err) {
      callback(err, ret);
    }

    callback(undefined, ret);
  };
}
