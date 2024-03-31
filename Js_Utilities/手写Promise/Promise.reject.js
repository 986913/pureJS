/**
  > The Promise.reject() static method returns a Promise object that is rejected with a given reason.
    Source: [Promise.reject() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject)

    Unlike `Promise.resolve()`, `Promise.reject()` always wraps `reason` in a new `Promise` object, even when `reason` is already a `Promise`
    Implement the `Promise.reject()` function as `myPromiseReject`. 
    You can ignore the case where `this` is referenced within the implemented function.
 */

/*------- 用例测试 ----------*/
try {
  myPromiseReject('Mayday!');
} catch (err) {
  console.log(err); // Mayday!
}

/* --------------------------- Solution 1: short cut answer -------------------------------- */
/**
 * @param {*} reason
 * @returns Promise
 */
function promiseReject(reason) {
  return Promise.reject(reason);
}

/* --------------------------- Solution 2 -------------------------------------------------- */
/**
 * @param {*} reason
 * @returns Promise
 */
function promiseReject(reason) {
  return new Promise((_, reject) => {
    return reject(reason);
  });
}
