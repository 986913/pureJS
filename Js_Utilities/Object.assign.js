/**
 * The `Object.assign()` method copies all enumerable own properties from one or more source objects to a target object. It returns the target object.* (source: [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign))
 * It is widely used, Object Spread operator actually is internally the same as `Object.assign()` ([source](https://github.com/tc39/proposal-object-rest-spread/blob/master/Spread.md)).
 * Following 2 lines of code are totally the same：
 *    let aClone = { ...a };
 *    let aClone = Object.assign({}, a);
 * Could you implement Object.assign() with your own implementation ?
 *
 * note： Don't use Object.assign() in your code It doesn't help improve your skills
 */
/*-------------------- 用例测试1-------------------------*/
objectAssign({}, { a: 3 }, { b: 4 }); // {a:3,b:4}
/*-------------------- 用例测试2-------------------------*/
let a = {
  name: 'dami',
  age: 3,
};
let b = {
  name: 'doudou',
  info: {
    title: 'a cute cat',
    price: '6000',
  },
};
objectAssign(a, b); // same effect as Object.assign()
/**
  {
    name: "doudou",
    age: 3,
    info: {title: "a cute cat", price: "6000"}
  } 
 */
/*-------------------- 用例测试3-------------------------*/
let A = {
  name: 'doudou',
  age: 3,
};
let B = {
  b1: Symbol('doudou'),
  b2: null,
  b3: undefined,
};
objectAssign(A, B); // same effect as Object.assign()
/**
  {
    name: "doudou",
    age: 3,
    b1: Symbol(doudou),
    b2: null,
    b3: undefined
  } 
 */

/* ------------------------------ Code solution:---------------------------- */
/**
 * @param {any} target
 * @param {any[]} sources
 * @return {object}
 */
