/**
 * @param {Function} fn
 * @return {Function<Promise<number>>}
 */
var promisify = function (fn) {
  return async function (...args) {
    return new Promise((resolve, reject) => {
      //与promisify不同的地方是callback函数的参数顺序不一样，这道题是(data, err) err在后面
      fn((data, err) => (err ? reject(err) : resolve(data)), ...args);
    });
  };
};

/**
 * const asyncFunc = promisify(callback => callback(42));
 * asyncFunc().then(console.log); // 42
 */
