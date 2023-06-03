/**
  This is a follow up on [手写Object.assign()]
  `Object.assign()` assigns the enumerable properties, so getters are not copied, non-enumerable properties are ignored.
  
  Suppose we have following source object：
    const source = Object.create(
      {
        a: 3 // prototype
      },
      {
        b: {
          value: 4,
          enumerable: true // enumerable data descriptor
        },
        c: {
          value: 5, // non-enumerable data descriptor
        },
        d: { // non-enumerable accessor descriptor 
          get: function() {
            return this._d;
          },
          set: function(value) {
            this._d = value
          }
        },
        e: { // enumerable accessor descriptor 
          get: function() {
            return this._e;
          },
          set: function(value) {
            this._e = value
          },
          enumerable: true
        }
      }
    )
  If we call Object.assign() with source of above, we get:
    Object.assign({}, source) // {b: 4, e: undefined};  e is undefined because `this._e` is undefined

  Rather than above result, could you implement a `completeAssign()` which have the same parameters as `Object.assign()` but fully copies the data descriptors and accessor descriptors? 
  In case you are not familiar with the descriptors, [this page from MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) might help.

  This problem is solely checking your understanding of how property descriptors work.
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
    b1: Symbol(doudou),  --> objectAssign should support Symbol
    b2: null,
    b3: undefined
  } 
 */

/*-------------------- 用例测试4-------------------------*/
objectAssign(true, { a: 3 }); // Boolean {true, a: 3} --> booleans in target are wrapped

/*-------------------- 用例测试5-------------------------*/
objectAssign(2, { a: 3 }); // Number {2, a: 3} --> numbers in target are wrapped

/*-------------------- 用例测试6-------------------------*/
objectAssign('ming', { a: 3 }); //String {'ming', a: 3} --> strings in target are wrapped

/*-------------------- 用例测试7-------------------------*/
objectAssign(null); // throw err  -->  should throw error when target is null or undefined
objectAssign(undefined); // throw err

/*-------------------- 用例测试8-------------------------*/
objectAssign({}, { a: 3 }, null, undefined, NaN, 1, true); // {a: 3}  --> non-string primitives in source are ignored， 因为布尔值、数字和 NaN，它们不具有可枚举属性

/* ------------------------------ 👍👍👍👍 Code solution ---------------------------- */
function objectAssign(target, ...sources) {
  if (target === null || target === undefined) {
    throw new Error('invalid target');
  }

  /*调用target的构造函数来创建一个新的target。这里的 target 是作为参数传递给构造函数的
    eg：const num = 3;
        console.log( new num.__proto__.constructor(num) )  // Number {3}
  */
  if (typeof target !== `object`) {
    target = new target.__proto__.constructor(target);
  }

  for (const source of sources) {
    if (source === null || source === undefined) continue;

    //通过getOwnPropertyDescriptors实现属性的精准复制
    Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));

    //incase source如果有symbol属性, 也要复制symbol属性给target
    for (const symbol of Object.getOwnPropertySymbols(source)) {
      target[symbol] = source[symbol];
    }
  }

  return target;
}
