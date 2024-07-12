/* -------------------------用例测试-------------------- */
function sayName(a, b, c) {
  return {
    name: this.name,
    a,
    b,
    c,
  };
}
const person = {
  name: 'ming',
};

const bi = sayName.myCall(person, 'eat', 'sleep', 'work');
console.log(bi); //{name: 'ming', a: 'eat', b: 'sleep', c: 'work'}

/* -------------------------用例测试2-------------------- */
function sayName2(title) {
  return {
    name: this.name,
    breed: this.breed,
    title,
  };
}
const doggy = {
  name: 'yoyi',
  breed: 'GSD',
};

const dog = sayName2.myCall(doggy, 'officer');
console.log(dog); //{name: 'yoyi', breed: 'GSD', title: 'officer'}

/* -------------------------------- Solution1: Object.defineProperty ------------------ */
Function.prototype.callPolyfill = function (thisArg, ...args) {
  Object.defineProperty(thisArg, 'myFn', {
    value: this,
    enumerable: false,
  });
  return thisArg.myFn(...args);
};

/* -------------------------------- Solution2: Symbol -------------------------------- */
Function.prototype.myCall = function (thisArg, ...args) {
  const uniqueSymbol = Symbol(); // create unique key
  thisArg[uniqueSymbol] = this; //用symbol键存func. 🟡这个this指向的是调用myCall的sayName函数，不是指向person obj
  const result = thisArg[uniqueSymbol](...args); // call the function
  delete thisArg[uniqueSymbol]; // delete the unique key

  return result; // return result
};

/* -------------------------------- Solution3: .bind -------------------------------- */
Function.prototype.myCall = function (thisArg, ...args) {
  return this.bind(thisArg)(...args);
};

/* -------------------------------- Solution3: .apply -------------------------------- */
Function.prototype.myCall = function (thisArg, ...args) {
  return this.apply(thisArg, args);
};

/**
  Object.defineProperties():
      - 作用：用于定义或修改一个对象的1个或多个属性及其对应的属性discriptor
      - 返回：修改后的对象
      - 用法：有2️⃣个用法：
          1. 如果你只想定义/修改1个属性 这时需要提供第一个参数obj，第二个参数prop，和第三个参数 descriptor：
            const obj2 = {};
            Object.defineProperty(obj2, 'name', {
              value: 'John',
              writable: false,
              enumerable: true
            });
            console.log(obj2); // { name: 'John' }
          2. 如果你想一次性定义/修改多个属性。 这时要提供第一个参数obj 和一个包含属性discriptors的对象作为第二个参数. 不需要提供第三个参数，因为所有的属性描述符都包含在第二个参数的对象中。
            const obj = {};
            Object.defineProperties(obj, {
              name: {
                value: 'John',
                writable: true,
                enumerable: true,
                configurable: true
              },
              age: {
                value: 25,
                writable: false,
                enumerable: true,
                configurable: false
              }
            });
            console.log(obj); // { name: 'John', age: 25 }
 */
