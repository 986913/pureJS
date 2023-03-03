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
