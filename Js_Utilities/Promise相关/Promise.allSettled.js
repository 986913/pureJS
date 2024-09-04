/**
  The Promise.allSettled() method takes promises array as input, returns a single Promise：
    - 只有等Promise数组所有的Promise对象fulfilled了(不管是resolve✅还是reject❌), 然后"Promise.allSettled"函数会返回一个Promise, 装有所有resolved/rejected values的数组

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

/**
 * @param {Array} iterable
 * @return {Promise<{status: 'fulfilled', value: *}|{status: 'rejected', reason: *}>}
 */
/* ------------------ Solution Code V1:  use async/await----------------------------------------- */
function myPromiseAllSettled(promises) {
  return new Promise((resolve) => {
    const results = new Array(promises.length);
    let pending = promises.length;

    // edge case： when input is empty array
    if (pending === 0) {
      resolve(results);
      return;
    }

    /* main logic */
    promises.forEach(async (p, index) => {
      //不管每个promise是被✅还是❌,都要update result
      try {
        let data = await p;
        results[index] = { status: 'fulfilled', value: data };
      } catch (err) {
        results[index] = { status: 'rejected', reason: err };
      } finally {
        pending--;
        // 所有Promise对象都被处理了, 那就resolve all Promise的解决/拒绝值们 (数组)
        if (pending === 0) {
          resolve(results);
        }
      }
    });
  });
}

/* ------------------ Solution Code V2: use Promise.then() ----------------------------------------- */

function myPromiseAllSettled(promises) {
  return new Promise((resolve) => {
    const results = new Array(promises.length);
    let pending = promises.length;

    // edge case： when input is empty array
    if (pending === 0) {
      resolve(results);
      return;
    }

    /* main logic */
    promises.forEach((p, index) => {
      //不管每个promise是被✅还是❌,都要update result
      Promise.resolve(p)
        .then(
          (data) => {
            results[index] = { status: 'fulfilled', value: data };
          },
          (err) => {
            results[index] = { status: 'rejected', reason: err };
          }
        )
        .finally(() => {
          pending--;
          // 所有Promise对象都被处理了, 那就resolve all Promise的解决/拒绝值们 (数组)
          if (pending === 0) {
            resolve(results);
          }
        });
    });
  });
}
