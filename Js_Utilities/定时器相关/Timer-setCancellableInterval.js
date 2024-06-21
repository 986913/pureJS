/**
  Implement a function setCancellableInterval, that acts like setInterval but instead of returning a timer ID, 
  it returns a function that when called, cancels the interval. 
  The setCancellableInterval function should have the exact same signature as setInterval:
    setCancellableInterval(callback);
    setCancellableInterval(callback, delay);
    setCancellableInterval(callback, delay, param1);
    setCancellableInterval(callback, delay, param1, param2);
    setCancellableInterval(callback, delay, param1, param2, ..., paramN);
 */

/* -------------------用例测试--------------------*/
let i = 0; // t = 0:
const cancel = setCancellableInterval(() => {
  i++;
}, 10);
// t = 10: i is 1
// t = 20: i is 2
cancel(); // Called at t = 25
// t = 30: i is still 2 because cancel() was called and the interval callback has stopped running.

/* ------------------ Solution Code ---------------------------------------------------- */
/**
 * @param {Function} callback
 * @param {number} delay
 * @param {...any} args
 * @returns {Function}
 */
function setCancellableInterval(callback, delay, ...args) {
  /* setInterval does not initially call the function before t milliseconds, 
    which is why we call fn(...args) once before setting the interval */
  callback(...args);

  const timerId = setInterval(callback, delay, ...args);
  return () => {
    clearInterval(timerId);
  };
}

/* ------------------------------- LC 2725 - Solution -------------------------------------
 * @param {Function} fn
 * @param {Array} args
 * @param {number} t
 * @return {Function}

  var cancellable = function(fn, args, t) {
    fn(...args) // <-- diff is here

    // setup a interval to invoke fn at each t
    let timer = setInterval(fn, t, ...args);

    // return a function that cancels the interval
    return () => {
      clearInterval(timer)
    }
  };
*/
