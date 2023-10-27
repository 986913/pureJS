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
    setInterval(() => {
      sub.next(i++);
    }, period);
  });
}
