/**
  Note: This is an advanced version of PromisifyII, which you should complete first before attempting this question.

  In Promisify, the promisify function returns a promise for a function following the common callback-last error-first callback style, 
  i.e. taking a (err, value) => ... callback as the last argument. 
  However, promisify does not work for functions that do not follow that exact signature.

  In Node.js, using the util.promisify.custom symbol, one can override the return value of util.promisify(), 
  which is useful for cases where the original function does not follow the standard format of taking an error-first callback as the last argument. 
  This is especially useful for functions with a legacy format that's incompatible with util.promisify's callback-last convention.
      // Example usage in Node.js.
      const util = require('node:util');
      function doSomething(callback, foo) {
        // ...
      }
      doSomething[util.promisify.custom] = (foo) => {
        return getPromiseSomehow();
      };
      const promisified = util.promisify(doSomething);
      console.log(promisified === doSomething[util.promisify.custom]);// prints 'true'
  
  Implement a promisify function that has support for custom return values. 
  Use the symbol Symbol('util.promisify.custom') as the key for the overridden value.
*/

/* --------------------- 用例测试 ----------------------- */
// Example function with callback as the first argument.
// The callback has the signature `(err, value) => any`.
function foo(callback, url, options) {
  apiCall(url, options)
    .then((data) => callback(null, data))
    .catch((err) => callback(err));
}
foo[Symbol('util.promisify.custom')] = (url, options) => {
  return new Promise((resolve, reject) => {
    foo(
      (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      },
      url,
      options
    );
  });
};
const promisifiedFoo = foo[Symbol('util.promisify.custom')]; // true
const data = await promisifiedFoo('example.com', { foo: 1 });

/**
 * @callback func
 * @returns Function
 */
/*
  similar to promisifyII,
  The only addition you need to make is to check if the func argument has the custom Symbol('util.promisify.custom') defined and return the corresponding value if so.
 */
/*--------------------------Solution ------------------------- */
const promisifyCustomSymbol = Symbol.for('util.promisify.custom');

function promisify(func) {
  if (func[promisifyCustomSymbol]) return func[promisifyCustomSymbol]; // difference is here

  return function (...args) {
    // different is here
    return new Promise((resolve, reject) => {
      // different is here
      func.call(this, ...args, (err, result) =>
        err ? reject(err) : resolve(result)
      );
    });
  };
}

/**
  Symbol.for()用法：
  接受一个字符串作为参数，搜索有没有以该参数作为名称的 Symbol 值 ---> 
    （1）有：就返回这个 Symbol 值. 
    （2）没有：新建一个以 该名称为参数的 Symbol 值，并将其注册到全局

  example: //以下s1 和 s2 实际上为同一个值
    let s1 = Symbol.for('foo');
    let s2 = Symbol.for('foo');
    s1 === s2 // true
*/

/**
  Symbol.keyFor()用法：
  返回一个已登记的 Symbol 类型值的key 注意：Symbol()写法没有登记机制

  example:
    let s1 = Symbol.for("foo");
    Symbol.keyFor(s1) // "foo"
    let s2 = Symbol("foo");
    Symbol.keyFor(s2) // undefined
    解析：上面代码中，变量s2属于未登记的 Symbol 值，所以返回undefined
*/
