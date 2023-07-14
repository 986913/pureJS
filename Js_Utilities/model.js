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
function model(state, element) {}
