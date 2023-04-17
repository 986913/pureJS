/* deep clone II: 
    可以对 JavaScript 中的5种主要的数据类型（包括Number、String、Object、Array、Boolean）进行DEEP clone,
    ie:  Any changes made to the deeply-copied object will not affect the original object.

    taking note of the following:
      The input object can contain any data types.
      Cover the edge case where the input object is cyclic, i.e. the circular references should also be cloned.
*/

/* --------------------- 用例测试: 实现这种函数 ----------------------- */
const obj1 = {
  num: 0,
  str: '',
  boolean: true,
  unf: undefined,
  nul: null,
  obj: { name: 'foo', id: 1 },
  arr: [0, 1, 2],
  date: new Date(),
  reg: new RegExp('/bar/ig'),
  [Symbol('s')]: 'baz',
};
const clonedObj1 = deepClone(obj1);
clonedObj1.arr.push(3);
clonedObj1.arr; // [0, 1, 2, 3]
obj1.arr; // Should still be [0, 1, 2]

const obj2 = { a: {} };
obj2.a.b = obj2; // Circular reference
const clonedObj2 = deepClone(obj2); // Should not cause a stack overflow by recursing into an infinite loop.
clonedObj2.a.b = 'something new';
obj2.a.b === obj2; // This should still be true

/* -------------------------------- Code solution  -------------------------------------- */

const isPrimitiveOrFunction = (value) =>
  typeof value !== 'object' || value === null || typeof value === 'function';

const lowerCaseTheFirstLetter = (str) => str[0].toLowerCase() + str.slice(1);

const getType = (value) => {
  const type = typeof value;
  if (type !== 'object') return type;

  const str = Object.prototype.toString.call(value);
  /* examples:
    Object.prototype.toString.call([1,2,3])    ---> '[object Array]'
    Object.prototype.toString.call('dd')       ---> '[object String]'
    Object.prototype.toString.call(true)'      ---> '[object Boolean]'
    Object.prototype.toString.call(new Set())   --> '[object Set]'
    Object.prototype.toString.call(new Map())   --> '[object Map]'
    Object.prototype.toString.call(function(){})--> '[object Function]'
    Object.prototype.toString.call(new Date())  --> '[object Date]'
    Object.prototype.toString.call(new RegExp())--> '[object RegExp]'
    Object.prototype.toString.call({})          --> '[object Object]
   */
  const start = str.indexOf(' ') + 1;
  const end = str.lastIndexOf(']');
  const formatted = str.substring(start, end);

  return lowerCaseTheFirstLetter(formatted);
};

/**
 * @param {*} value
 * @return {*}
 */
function deepClone(value, cache = new Map()) {
  if (isPrimitiveOrFunction(value)) return value;

  const type = getType(value);

  if (type === 'set') {
    const cloned = new Set();
    value.forEach((item) => {
      cloned.add(deepClone(item));
    });
    return cloned;
  }

  if (type === 'map') {
    const cloned = new Map();
    value.forEach((value, key) => {
      cloned.set(key, deepClone(value));
    });
    return cloned;
  }

  if (type === 'function') return value;

  if (type === 'array') return value.map((item) => deepClone(item));

  if (type === 'date') return new Date(value);

  if (type === 'regExp') return new RegExp(value);

  /**
   * 当需要对一个对象进行深拷贝时，会首先检查 cache 中是否已经有了该对象的克隆版本，
   * 如果有则直接返回该克隆版本，避免重复克隆。
   * 如果没有，则创建一个新的对象 cloned，并将该对象存储到 cache 中。
   * 然后，遍历原始对象的所有属性，对每个属性进行深拷贝，并将拷贝后的属性值赋值给 cloned 对象相应的属性。
   */
  if (cache.has(value)) return cache.get(value);
  const cloned = Object.create(Object.getPrototypeOf(value));
  cache.set(value, cloned); // 是将已经拷贝过的对象存储到缓存中，避免重复拷贝和循环引用的问题。

  for (const key of Reflect.ownKeys(value)) {
    cloned[key] = isPrimitiveOrFunction(value[key])
      ? value[key]
      : deepClone(value[key], cache);
  }

  return cloned;
}

/**
 * 1. Object.getPrototypeOf() 用于获取指定对象的原型（也就是 __proto__ 属性）。
 * 2. Reflect.ownKeys() 是一个 JavaScript 内置方法，用于返回一个对象的所有自身属性（包括不可枚举属性）的属性键（数组形式）. example:
      const myObj = {
        foo: 'bar',
        [Symbol('mySymbol')]: 123
      };
      const keys = Reflect.ownKeys(myObj);
      console.log(keys); // 输出：[ 'foo', Symbol(mySymbol) ]
      需要注意的是，Reflect.ownKeys() 方法返回的属性键数组是一个包含🟡所有自身属性键的数组:包括常规属性、Symbol 属性以及不可枚举属性。
        如果想要只获取常规属性，可以使用 Object.keys() 方法；
        如果只想获取 Symbol 属性，可以使用 Object.getOwnPropertySymbols() 方法
 */
