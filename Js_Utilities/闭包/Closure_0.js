/**
  Create an object with property count, which increments every time count is accessed, initial value is 0.
 */

/*-------------------用例测试--------------------*/
const counter = createCounter();
counter.count; // 0, then it should increment
counter.count; // 1
counter.count; // 2
counter.count = 100; // it cannot be altered
counter.count; // 3

/* ---------------------  Code solution 1: ----------------------- */
/**
 * @returns { {count: number}}
 */
function createCounter() {
  let result = 0;

  return {
    //Object厘头的key可以直接写成getter函数。。
    get count() {
      return result++;
    },
  };
}

/* ---------------------  Code solution 2: ----------------------- */
function createCounter() {
  let c = 0;
  const obj = {
    count: 0,
  };

  //使用Object.defineProperties修改object属性：
  Object.defineProperty(obj, 'count', {
    get: () => c++,
  });

  return obj;
}
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
