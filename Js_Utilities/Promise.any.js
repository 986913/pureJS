/**
  Promise.any() takes an iterable of Promise objects and, as soon as one of the promises in the iterable fulfills, returns a single promise that resolves with the value from that promise
    - 如果Promise数组中至少有1个Promise 对象被✅，Promise.any()就会返回第1个解决的Promise 对象的解决值；
    - 如果所有Promise对象都被❌，Promise.any()将返回一个被拒绝的 Promise 对象,并使用一个 AggregateError 对象来包装所有拒绝的原因

  Can you implement a `any()` to work the same as `Promise.any()`?

  note: `AggregateError` is not supported in Chrome yet, but you can still use it in your code since we will add the Class into your code. 
  Do something like following:
    new AggregateError(
      'No Promise in Promise.any was resolved', 
      errors
    )
 */

/*-------------- 用例测试1 ------------------*/
const p0 = Promise.resolve(42);
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(21);
  }, 100);
});

await myPromiseAny([p0, p1]); // 42

/*-------------- 用例测试2 ------------------*/
const p2 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(42);
  }, 100);
});
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('Err!');
  }, 400);
});

await myPromiseAny([p2, p3]); // 42

/*-------------- 用例测试3 ------------------*/
const p4 = new Promise((resolve) => {
  setTimeout(() => {
    reject(42);
  }, 400);
});
const p5 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('Err!');
  }, 100);
});

try {
  await myPromiseAny([p4, p5]);
} catch (err) {
  console.log(e instanceof AggregateError); // true
  console.log(e.errors); // [ 42, "Err!" ]
}

/* ------------------ Solution Code V1:  use async/await----------------------------------------- */
/**
 * @param {Array} iterable
 * @return {Promise<Array>}
 */

function myPromiseAny(promises) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      // edge case: when input is empty
      reject(new AggregateError('No Promise passed'));
    }

    let pending = promises.length;
    const errResult = [];

    promises.forEach(async (p, index) => {
      try {
        const data = await p;
        resolve(data); // 有一个Promise对象被✅，那就返回第一个✅的Promise 对象的解决值
      } catch (err) {
        errResult[index] = err;
        pending--;

        //所有Promise 对象都被❌了，那就返回一个被❌的Promise对象,并使用一个AggregateError对象来包装所有拒绝的原因)
        if (pending === 0) {
          reject(new AggregateError('none resolved', errResult));
        }
      }
    });
  });
}

/* ------------------ Solution Code V2: use Promise.then() ----------------------------------------- */
/**
 * @param {Array} iterable
 * @return {Promise}
 */

function myPromiseAny(promises) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      // edge case: when input is empty
      reject(new AggregateError('No Promise passed'));
    }

    /* main logic */
    let pending = promises.length;
    const errResult = []; //用来装被拒绝的promise们的拒绝理由。。

    promises.forEach((p, index) => {
      Promise.resolve(p).then(
        (data) => resolve(data), // 有一个Promise对象被✅，那就返回第一个✅的Promise 对象的解决值
        (err) => {
          errResult[index] = err; // 根据index对号入座， update errResult
          pending--;

          //所有Promise 对象都被❌了，那就返回一个被❌的Promise对象,并使用一个AggregateError对象来包装所有拒绝的原因)
          if (pending === 0) {
            reject(new AggregateError('none resolved', errResult));
          }
        }
      );
    });
  });
}

/**
👉 知识点：
"Promise race"和"Promise.any"是JavaScript中的两个异步函数，用于处理多个Promise对象。

  区别如下：

  1. 功能不同：它们解决的问题有所不同。
      1. "Promise.race"函数接收一个Promise数组，并返回一个新的Promise对象，该对象在数组中的任意一个Promise对象解决（resolve）或拒绝（reject）时解决或拒绝。
          (也就是说如果在Promise数组中有一个Promise对象非常快地解决resolve或拒绝reject，"Promise.race"函数将立即返回该结果(无论是解决或者拒绝)，而不会等待其他Promise对象的状态)
          
      2. "Promise.any"函数也接收一个Promise数组，但它会在数组中的任意一个Promise对象解决resolve时解决，而不管是否有Promise对象被拒绝.
          (也就是说如果Promise 数组中至少有一个 Promise 对象被解决，它就会返回第一个解决的Promise 对象的解决值；但是如果所有Promise 对象都被拒绝，它将返回一个被拒绝的 Promise 对象,并使用一个 AggregateError 对象来包装所有拒绝的原因)
          
  2. 解决值（resolved value）：
      1. 对于"Promise.race"函数，解决值有2中可能：
          1. 解决值是第一个解决(resolve)的Promise对象的解决值
          2. 解决值是第一个拒绝(reject  )的Promise对象的解决值
      2. 对于"Promise.any"函数，解决值有2中可能：
          1. 是第一个解决(resolve)的Promise对象的解决值，无论是否有Promise对象被拒绝(reject）
          2. 如果所有promise对象都被拒绝，那就返回一个被拒绝的 Promise 对象,并使用一个 AggregateError 对象来包装所有拒绝的原因
  3. 拒绝处理（rejection handling）：
      1. 对于"Promise.race"函数，如果**第一个**Promise对象被拒绝（reject），则返回的Promise对象也将被拒绝，并且会使用第一个被拒绝的Promise对象的拒绝值。
      2. 对于"Promise.any"函数，只有在**所有的**Promise对象都被拒绝时，返回的Promise对象才会被拒绝，并且会使用一个AggregateError对象来包装所有拒绝的原因。

 */
