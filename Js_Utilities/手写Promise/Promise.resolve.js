/**
  The Promise.resolve() static method "resolves" a given value to a Promise. If the value is:
    A native promise, return that promise.
    A non-thenable, return a promise that is already fulfilled with that value.
    A thenable, Promise.resolve() will call the then() method and pass a pair of resolving functions as arguments. A promise that has the same state as the thenable is returned.
  Source: Promise.resolve() - JavaScript | MDN

  A "thenable" is an interface that implements the .then() method, 
  which is called with two callbacks: one for when the promise is fulfilled, 
  one for when it's rejected. Promises are also thenables.

  Implement the Promise.resolve() function as promiseResolve. 
  You can ignore the case where this is referenced within the implemented function.
 */

/* ----------------------- 用例测试1: Resolving a non-promise ----------------------- */
const p = promiseResolve(42);
await p; // 42
/* ----------------------- 用例测试2: Resolving a promise     ----------------------- */
const original = new Promise((resolve) => resolve(42));
const cast = promiseResolve(original);
await cast; // 42
/* ----------------------- 用例测试3: Resolving a thenable    ----------------------- */
const resolvedThenable = promiseResolve({
  then(resolve, reject) {
    resolve(42);
  },
});
await resolvedThenable; // 42

/*  ---------------------------- Solution1: short cut answer  ---------------------------- */
/**
 * @param {*} value
 * @returns Promise
 */
function promiseResolve(value) {
  return Promise.resolve(value);
}

/*  ---------------------------- Solution2: -------------------------------------------- */
/**
 * @param {*} value
 * @returns Promise
 */
function promiseResolve(value) {
  // If the value is a native Promise, return it directly without creating a new instance (用例测试2s)
  if (value instanceof Promise) return value;

  return new Promise((resolve, _) => resolve(value)); // 用例测试1,3
}
