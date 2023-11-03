/**
  这道题和asyncHelper_promisify不同的点是在: async functions 接受多个参数, error-first callback still as last argument
 */
/* --------------------- 用例测试1 ----------------------- */
function func(arg1, arg2, arg3, callback) {
  setTimeout(() => {
    callback(null, this.foo)
  }, 50)
}
const obj = {
  foo: 'BFE',
  promisified: promisify(func)
}

obj.promisified(1, 2, 3).then((data) => {
  expect(data).toBe('BFE')
  done()
}
/* --------------------- 用例测试2 ----------------------- */
function func(arg1, arg2, callback) {
  setTimeout(() => {
    callback('some error')
  }, 50)
}

const promisified = promisify(func)
promisified(1,2).catch((e) => {
  console.log(e)
  expect(e).toBe('some error')
  done()
})
/* --------------------- 用例测试3 ----------------------- */
function func(arg1, arg2, arg3, callback) {
  setTimeout(() => {
    callback(null, 'success')
  }, 50)
}

const promisified = promisify(func)
promisified(1, 2, 3).then((data) => {
  expect(data).toBe('success')
  done()
})
/* --------------------- 用例测试4 ----------------------- */
function func(arg1, arg2, arg3, arg4, arg5, callback) {
  setTimeout(() => {
    callback(null, 'success')
  }, 50)
}

const promisified = promisify(func)
promisified(1, 2, 3, 4, 5).then((data) => {
  expect(data).toBe('success')
  done()
})

/*--------------------------Solution : return an function that take multiples para and wrap promise ------------------------- */
/**
 * @param {(...args) => void} func
 * @returns {(...args) => Promise<any}
 */

function promisify(func) {
  return function (...args) {  // different is here
    return new Promise((resolve, reject) => {
      // different is here
      func.call(this, ...args, (err, result) => 
        err ? reject(err) : resolve(result),
      );
    });
  };
}
/**
解释：
  1. The promisify function takes a single argument func, which is the callback-based function you want to promisify.
  2. The return statement returns a new function that wraps func. This new function is the promisified version.
  3. Inside the returned function, we use the spread operator ...args to capture any arguments passed to the promisified function.
  4. We create a new Promise that wraps the original callback-based function. 
      The Promise constructor takes a function with two arguments: resolve and reject. 
      These are functions we call based on the outcome of the asynchronous operation.
  5. Inside the Promise's function, we invoke func with the provided arguments (...args) and pass a callback function as its last argument as that's what func expects.
  6. The callback function takes two arguments: err (error) and result (success value). 
      If err is truthy, we reject the Promise with the err. 
      Otherwise, we resolve the Promise with the result.

  With the promisify function, you can convert any callback-based function into a Promise-based function, making it easier to work with asynchronous operations using modern Promise syntax.
  To preserve the this value, the returned function should not be defined using arrow functions and func should be invoked with call/apply and the correct thisArg value.
 */