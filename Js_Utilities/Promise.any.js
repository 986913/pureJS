/*-------------- 用例测试1 ------------------*/
const p0 = Promise.resolve(42);
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(21);
  }, 100);
});

await myPromiseAny([p0, p1]); // 42

/*-------------- 用例测试2 ------------------*/
const p2 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(42);
  }, 100);
});
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('Err!');
  }, 400);
});

await myPromiseAny([p2, p3]); // 42

/*-------------- 用例测试3 ------------------*/
const p4 = new Promise((resolve) => {
  setTimeout(() => {
    reject(42);
  }, 400);
});
const p5 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('Err!');
  }, 100);
});

try {
  await myPromiseAny([p4, p5]);
} catch (err) {
  console.log(e instanceof AggregateError); // true
  console.log(e.errors); // [ 42, "Err!" ]
}

/* ------------------ Solution Code V1:  use async/await----------------------------------------- */
/**
 * @param {Array} iterable
 * @return {Promise<Array>}
 */

function myPromiseAny(promises) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      // edge case: when input is empty
      reject(new AggregateError('No Promise passed'));
    }

    let pending = promises.length;
    const errResult = [];

    promises.forEach(async (p, index) => {
      try {
        const data = await p;
        resolve(data);
      } catch (err) {
        errResult[index] = err;
        pending--;

        if (pending === 0) {
          reject(new AggregateError('none resolved', errResult));
        }
      }
    });
  });
}

/* ------------------ Solution Code V2: use Promise.then() ----------------------------------------- */
/**
 * @param {Array} iterable
 * @return {Promise}
 */

function myPromiseAny(promises) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      // edge case: when input is empty
      reject(new AggregateError('No Promise passed'));
    }

    /* main logic */
    let pending = promises.length;
    const errResult = [];

    promises.forEach((p, index) => {
      Promise.resolve(p).then(
        (data) => resolve(data),
        (err) => {
          errResult[index] = err;
          pending--;
          if (pending === 0) {
            reject(new AggregateError('none resolved', errResult));
          }
        }
      );
    });
  });
}
