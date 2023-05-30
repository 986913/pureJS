// This is a JavaScript Quiz from BFE.dev
// What does the code snippet to the right output by console.log?

let a = 1;
const b = ++a; // it will increment and return the value *after* incrementing
// a's value will also get updated
const c = a++; // it will increment but return the value *before* incrementing
// a's value will also get updated

console.log(a); //3
console.log(b); //2
console.log(c); //2
