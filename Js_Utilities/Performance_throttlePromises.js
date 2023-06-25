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
