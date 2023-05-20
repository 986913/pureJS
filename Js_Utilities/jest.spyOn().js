/**
  If you did unit test before, you must be familiar with Spy.
  
  You are asked to create a spyOn(object, methodName), which works the same as jest.spyOn().
  To make it simple, here are the 2 requirements of spyOn
    - original method should be called when spied one is called
    - spy should have a calls array, which holds all the arguments in each call.
 */

/* -------------------用例测试：实现函数spyOn--------------------*/
const obj = {
  data: 1,
  increment(num) {
    this.data += num;
  },
};
const spy = spyOn(obj, 'increment');
obj.increment(1);
// console.log(obj.data); // 2
obj.increment(2);
// console.log(obj.data); // 4

console.log(spy.calls); // [ [1], [2] ]

/* -------------------------- Code Solution ------------------------------- */
/**
 * @param {object} obj
 * @param {string} methodName
 */
function spyOn(obj, methodName) {
  if (!obj) throw Error();
  if (!(methodName in obj)) throw Error();
  if (typeof obj[methodName] !== 'function') throw Error();

  const calls = [];
  const originalMethod = obj[methodName]; //保存了原始的方法引用到originalMethod变量中

  //创建了一个新的同名函数来替换原始方法
  obj[methodName] = function (...args) {
    originalMethod.apply(this, args);
    calls.push(args);
  };

  return { calls };
}
