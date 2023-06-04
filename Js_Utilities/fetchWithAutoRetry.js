/**
  For a web application, fetching API data is a common task.
  But the API calls might fail because of Network problems. Usually we could show a screen for Network Error and ask users to retry.
  One approach to handle this is **auto retry when network error occurs**.
  You are asked to create a `fetchWithAutoRetry(fetcher, count)`, which automatically fetch again when error happens, until the maximum count is met.
  For the problem here, there is no need to detect network error, you can just retry on all promise rejections.
*/
/* --------------------- 用例测试 1: reject if maximum retry is met and still not resolve ----------------------- */
let callCount = 0;
const fetcher = () =>
  new Promise((resolve, reject) => {
    callCount += 1;
    reject('error here');
  });

fetchWithAutoRetry(fetcher, 6)
  .then((data) => {
    const spy = jasmine.createSpy('success handler');
    spy();
    expect(spy).not.toHaveBeenCalled();
    done();
  })
  .catch((error) => {
    expect(callCount).toBe(7);
    console.log(error); // "error here"
    done();
  });
/* --------------------- 用例测试 2: auto retry and resolve to the right data ----------------------- */
let callCount2 = 0;
let fetcher2 = () =>
  new Promise((resolve, reject) => {
    callCount2 += 1;
    if (callCount2 >= 3) resolve('bfe');
    else reject('error');
  });

fetchWithAutoRetry(fetcher, 4)
  .then((data) => {
    expect(callCount2).toBe(3); //因为fetcher2定义的是在第3次retry时候resolve data
    console.log(data); // "bfe"
    done();
  })
  .catch((error) => {
    const spy = jasmine.createSpy('error handler');
    spy();
    expect(spy).not.toHaveBeenCalled();
    done();
  });
/* --------------------- 用例测试 3: resolve to the right data if no erro ----------------------- */
fetchWithAutoRetry(() => Promise.resolve('bfe'), 1)
  .then((data) => {
    console.log(data); // "bfe"
    done();
  })
  .catch((error) => {
    const spy = jasmine.createSpy('error handler');
    spy();
    expect(spy).not.toHaveBeenCalled();
    done();
  });

/* ---------------------------------- Code solution 1 -------------------------------------- */
/**
 * @param {() => Promise<any>} fetcher
 * @param {number} maximumRetryCount
 * @return {Promise<any>}
 */
function fetchWithAutoRetry(fetcher, maximumRetryCount) {
  return new Promise((resolve, reject) => {
    let retryCount = 0;

    const callFetcher = () => {
      fetcher().then(
        (data) => {
          resolve(data);
        },
        (err) => {
          if (retryCount < maximumRetryCount) {
            retryCount += 1;
            callFetcher();
          } else {
            reject(err);
          }
        }
      );
    };

    callFetcher();
  });
}
/* --------------------------------- Code solution 2: Recursion ------------------------------- */
/**
 * @param {() => Promise<any>} fetcher
 * @param {number} maximumRetryCount
 * @return {Promise<any>}
 */
function fetchWithAutoRetry(fetcher, maximumRetryCount) {
  return fetcher().catch((e) => {
    if (maximumRetryCount === 0) {
      throw e;
    } else {
      return fetchWithAutoRetry(fetcher, maximumRetryCount - 1);
    }
  });
}
