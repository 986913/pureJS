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

/* ------------------------------ Code solution 1:---------------------------- */
/**
 * @param {any} target
 * @param {any[]} sources
 * @return {object}
 */
function objectAssign(target, ...sources) {
  // edge case: 如果是target invalid,则抛出错误。这是为了确保我们有一个有效的目标对象来接收属性的复制。
  if (target === null || target === undefined) {
    throw new Error('invalid target');
  }

  //转换目标对象:如果目标对象是原始类型，要使用 Object() 函数将其转换为相应的包装对象。这样做是为了确保目标对象是一个可写的对象，因为原始类型不能直接赋值。
  let result = target;
  if (['number', 'string', 'boolean'].includes(typeof target)) {
    result = Object(result);
  }

  //遍历所有源对象们(sources)：
  for (const source of sources) {
    //如果当前源对象是null or undefined.，则会立即跳过当前迭代，直接执行下一次迭代。这样就能确保只处理有效的源对象，而忽略了空对象。
    if (source === null || source === undefined) continue;

    const symbols = Object.getOwnPropertySymbols(source).filter((key) => {
      return Object.getOwnPropertyDescriptor(source, key).enumerable;
    });
    // 得到一个包含源对象所有可枚举属性的数组enumerableKeys
    const enumerableKeys = [...Object.keys(source), ...symbols];

    //对于每个源对象进行属性复制
    for (const key of enumerableKeys) {
      if (!Reflect.set(result, key, source[key])) {
        throw new Error('can not assign read-only property');
      }
      target[key] = source[key]; // 把源对象的属性值 复制 给结果
    }
  }

  return result;
}
/**
知识点：
  1. Object.assign() 方法本身不是递归实现的，所以这个题不需要用递归
  2. Object.assign() 方法的行为是将源对象的可枚举属性浅复制到目标对象中。你可以使用循环来遍历源对象，并将每个属性复制到目标对象中，而不需要递归。递归通常在处理嵌套对象结构时使用，但在这个问题中，并没有需要处理嵌套对象的情况。
  3. Object.keys(): 获取对象的所有可枚举字符串属性
  4. Object.getOwnPropertySymbols()
      - 作用：用于获取对象自身的所有符号属性。
      - 返回：它返回一个包含所有符号属性的数组。符号属性是使用 Symbol 类型作为键的属性，而不是常规的字符串键。Symbol 是一种特殊的数据类型，用于创建唯一的、不可变的标识符。
      - 用法：
        const obj = {
          [Symbol('key1')]: 'value1',
          [Symbol('key2')]: 'value2',
          'mingkey':  'value3'
        };
        const symbols = Object.getOwnPropertySymbols(obj);
        console.log(symbols); // [Symbol(key1), Symbol(key2)]
  5. Object.getOwnPropertyDescriptor()
      - 作用：用于获取对象的属性描述符（property descriptor）。属性描述符是一个包含属性特性的对象，用于描述属性的可写性（writable）、可枚举性（enumerable）、可配置性（configurable）以及属性的值（value）。
      - 返回：Object.getOwnPropertyDescriptor()接受两个参数：对象和属性名，返回指定属性的属性描述符对象。
      - 用法：
        const obj = {
          name: 'John',
          age: 25,
        };
        const descriptor = Object.getOwnPropertyDescriptor(obj, 'name');
        console.log(descriptor); // { value: 'John', writable: true, enumerable: true, configurable: true }
  6. Reflect.set()
      - 作用：用于设置对象的属性值。它提供了一种更简洁和统一的方式来设置对象属性，相比于传统的赋值操作符或 Object.defineProperty()，它提供了更灵活和强大的功能。
      - 用法：Reflect.set()接受3个参数：目标对象、属性名和要设置的值。它会在目标对象上设置指定属性的值，并返回一个布尔值，表示设置操作是否成功:
        const obj = {};
        Reflect.set(obj, 'name', 'John');
        console.log(obj.name); // 'John'

        const arr = ['a', 'b', 'c'];
        Reflect.set(arr, 1, 'x');
        console.log(arr); // ['a', 'x', 'c']

        const obj = {};
        const proto = { name: 'John' };
        Reflect.set(obj, '__proto__', proto);
        console.log(obj.name); // 'John'
 */

/* ------------------------------ Code solution 2:---------------------------- */
