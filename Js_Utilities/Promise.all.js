/*-------用例测试1：  Resolved example--------------------*/
const p0 = Promise.resolve(3);
const p1 = 42;
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('foo');
  }, 100);
});

await myPromiseAll([p0, p1, p2]); // [3, 42, 'foo']
await myPromiseAll([p0, p1, p2]).then((values) => console.log(values)); // [3, 42, 'foo']

/*------用例测试2:  Rejected example-------------------- */
const p3 = Promise.resolve(30);
const p4 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('An error occurred!');
  }, 100);
});

try {
  await myPromiseAll([p3, p4]);
} catch (err) {
  console.log(err); // 'An error occurred!'
}

/* ------------------ Solution Code V1:  use async/await----------------------------------------- */
/**
 * @param {Array} iterable
 * @return {Promise<Array>}
 */

function myPromiseAll(iterable) {
  return new Promise((resolve, reject) => {
    const results = new Array(iterable.length);
    let unresolved = iterable.length;

    // edge case: when iterable input is [], then should return []
    if (unresolved === 0) {
      resolve(results);
      return;
    }

    //main logic:
    iterable.forEach(async (item, index) => {
      try {
        const value = await item;
        results[index] = value; // update results
        unresolved -= 1;

        if (unresolved === 0) {
          resolve(results);
        }
      } catch (err) {
        reject(err);
      }
    });
  });
}

/* ------------------ Solution Code V2: use Promise.then() ----------------------------------------- */
/**
 * @param {Array} iterable
 * @return {Promise<Array>}
 */

function myPromiseAll(iterable) {
  return new Promise((resolve, reject) => {
    const results = new Array(iterable.length);
    let unresolved = iterable.length;

    // edge case: when iterable input is [], then should return []
    if (unresolved === 0) {
      resolve(results);
      return;
    }

    //main logic:
    iterable.forEach((item, index) => {
      Promise.resolve(item).then(
        (value) => {
          results[index] = value; // update results
          unresolved -= 1;

          if (unresolved === 0) {
            resolve(results);
          }
        },
        (err) => {
          reject(err);
        }
      );
    });
  });
}
