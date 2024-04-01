/**
  Note: It is recommended to have completed the Timer-setCancellableInterval question before attempting this question.s

  Implement a function createResumableInterval, that acts like setInterval and has the exact same signature. 
  However instead of returning a timer ID, it returns an object that contains three methods:
    start: Runs the callback immediately and every delay milliseconds.
    pause: Pauses the interval so that it stops running. Execution can be resumed by calling start() again.
    stop: Stops the interval permanently, cannot be restarted.
  
  The createResumableInterval function should have the exact same signature setInterval:
    createResumableInterval(callback);
    createResumableInterval(callback, delay);
    createResumableInterval(callback, delay, param1);
    createResumableInterval(callback, delay, param1, param2);
    createResumableInterval(callback, delay, param1, param2, ..., paramN);
 */

/* -------------------用例测试--------------------*/
let i = 0;
// t = 0:
const interval = createResumableInterval(() => {
  i++;
}, 10);
// t = 10:
interval.start(); // i is now 1.
// t = 20: callback executes and i is now 2.
// t = 25:
interval.pause();
// t = 30: i remains at 2 because interval.pause() was called.
// t = 35:
interval.start(); // i is now 3.
// t = 45: callback executes and i is now 4.
// t = 50:
interval.stop(); // i remains at 4.

/* -------------------------- Code Solution: -------------------------------- */
/**
 * @param {Function} callback
 * @param {number} delay
 * @param {...any} args
 * @returns {{start: Function, pause: Function, stop: Function}}
 */
function createResumableInterval(callback, delay, ...args) {
  const timerId = null;
  let stopped = false;

  const clearTimer = () => {
    clearInterval(timerId);
    timerId = null;
  };

  const start = () => {
    // stopped表示stoped的状态， timerId!==null表示目前有定时器, 不在pause的状态(确保了在pause后，再调用start时不会重复创建定时器)
    if (stopped || timerId !== null) return;

    //非stop时 和 在pause状态中：重新设置定时器
    callback(...args);
    timerId = setInterval(callback, delay, ...args);
  };

  const pause = () => {
    if (stopped) return;
    clearTimer(); // 调用clearTimer来清除当前定时器，以达到暂停的效果。
  };

  const stop = () => {
    stopped = true;
    clearTimer();
  };

  return {
    start,
    pause,
    stop,
  };
}
