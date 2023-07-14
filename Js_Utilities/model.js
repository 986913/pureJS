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
