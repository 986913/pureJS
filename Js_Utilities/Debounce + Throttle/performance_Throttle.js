/**
 * what’s Throttle?
 *  - 每隔一段时间(wait)内，只执行一次函数, 也就是当timer存在的时候直接return不执行，不存在的时候执行setTimeout

  throttle会在一定时间间隔内至少执行一次，
  而debounce会在调用结束后的一段时间内只执行一次
 */

/* --------------------- 用例测试 ----------------------- */
function test() {
  console.log('test');
}
// 没用Throttle时：
document.onmousemove = function () {
  test();
};
// 用了Throttle：
const throttledFn = throttle(test, 1000);
document.onmousemove = function () {
  throttledFn();
};

/*****************************************************************************/

/* -------------- Code solution: v1 - normal function ------------------- */
function throttle(func, wait) {
  let timer = null;
  let nextTimeToCallFn = 0; // 记录了下一次允许调用函数的时间

  return function (...args) {
    const context = this;
    const delay = Math.max(0, nextTimeToCallFn - Date.now()); //计算当前时间和下一次允许调用时间之间的差值。如果差值为负数，则设置为 0，表示可以立即调用。
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      func.apply(context, args);
      nextTimeToCallFn = Date.now() + wait; // difference on debounce
    }, delay);
  };
}

/* -------------- Code solution: v2 - arrow function ------------------- */
function throttle(func, wait) {
  let timer = null;
  let nextTimeToCallFn = 0;

  return (...args) => {
    const delay = Math.max(0, nextTimeToCallFn - Date.now());
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      func(args);
      nextTimeToCallFn = Date.now() + wait;
    }, delay);
  };
}
