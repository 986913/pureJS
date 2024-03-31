/**
  Promise.prototype.finally() could be used to run a callback when a promise is settled(either fulfilled or rejected).
  Notice that the callback passed `finally()` doesn't receive any argument, meaning it doesn't modify the value in the promise chain (care for rejection).
 */

/* ------------------------- Solution Code 1:  promise ----------------------------------------- */
/**
 * @param {Promise<any>} promise
 * @param {() => void} onFinally
 * @returns {Promise<any>}
 * this solution is from MDN Suggestion:
 */
function myFinally(promise, onFinally) {
  return promise.then(
    (value) => Promise.resolve(onFinally()).then(() => value),
    (err) =>
      Promise.resolve(onFinally()).then(() => {
        throw err;
      })
  );
}
/**
  知识点：
  Promise.prototype.finally() 返回一个新的 Promise 对象, 和Promise.all, 和Promise.race, 和Promise.any etc这些static返回一样都是new promise
 */

/* ------------------------- Solution Code 2: async/await ----------------------------------------- */
/**
 * @param {Promise<any>} promise
 * @param {() => void} onFinally
 * @returns {Promise<any>}
 */
async function myFinally(promise, onFinally) {
  try {
    const val = await promise;
    await onFinally();
    return val;
  } catch (error) {
    await onFinally();
    throw error;
  }
}
