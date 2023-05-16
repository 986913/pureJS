/**
  The Promise.all() method takes an iterable of promises as an input, and returns a single Promise that resolves to an array of the results of the input promises 
    - 如果在Promise数组中所有Promise被✅resolved后，"Promise.all"函数将返回一个装有all resolved values的数组
    - 如果在Promise数组中任意一个Promise被❌reject后  "Promise.all"函数将立即返回该reject结果,不会等待剩下的Promise对象的状态

  Could you write your own `all()` ? which should works the same as `Promise.all()`
 */

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

function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = new Array(promises.length); //用来装被解决的promise们的解决值。
    let unresolved = promises.length;

    // edge case: when promises input is [], then should return []
    if (unresolved === 0) {
      resolve(results);
      return;
    }

    //main logic:
    promises.forEach(async (p, index) => {
      try {
        const data = await p;
        results[index] = data; //根据index对号入座, update results
        unresolved -= 1;

        //所有Promise对象都被✅了, 那就返回all✅Promise的解决值们 (数组)
        if (unresolved === 0) {
          resolve(results);
        }
      } catch (err) {
        //只要有一个Promise对象被❌了,那就返回被❌promise的拒绝值
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

function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = new Array(promises.length); //用来装被解决的promise们的解决值
    let unresolved = promises.length;

    // edge case: when promises input is [], then should return []
    if (unresolved === 0) {
      resolve(results);
      return;
    }

    //main logic:
    iterable.forEach((p, index) => {
      Promise.resolve(p).then(
        (data) => {
          results[index] = data; //根据index对号入座, update results
          unresolved -= 1;

          //所有Promise对象都被✅了, 那就返回all✅Promise的解决值们 (数组)
          if (unresolved === 0) {
            resolve(results);
          }
        },
        (err) => {
          reject(err); //只要有一个Promise对象被❌了,那就返回被❌promise的拒绝值
        }
      );
    });
  });
}
