/**
 * What's the debounce?
 *  触发事件后的一段时间后(wait)才执行函数，如果在这段时间(wait)内被再次触发，则会重新计时.
 *
 *  Implement a debounce function which accepts a callback function and a wait duration.
 *  Calling debounce() returns a function which has debounced invocations of the callback function following the behavior described below.
 *  (advanced debounce I)
 */
/* --------------------- 用例测试1 -------------------------- */
let i = 0;
function increment() {
  i++;
}
// 用了debounce:
const debouncedFn = debounce(increment, 100);
// t = 0: Call debouncedFn().
debouncedFn(); // i = 0
// t = 50: Cancel the delayed increment.
debouncedFn.cancel();
// t = 100: increment() was not invoked and i is still 0.

/* ------------------- 用例测试2 ----------------------------- */
let j = 0;
function increment() {
  j++;
}
// 用了debounce:
const debouncedFn2 = debounce(increment, 100);
// t = 0: Call debouncedFn().
debouncedFn2(); // j = 0
// t = 50: i is still 0 because 100ms have not passed.
debouncedFn2.flush(); // j = 0
// t = 51: j is now 1 because flush causes the callback to beimmediately invoked.
// t = 100: j is already 1. The callback has been called beforeand won't be called again.

/*****************************************************************************/

/* ------------------------------ Code solution:---------------------------- */
/**
 * @callback func
 * @param {number} wait
 * @return {Function}
 */

function debounce(func, wait = 0) {
  let timerId = null;
  let context;
  let args;

  function cancel() {
    clearTimeout(timerId);
    timerId = null;
  }

  function invoke() {
    func.apply(context, args);
    cancel();
  }

  function debounced(...newArgs) {
    context = this;
    args = newArgs;
    if (timerId) {
      cancel();
    }

    timerId = setTimeout(invoke, wait);
  }

  debounced.cancel = cancel;
  debounced.flush = () => {
    if (timerId) {
      invoke();
    }
  };

  return debounced;
}
