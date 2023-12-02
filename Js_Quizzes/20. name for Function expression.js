function a() {}
const b = function () {};

const c = function d() {
  console.log(typeof d); // "function"
  d = 'e';
  console.log(typeof d); // "function"
};

console.log(typeof a); // "function"
console.log(typeof b); // "function"
console.log(typeof c); // "function"
console.log(typeof d); // "undefined"
c();

/**
  a is a Function Declaration and has data type function
  b and c are Function Expression and have data type function
  d is a Named Function Expression This name d is then local only to the function body (scope) hence outside the function body typeof d returns undefined

  The special case is inside the named function d. The function name is un-reassignable inside the function. 
  You can easily see the difference if you run this in "use strict" mode where it gives an error Uncaught TypeError: Assignment to constant variable. 
  Thus, d will still point to the named function d despite being reassigned to "e"

  Note that, the result would have been different if we had redeclared d as var d = "e" in which case the next console.log would have printed string See the Diff
 */

function a() {}
const b = function () {};

const c = function d() {
  console.log(typeof d); // "function"
  var d = 'e';
  console.log(typeof d); // "string" <-----注意这里变了哦
};

console.log(typeof a); // "function"
console.log(typeof b); // "function"
console.log(typeof c); // "function"
console.log(typeof d); // "undefined"
c();
