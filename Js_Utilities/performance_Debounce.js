/**
 * What's the debounce?
 *  触发事件后的一段时间后(wait)才执行函数，如果在这段时间(wait)内被再次触发，则会重新计时.
 *
 *  Implement a debounce function which accepts a callback function and a wait duration.
 *  Calling debounce() returns a function which has debounced invocations of the callback function following the behavior described below.
 */

/* --------------------- 用例测试 ----------------------- */
function test() {
  console.log('test');
}
// 没用debounce时：
document.onmousemove = function () {
  test();
};
// 用了debounce：
const debouncedFn = debounce(test, 1000);
document.onmousemove = function () {
  debouncedFn();
};
/*****************************************************************************/

/* -------------- Code solution: v1 - normal function ------------------- */
function debounce(func, wait) {
  let timer = null;

  // return a normal function:
  return function (...args) {
    const context = this; // retain a reference to this outside the setTimeout and pass it into func.apply as the 1st argument.
    if (timer) clearTimeout(timer); // 清除之前已经存在的debounce,如果不清除就会重复调用之前的debounce,做不到防抖

    // schedule a new timer for the delayed invocation with the full wait duration.
    timer = setTimeout(() => {
      func.apply(context, args); // 显示地将this指向调用其的函数
    }, wait);
  };
}
/* -------------- Code solution: v2 - arrow function ------------------- */
function debounce(func, wait) {
  let timer = null;

  // return the arrow function
  return (...args) => {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      func(args);
    }, wait);
  };
}
