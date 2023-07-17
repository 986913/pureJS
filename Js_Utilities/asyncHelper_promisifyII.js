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
  return function (...args) { // different is here
    return new Promise((resolve, reject) => {
      func.call(this, ...args, (error, data) => { // different is here
        if (error) {
          reject(error);
          return;
        }
        resolve(data);
      });
    });
  };
}
