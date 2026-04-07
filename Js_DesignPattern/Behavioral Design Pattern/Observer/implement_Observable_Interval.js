/**
  This is a follow-up on implement_Observable.js

  Suppose you have solved 57. create an Observable, here you are asked to implement a creation operator interval().
  From the document, interval()
    Creates an Observable that emits sequential numbers every specified interval of time

  Note: Observable is already given for you, no need to create it
 */

/* --------------------- 用例测试 ----------------------- */
interval(1000).subscribe(console.log); //code prints 0, 1, 2 .... with an interval of 1 seconds.

/* ---------------------------- Solution -------------------------------- */
/**
 * @param {number} period
 * @return {Observable}
 */
function interval(period) {
  return new Observable((sub) => {
    let i = 0;
    // 开始定时器，并将每次的 i 发送给订阅者
    const timerId = setInterval((sub) => {
      sub.next(i++);
    }, period);

    // 【加分项】：返回一个清理函数（Teardown）
    // 当外部调用 unsubscribe() 取消订阅时，这个函数会自动执行，清除定时器防止内存泄漏
    return () => {
      clearInterval(timerId);
    };
  });
}
