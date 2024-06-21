/**
  Implement a function setCancellableTimeout, that acts like setTimeout but instead of returning a timer ID, 
  it returns a function that when called, cancels the pending callback function. 
  The setCancellableTimeout function should have the exact same signature as setTimeout:
    setCancellableTimeout(callback);
    setCancellableTimeout(callback, delay);
    setCancellableTimeout(callback, delay, param1);
    setCancellableTimeout(callback, delay, param1, param2);
    setCancellableTimeout(callback, delay, param1, param2, ....., paramN);
 */

/* -------------------用例测试--------------------*/
let i = 0;
// t = 0:
const cancel = setCancellableTimeout(() => {
  i++;
}, 100);
// t = 50:
cancel();
// t = 100: i is still 0 because cancel() was called.

/* ------------------ Solution Code ---------------------------------------------------- */
/**
 * @param {Function} callback
 * @param {number} delay
 * @param {...any} args
 * @returns {Function}
 */
function setCancellableTimeout(callback, delay, ...args) {
  // setup a timeout to invoke callback after delay
  const timerId = setTimeout(callback, delay, ...args);

  // Return a function that cancels the timeout
  return () => {
    clearTimeout(timerId);
  };
}

/* ------------------------------- LC 2715 - Solution -------------------------------------
 * @param {Function} fn
 * @param {Array} args
 * @param {number} t
 * @return {Function}

var cancellable = function(fn, args, t) {
    // setup a timeout to invoke fn after t
    const timer = setTimeout(() => fn(...args),t) // 等价于const timer = setTimeout(fn,t,...args)

    // Return a function that cancels the timeout
    return () => {
        clearTimeout(timer)
    }
};

*/
