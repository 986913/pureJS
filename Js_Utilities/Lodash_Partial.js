// Lodash _.once documentation:  https://lodash.com/docs/4.17.15#partial

/* -------------------用例测试 1--------------------*/
const func = (...args) => args;
const func123 = partial(func, 1, 2, 3);
func123(4); // [1,2,3,4]
/* -------------------用例测试 2--------------------*/
const _ = partial.placeholder; // _ 代表 Symbol()创建的特殊符号，用作占位符。
const func = (...args) => args;
const func1_3 = partial(func, 1, _, 3);
func1_3(2, 4); // [1,2,3,4]

/* -------------------------- Code Solution 1: -------------------------------- */
function partial(func, ...args) {
  return function (...newargs) {
    const finalArgs = [];
    const argsCopy = args.slice(); // copy the args to avoid unintentional modication to args across different calls
    while (argsCopy.length) {
      const head = argsCopy.shift();
      if (head === partial.placeholder) {
        finalArgs.push(newargs.shift());
      } else {
        finalArgs.push(head);
      }
    }
    finalArgs.push(...newargs);

    // actuall call func with final args
    return func.apply(this, finalArgs);
  };
}
partial.placeholder = Symbol();

/* -------------------------- Code Solution 2: same as sol1, but simpler grammer -------------------------------- */
function partial(func, ...args) {
  return function (...newargs) {
    const copyArgs = args.map((arg) =>
      arg === partial.placeholder ? newargs.shift() : arg
    );
    return func.apply(this, [...copyArgs, ...newargs]);
  };
}
partial.placeholder = Symbol();
