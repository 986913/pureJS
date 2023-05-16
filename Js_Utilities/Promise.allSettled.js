/**
  The Promise.allSettled() method returns a promise that resolves after all of the given promises have either fulfilled or rejected, with an array of objects that each describes the outcome of each promise.
    - 只有等Promise数组所有的Promise对象fullied了(不管是resolve✅还是reject❌), 然后"Promise.allSettled"函数才会返回一个装有所有resolved/rejected values的数组(无论是解决或者拒绝)

  Different from `Promise.all()` which rejects right away once an error occurs, 
  `Promise.allSettled()` waits for all promises to settle.

  Now can you implement your own `allSettled()` ?
 **/

/*---------------用例测试-------------------*/
const p0 = Promise.resolve(3);
const p1 = 42;
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('foo');
  }, 100);
});

await myPromiseAllSettled([p0, p1, p2]);
/* 
  [
    { status: 'fulfilled', value: 3 },
    { status: 'fulfilled', value: 42 },
    { status: 'rejected', reason: 'foo' }
  ];
*/

/* ------------------ Solution Code V1:  use async/await----------------------------------------- */
/**
 * @param {Array} iterable
 * @return {Promise<{status: 'fulfilled', value: *}|{status: 'rejected', reason: *}>}
 */

function myPromiseAllSettled(iterable) {
  return new Promise((resolve) => {
    const results = new Array(iterable.length);
    let pending = iterable.length;

    // edge case： when input is empty array
    if (pending === 0) {
      resolve(results);
      return;
    }

    /* main logic */
    iterable.forEach(async (item, index) => {
      try {
        let value = await item;
        results[index] = { status: 'fulfilled', value };
      } catch (err) {
        results[index] = { status: 'rejected', reason: err };
      }

      pending--;
      if (pending === 0) {
        resolve(results);
      }
    });
  });
}

/* ------------------ Solution Code V2: use Promise.then() ----------------------------------------- */
/**
 * @param {Array} iterable
 * @return {Promise<{status: 'fulfilled', value: *}|{status: 'rejected', reason: *}>}
 */

function myPromiseAllSettled(iterable) {
  return new Promise((resolve) => {
    const results = new Array(iterable.length);
    let pending = iterable.length;

    // edge case： when input is empty array
    if (pending === 0) {
      resolve(results);
      return;
    }

    /* main logic */
    iterable.forEach((item, index) => {
      Promise.resolve(item)
        .then(
          (value) => {
            results[index] = { status: 'fulfilled', value };
          },
          (err) => {
            results[index] = { status: 'rejected', reason: err };
          }
        )
        .finally(() => {
          pending--;
          if (pending === 0) {
            resolve(results);
          }
        });
    });
  });
}
