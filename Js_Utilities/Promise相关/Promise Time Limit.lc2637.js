/**
 * @param {Function} fn
 * @param {number} t
 * @return {Function}

 * const limited = timeLimit((t) => new Promise(res => setTimeout(res, t)), 100);
 * limited(150).catch(console.log) // "Time Limit Exceeded" at t=100ms
 */

/********************************* Solution 1:  Promise.race **************************************/
var timeLimit = function (fn, t) {
  return async function (...args) {
    // Create a timeout promise that rejects after t milliseconds
    const timeout = new Promise((_, rej) => {
      setTimeout(() => rej('Time Limit Exceeded'), t);
    });

    // Race the function's promise against the timeout promise
    return Promise.race([timeout, fn(...args)]); // Promise.race return的也是promise
  };
};

/*************************** Solution 2: Async/Await + Clearing Timeout ************************/
var timeLimit = function (fn, t) {
  return async function (...args) {
    return new Promise(async (resolve, reject) => {
      /**
        因为JS是单线程的，执行fn(...args)和设置timeout实际上是并行进行的，
        但从逻辑上讲，哪个操作先完成取决于fn(...args)的执行时间和设定的超时时间t。
        简而言之：
          如果fn(...args)在t毫秒内完成并返回结果，那么这个结果会被resolve，计时器会被清除,timeout不会触发。
          如果t毫秒过去了,fn(...args)还没有完成，那么计时器会触发并调用reject，Promise会以 "Time Limit Exceeded"的错误状态结束。
      */
      const timeout = setTimeout(() => reject('Time Limit Exceeded'), t);
      try {
        // 尝试执行传入的异步函数
        const result = await fn(...args);
        resolve(result); // 成功后，resolve 结果
      } catch (err) {
        reject(err); // 如果fn抛出错误，reject错误
      } finally {
        clearTimeout(timeout); // 清除计时器，无论成功还是失败，避免timeout之后再触发reject。
      }
    });
  };
};
