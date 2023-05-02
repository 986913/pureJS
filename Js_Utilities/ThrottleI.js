/**
 * what’s Throttle?
 *  - 每隔一段时间(wait)内，只执行一次函数, 也就是当timer存在的时候直接return不执行，不存在的时候执行setTimeout
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

  // return a normal function:
  return function (...args) {
    const context = this;
    if (timer) return; // difference on debounce

    timer = setTimeout(() => {
      func.apply(context, args);
      timer = null; // difference on debounce
    }, wait);
  };
}
/* -------------- Code solution: v2 - arrow function ------------------- */
function throttle(func, wait) {
  let timer = null;

  // return the arrow function:
  return (...args) => {
    if (timer) return; // difference on debounce

    timer = setTimeout(() => {
      func(args);
      timer = null; // difference on debounce
    }, wait);
  };
}
