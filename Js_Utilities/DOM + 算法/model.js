/**
  Let's do some simple two-way binding. 
  Please create a function model(state, element), to bind state.value to the HTMLInputElement element.
 */

/* -------------------用例测试 --------------------*/
const input = document.createElement('input');
const state = { value: 'BFE' };
model(state, input);

console.log(input.value); // 'BFE'
state.value = 'dev';
console.log(input.value); // 'dev'
input.value = 'BFE.dev';
input.dispatchEvent(new Event('change'));
console.log(state.value); // 'BFE.dev'

/* ---------------------------- Solution -------------------------------- */
/**
 * @param {{value: string}} state
 * @param {HTMLInputElement} element
 */
function model(state, element) {
  // 1. initialized the element value with state value
  element.value = state.value;

  // 2. Two conditions:
  // (1) Update the state value, then it will also update element value with new state value
  // (2) Update input element value, then it will also update state value with element value

  Object.defineProperty(state, 'value', {
    get() {
      return element.value;
    },
    set(new_value) {
      element.value = new_value;
      return;
    },
  });

  element.addEventListener('change', (event) => {
    // this will update state value then `state's` setter method will update input value
    state.value = event.target.value;
  });
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
