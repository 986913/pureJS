/**

Suppose we have a Callback type:
  type Callback = (error: Error, result: any | Thunk) => void

A Thunk is a function that take a Callback as parameter
  type Thunk = (callback: Callback) => void

Like following three thunks:
  const func1 = (cb) => {
    setTimeout(() => cb(null, 'ok'), 10)
  }
  const func2 = (cb) => {
    setTimeout(() => cb(null, func1), 10)
  }
  const func3 = (cb) => {
    setTimeout(() => cb(null, func2), 10)
  }

in above example, three functions are kind of chained up, func3 → func2 → func1, but it don't work without some glue.

OK, now you are asked to implement a `flattenThunk()` which glue them up and returns a new thunk.
  flattenThunk(func3)((error, data) => {
    console.log(data) // 'ok'
  })

note: Once error occurs, the rest uncalled functions should be skipped
 */

/* -------------------------用例测试: flattenThunk with success callback -------------------- */
flattenThunk(func3)((error, result) => {
  expect(error).toBeUndefined();
  expect(result).toBe('ok');
  done();
});
/* -------------------------用例测试: flattenThunk with error -------------------- */
const funcError = (cb) => setTimeout(() => cb('error', undefined), 10);
const func1 = (cb) => setTimeout(() => cb('error', funcError), 10);
flattenThunk(func1)((error, result) => {
  expect(error).toBe('error');
  expect(result).toBe(undefined);
  done();
});

/* ------------------ Solution Code ---------------------------------------------------- */
/**
 * @param {Thunk} thunk
 * @return {Thunk}
 */
//简单来说就是劫持callback,自己实现一个支持链式调用的callback;
// thunk: 即案例的func3, callback: 给定的回调
function flattenThunk(thunk) {
  return function (callback) {
    const _callback = (error, data) => {
      if (error) {
        //立即处理错误
        callback(error);
      } else if (typeof data == 'function') {
        //如果data是一个"Thunk"即函数
        data(_callback);
      } else {
        //如果data不是一个函数
        callback(error, data);
      }
    };
    thunk(_callback);
  };
}
