/**

This is a follow-up on implement_Observable.js

Suppos you have solved above, here you are asked to implement a creation operator from():
  Creates an Observable from an Array, an array-like object, a Promise, an iterable object, 
  or an Observable-like object.
Your from() should accept all above type.

Note:
  Observable is already given for you, no need to create it.
  for the problem here, Observable-like means Observable instance. Though in real-world you should check Symbol.observable
 */

/* --------------------- 用例测试 ----------------------- */
from([1, 2, 3]).subscribe(console.log);
// 1
// 2
// 3

/* ---------------------------- Solution -------------------------------- */
/**
 * @param {Array | ArrayLike | Promise | Iterable | Observable} input
 * @return {Observable}
 */

function from(input) {
  if (input instanceof Observable) return observableFromObservable(input);
  if (input instanceof Promise) return observableFromPromise(input);
  if (Array.isArray(input) || typeof input[Symbol.iterator] === 'function')
    return observableFromIterable(input);
  if ('length' in input) return observableFromArrayLike(input);

  throw new Error('Incorrect input type');
}

function observableFromObservable(input) {
  return new Observable((sub) => {
    input.subscribe(sub);
  });
}
function observableFromPromise(input) {
  return new Observable((sub) => {
    input
      .then(
        (val) => {
          sub.next(val);
        },
        (err) => {
          sub.error(err);
        }
      )
      .then(() => {
        sub.complete();
      });
  });
}
function observableFromIterable(input) {
  return new Observable((sub) => {
    try {
      for (let el of input) {
        sub.next(el);
      }
    } catch (err) {
      sub.error(err);
    }
    sub.complete();
  });
}
function observableFromArrayLike(input) {
  return new Observable((sub) => {
    try {
      for (let i = 0; i < input.length; i++) {
        sub.next(input[i]);
      }
    } catch (err) {
      sub.error(err);
    }
    sub.complete();
  });
}
