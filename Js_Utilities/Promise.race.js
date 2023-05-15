/*-------用例测试1--------------------*/
const p0 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(42);
  }, 100);
});
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('Err!');
  }, 400);
});
await myPromiseRace([p0, p1]); // 42

/*-------用例测试2--------------------*/
const p2 = Promise.resolve(42);
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(21);
  }, 100);
});

await myPromiseRace([p2, p3]); // 42

/*-------用例测试3--------------------*/
const p4 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(42);
  }, 400);
});
const p5 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('Err!');
  }, 100);
});

try {
  await myPromiseRace([p4, p5]);
} catch (err) {
  console.log(err); // 'Err!'
}

/* ------------------ Solution Code V1:  use async/await----------------------------------------- */
/**
 * @param {Array} iterable
 * @return {Promise}
 */

function myPromiseRace(promises) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) return; // edge case: when input is empty
    promises.forEach(async (p) => {
      try {
        const data = await p;
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  });
}

/* ------------------ Solution Code V2: use Promise.then() ----------------------------------------- */
/**
 * @param {Array} iterable
 * @return {Promise}
 */

function myPromiseRace(promises) {
  return new Promise((resolve, reject) => {
    if (iterable.length === 0) return; // edge case: when input is empty
    promises.forEach((p) => {
      Promise.resolve(p).then(
        (data) => {
          resolve(data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  });
}
