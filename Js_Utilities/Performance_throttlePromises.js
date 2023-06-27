/**
  Say you need to fetch some data through 100 APIs, and as soon as possible.
  If you use `Promise.all()`, 100 requests go to your server at the same time, which is a burden to low spec servers.
  Can you throttle your API calls so that always maximum 5 API calls at the same time?
  You are asked to create a general `throttlePromises()` which takes an array of functions returning promises, and a number indicating the maximum concurrent pending promises.
 */

/* -------------------用例测试--------------------- */
throttleAsync(callApis, 5)
  .then((data) => {
    // the data is the same as `Promise.all`
  })
  .catch((err) => {
    // any error occurs in the callApis would be relayed here
  });

/* ------------------------- Code solution 1 --------------------------- */
/**
 * @param {() => Promise<any>} func
 * @param {number} max
 * @return {Promise}
 */
function throttlePromises(funcs, max) {
  return new Promise((resolve, reject) => {
    let concurrentCount = 0;
    let latestCalledFnIdx = -1;
    let resultCount = 0;
    let hasErr = false;
    const result = [];

    const runNext = () => {
      // stop call next function if has err OR reach to the end of functions
      if (hasErr || latestCalledFnIdx === funcs.length - 1) return;

      const nextFnIdx = latestCalledFnIdx + 1; // 下一个被call的fn的index
      const nextFn = funcs[nextFnIdx]; // 下一个被call的fn
      concurrentCount += 1;
      latestCalledFnIdx += 1;

      // actuall call next function
      nextFn().then(
        (data) => {
          result[nextFnIdx] = data; // update result
          resultCount++;
          concurrentCount -= 1;

          if (resultCount === funcs.length) {
            resolve(result); //等所有funcs都call完了， 然后在统一reslove result出去
            return;
          }

          runNext();
        },
        (err) => {
          hasErr = true;
          reject(err);
        }
      );

      if (concurrentCount < max) runNext();
    };

    runNext();
  });
}
/* ------------------------- Code solution 2 --------------------------- */
function throttlePromises(funcs, max) {
  let results = [];

  return new Promise((resolve, reject) => {
    let runningCount = 0;
    let queue = [...funcs];

    function run() {
      while (runningCount < max && queue.length > 0) {
        const fn = queue.shift();
        runningCount++;
        fn()
          .then((data) => {
            runningCount--;
            results.push(data);
            run();
          })
          .catch((err) => reject(err));
      }
      if (results.length === funcs.length) resolve(results);
    }

    run();
  });
}
