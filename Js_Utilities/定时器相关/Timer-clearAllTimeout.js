/**
 * `window.setTimeout()` could be used to schedule some task in the future.
 *  Could you implement `clearAllTimeout()` to clear all the timers ?
 *  note: 
 *     You need to keep the interface of window.setTimeout and window.clearTimeout the same, 
 *     but you could replace them with new logic
 */

/* --------------------- 用例测试 ----------------------- */
// all 3 functions are scheduled 10 seconds later
setTimeout(func1, 10000)
setTimeout(func2, 10000)
setTimeout(func3, 10000)

clearAllTimeout() // all scheduled tasks are cancelled.

/* -------------------------- Solution --------------------------- */
const originalSetTimeout = window.setTimeout;  // save the original window.setTimeout api
const timeouts = []; // an array for store timer IDs

// re-define(wrap original window.setTimeout, and modify timeout array)
window.setTimeout = (callback, delay) => {
  const timerId = originalSetTimeout(callback, delay);
  timeouts.push(timerId);

  return timerId;
}

function clearAllTimeout() {
  timeouts.forEach((id) => window.clearTimeout(id));
}